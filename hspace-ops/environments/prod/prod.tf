module "env" {
  source = "../../modules/base"

  name                         = var.vpc_name
  cidr                         = var.vpc_cidr
  vpc_flow_log_role_arn        = aws_iam_role.vpc_flow_log_role.arn

  public_subnet_cidrs          = var.public_subnet_cidrs
  private_app_subnet_cidrs     = var.private_app_subnet_cidrs
  private_db_subnet_cidrs      = var.private_db_subnet_cidrs

  rds_user                     = var.rds_username
  rds_password                 = var.rds_password
  rds_name                     = var.rds_name
  init_rds_snapshot_name       = var.init_rds_snapshot_name

  azs                          = var.azs
  api_port                     = var.app_port
  ecs_services_access_role_arn = aws_iam_role.ecs_services_access_role.arn
  ecs_task_execution_role_arn  = aws_iam_role.ecs_task_execution_role.arn

  bastion_key_name             = var.bastion_key_name
  bastion_public_key           = var.bastion_public_key
  api_lb_cidrs                 = var.api_lb_cidrs
  web_api_cidr                 = var.web_api_cidr

  s3_web_endpoint = aws_s3_bucket.web.website_endpoint
}

// Legacy records from matbao dns
resource "aws_route53_record" "root" {
  zone_id = module.env.zone_id
  name    = var.domain
  type    = "A"
  ttl     = "300"
  records = ["45.76.146.102"]
}

resource "aws_route53_record" "mail" {
  zone_id = module.env.zone_id
  name    = "mail.${var.domain}"
  type    = "A"
  ttl     = "300"
  records = ["103.15.48.44"]
}
