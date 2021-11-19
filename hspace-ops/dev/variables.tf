variable "aws_region" {
  description = "AWS region to launch servers."
  default = "ap-southeast-1"
}

variable "number_of_instances" {
  description = "Number of instances to create and attach to ELB"
  default = 1
}

