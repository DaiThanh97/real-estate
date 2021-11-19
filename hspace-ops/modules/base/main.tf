module "vpc" {
  source = "../vpc"

  name = var.name
  cidr = var.cidr
  flow_log_role_arn = var.vpc_flow_log_role_arn
}

resource "aws_route53_zone" "env" {
  name   = var.domain
}

module "acm" {
  source      = "terraform-aws-modules/acm/aws"
  version     = "~> v2.0"
  domain_name = var.domain

  zone_id = aws_route53_zone.env.zone_id

  subject_alternative_names = ["*.${var.domain}"]

  wait_for_validation = true

  tags = {
    Name = var.name
  }
}

module "public_subnet" {
  source = "../subnet"

  name   = "public_subnet_${var.name}"
  vpc_id = module.vpc.id
  cidrs  = var.public_subnet_cidrs
  azs    = var.azs
}

module "private_app_subnet" {
  source = "../subnet"

  name   = "private_subnet_app_${var.name}"
  vpc_id = module.vpc.id
  cidrs  = var.private_app_subnet_cidrs
  azs    = var.azs
}

module "private_db_subnet" {
  source = "../subnet"

  name   = "private_subnet_db_${var.name}"
  vpc_id = module.vpc.id
  cidrs  = var.private_db_subnet_cidrs
  azs    = var.azs
}

module "db" {
  source = "../rds"

  name                    = var.name
  zone_id                 = aws_route53_zone.env.zone_id
  subnets                 = module.private_db_subnet.ids
  security_groups         = [aws_security_group.postgresql.id]
  db_name                 = var.rds_name
  db_user                 = var.rds_user
  db_password             = var.rds_password
  db_port                 = var.rds_port
  init_snnapshot_name     = var.init_rds_snapshot_name
}

module "api" {
  source = "../ecs"

  name                = var.name
  domain              = var.domain
  acm_certificate_arn = module.acm.this_acm_certificate_arn
  vpc                 = module.vpc.id
  zone_id             = aws_route53_zone.env.id
  sg_ecs_tasks        = [aws_security_group.ecs_tasks.id]
  sg_lb               = [aws_security_group.lb.id]
  public_subnets      = module.public_subnet.ids
  app_subnets         = module.private_app_subnet.ids
  ecs_services_access_role_arn = var.ecs_services_access_role_arn
  ecs_task_execution_role_arn  = var.ecs_task_execution_role_arn
  rds_endpoint        = module.db.db_address
  route_table_ids     = module.private_app_subnet.route_table_ids
  sg_vpce_id          = aws_security_group.vpce.id
}

module "bastion" {
  source = "../bastion"

  name        = var.name
  subnet      = element(module.public_subnet.ids, 1)
  bastion_sgs = [aws_security_group.bastion.id]

  ec2_key_name = var.bastion_key_name
  ec2_public_key = var.bastion_public_key
}

provider "aws" {
  alias  = "use1"
  region = "us-east-1"
}

module "wafv" {
  source = "../wafv"
  providers = {
    aws = aws.use1
  }
}

module "web" {
  source = "../web-app"

  name        = var.name
  zone_id     = aws_route53_zone.env.id
  domain      = var.domain
  s3_web_endpoint = var.s3_web_endpoint
  wafv2_acl_arn = module.wafv.wafv2_acl_arn
}

resource "aws_route" "public_igw_route" {
  count                  = length(var.public_subnet_cidrs)
  route_table_id         = flatten(module.public_subnet.route_table_ids)[count.index]  #tostring(module.public_subnet.route_table_ids[count.index])
  gateway_id             = module.vpc.igw
  destination_cidr_block = "0.0.0.0/0"
}

module "nat" {
  source = "../nat"

  subnet_ids   = module.public_subnet.ids
  subnet_count = length(var.public_subnet_cidrs)
}

resource "aws_route" "private_app_nat_route" {
  count                  = length(var.private_app_subnet_cidrs)
  route_table_id         = flatten(module.private_app_subnet.route_table_ids)[count.index]
  nat_gateway_id         = flatten(module.nat.ids)[count.index]
  // endpoint for SES API
  destination_cidr_block = "52.220.218.85/32"

}

resource "aws_route" "private_logz_app_nat_route" {
  count                  = length(var.private_app_subnet_cidrs)
  route_table_id         = flatten(module.private_app_subnet.route_table_ids)[count.index]
  nat_gateway_id         = flatten(module.nat.ids)[count.index]
  // endpoint for logz API
  destination_cidr_block = "54.79.44.34/32"

}

resource "aws_route" "private_db_nat_route" {
  count = length(var.private_db_subnet_cidrs)

  route_table_id         = flatten(module.private_db_subnet.route_table_ids)[count.index]
  nat_gateway_id         = flatten(module.nat.ids)[count.index]
  destination_cidr_block = "0.0.0.0/0"
}
