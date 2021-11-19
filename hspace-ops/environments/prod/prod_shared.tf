# This file contains shared variables that almost all environments need.

variable "azs" {
  default = ["ap-southeast-1a", "ap-southeast-1b"]
}

variable "vpc_name" {
  default = "prod-halato"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

# Account identifier of the management environment.
variable "management_account_id" {
  default = ""
}

# Base ami id for VM's.
variable "base_ami_id" {
  default = "ami-15f28d47"
}

# Top-level domain for public services.
variable "domain" {}

# Cidr blocks for the public subnets in the VPC (count = number of AZ's)
variable "public_subnet_cidrs" {
  type    = list(string)
  default = []
}

# Cidr blocks for the private subnets in the VPC (count = number of AZ's)
variable "private_app_subnet_cidrs" {
  type    = list(string)
  default = []
}

variable "private_db_subnet_cidrs" {
  type    = list(string)
  default = []
}

variable "bastion_key_name" {}
variable "bastion_public_key" {}

variable "api_lb_cidrs" {}
variable "web_api_cidr" {}
