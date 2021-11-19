variable "name" {}
variable "bastion_sgs" {
  type = list(string)
}
variable "subnet" {}
variable "ec2_key_name" {
  description = "AWS EC2 key pair name which is used for ssh access"
  default     = "hspace-prod"
}

variable "ec2_public_key" {
  description = "AWS EC2 public key which is used for ssh access"
  default = "hspace"
}