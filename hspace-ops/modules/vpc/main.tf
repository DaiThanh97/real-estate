resource "aws_vpc" "vpc" {
  cidr_block           = var.cidr
  enable_dns_hostnames = true

  tags = {
    Environment = var.name
  }
}

resource "aws_internet_gateway" "vpc" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Environment = var.name
  }
}

resource "aws_cloudwatch_log_group" "vpc_flow_log_group" {
  name            = "${var.name}_vpc_flow_log"
}


resource "aws_flow_log" "log" {
  iam_role_arn    = var.flow_log_role_arn
  log_destination = aws_cloudwatch_log_group.vpc_flow_log_group.arn
  traffic_type    = "ALL"
  vpc_id          = aws_vpc.vpc.id
}
