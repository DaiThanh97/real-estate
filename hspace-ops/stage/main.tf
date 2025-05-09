provider "aws" {
  region = var.aws_region
}

resource random_pet this {
  length = 2
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "all" {
  vpc_id = data.aws_vpc.default.id
}

data "aws_security_group" "hspace_api_stage_alb" {
  vpc_id = data.aws_vpc.default.id
  name = "hspace-api-stage-alb"
}

data "aws_security_group" "hspace_api_stage_ec2" {
  vpc_id = data.aws_vpc.default.id
  name = "hspace-api-stage-ec2"
}

data "aws_elb_service_account" this {}

resource "aws_s3_bucket" "logs" {
  bucket        = "elb-logs-${random_pet.this.id}"
  acl           = "private"
  policy        = data.aws_iam_policy_document.logs.json
  force_destroy = true
}

data "aws_iam_policy_document" "logs" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    principals {
      type        = "AWS"
      identifiers = [data.aws_elb_service_account.this.arn]
    }

    resources = [
      "arn:aws:s3:::elb-logs-${random_pet.this.id}/*",
    ]
  }
}

module "elb" {
  source = "terraform-aws-modules/elb/aws"
  version = "2.4.0"

  name = "hspace-api-stage-elb"

  subnets         = data.aws_subnet_ids.all.ids
  security_groups = [data.aws_security_group.hspace_api_stage_alb.id]
  internal        = false

  listener = [
    {
      instance_port     = "80"
      instance_protocol = "http"
      lb_port           = "8080"
      lb_protocol       = "http"
    }
  ]

  health_check = {
    target              = "HTTP:8080/"
    interval            = 30
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
  }

  access_logs = {
    bucket = aws_s3_bucket.logs.id
  }

  # ELB attachments
  number_of_instances = var.number_of_instances
  instances           = module.ec2_instances.id
}

module "ec2_instances" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 2.0"

  instance_count = var.number_of_instances

  name                        = "hspace-api-stage"
  ami                         = "ami-ebd02392"
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [data.aws_security_group.hspace_api_stage_ec2.id]
  subnet_id                   = element(tolist(data.aws_subnet_ids.all.ids), 0)
  associate_public_ip_address = true
}