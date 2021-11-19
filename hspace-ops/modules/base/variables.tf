variable "name" {}
variable "cidr" {}
variable "vpc_flow_log_role_arn" {
  default = ""
}
variable "public_subnet_cidrs" {
  type = list(string)
}
variable "private_app_subnet_cidrs" {
  type = list(string)
}
variable "private_db_subnet_cidrs" {
  type = list(string)
}
variable "azs" {
  type = list(string)
}

variable "bastion_key_name" {}
variable "bastion_public_key" {}

variable "rds_name" {}
variable "rds_user" {}
variable "rds_password" {}
variable "rds_port" {
  description = "Port exposed by RDS database"
  default     = "5432"
}
variable "init_rds_snapshot_name" {
  default = ""
}
variable "api_port" {}
variable "socket_port" {
  default = "8888"
}

variable "ecs_task_execution_role_arn" {
  description = "ECS task execution role"
}

variable "ecs_services_access_role_arn" {
  description = "ECS services access role"
}

variable "s3_web_endpoint" {}

variable "domain" {
  description = "Domain host"
  default     = "halanet.vn"
}
variable "api_lb_cidrs" {}
variable "web_api_cidr" {}
