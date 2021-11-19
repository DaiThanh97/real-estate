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

