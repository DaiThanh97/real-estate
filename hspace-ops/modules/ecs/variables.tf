variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "ap-southeast-1"
}

variable "ecs_task_execution_role_arn" {
  description = "ECS task execution role"
}

variable "ecs_services_access_role_arn" {
  description = "ECS services access role"
}

variable "vpc" {}
variable "zone_id" {}
variable "acm_certificate_arn" {}
variable "domain" {}
variable "public_subnets" {
  type = list(string)
}
variable "app_subnets" {
  type = list(string)
}
variable "sg_ecs_tasks" {
  type = list(string)
}
variable "sg_lb" {}

variable "sg_vpce_id" {}

variable "route_table_ids" {
  type = list(string)
}

variable "name" {
  default = "hspace"
}
variable "env_api_file_name" {
  default = "prod.api"
}
variable env_migration_file_name {
  default = "prod.db-migration"
}

variable "rds_endpoint" {}

resource "aws_ecs_cluster" "main" {
  name = "cluster_${var.name}"
}


variable "az_count" {
  description = "Number of AZs to cover in given region"
  default     = "2"
}

variable "api_image" {
  description = "API Docker image to run in the ECS cluster"
  default     = "404381451858.dkr.ecr.ap-southeast-1.amazonaws.com/hspace/api_socket:1.3.0"
}

variable "socket_image" {
  description = "Socket Docker image to run in the ECS cluster"
  default     = "404381451858.dkr.ecr.ap-southeast-1.amazonaws.com/hspace/socket:1.1.0"
}

variable "db_migration_image" {
  description = "Db migration Docker image to run in the ECS cluster"
  default     = "404381451858.dkr.ecr.ap-southeast-1.amazonaws.com/hspace/migration:1.3.0"
}

variable "api_port" {
  description = "Port exposed by the api Docker image to redirect traffic to"
  default     = "8080"
}

variable "socket_port" {
  description = "Port exposed by the socket Docker image to redirect traffic to"
  default     = "8888"
}

variable "api_min_containers" {
  description = "Minimum number of API containers to run"
  default     = 2
}

variable "api_max_containers" {
  description = "Maximum number of API containers to run"
  default     = 6
}

variable "socket_min_containers" {
  description = "Minimum number of Socket containers to run"
  default     = 1
}

variable "socket_max_containers" {
  description = "Maximum number of Socket containers to run"
  default     = 4
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU unists)"
  default     = "1024"
}

variable "fargate_memory" {
  description = "Fargate instane memory o provision (in MiB)"
  default     = "2048"
}

variable "s3_env_bucket" {
  description = "S3 bucket where located env file"
  default     = "hspace-env"
}

variable "health_check_path" {
  default = "/"
}
