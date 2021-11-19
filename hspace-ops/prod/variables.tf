variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "ap-southeast-1"
}

variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "hspaceECSTaskExecutionRole"
}

variable "ecs_services_access_role_name" {
  description = "ECS services access role name"
  default     = "hspaceECSServicesAccessRole"
}

variable "ecs_auto_scale_role_name" {
  description = "ECS auto scale role name"
  default     = "hspaceECSAutoScaleRole"
}

variable "az_count" {
  description = "Number of AZs to cover in given region"
  default     = "2"
}

variable "api_image" {
  description = "API Docker image to run in the ECS cluster"
  default     = "404381451858.dkr.ecr.ap-southeast-1.amazonaws.com/hspace/api:1.0.0"
}

variable "socket_image" {
  description = "Socket Docker image to run in the ECS cluster"
  default     = "404381451858.dkr.ecr.ap-southeast-1.amazonaws.com/hspace/socket:1.0.0"
}

variable "db_migration_image" {
  description = "Db migration Docker image to run in the ECS cluster"
  default     = "404381451858.dkr.ecr.ap-southeast-1.amazonaws.com/hspace/migration:1.0.0"
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

variable "domain" {
  description = "Domain host"
  default     = "halanet.vn"
}

variable "web_domain" {
  description = "Domain host of web"
  default     = "app.halanet.vn"
}

variable "db_port" {
  description = "Port exposed by RDS database"
  default     = "5432"
}

variable "db_identifier" {
  description = "DB indentifier"
  default     = "hspace-maindb"
}

variable "db_name" {
  description = "DB name"
  default     = "hspace"
}

variable "env_name" {
  description = "Environment name"
  default     = "production"
}

variable "s3_env_bucket" {
  description = "S3 bucket where located env file"
  default     = "hspace-env"
}

variable "health_check_path" {
  default = "/"
}

variable "ec2_key_name" {
  description = "AWS EC2 key pair name which is used for ssh access"
  default     = "hspace-prod"
}

variable "enable_bastion" {
  description = "Enable bastion flag"
  default     = false
}

# Sensitive variable 
variable "ec2_public_key" {
  description = "AWS EC2 public key which is used for ssh access"
  default = "hspace"
}

variable "db_password" {
  description = "Main db password"
  default = "You-never-know"
}

variable "db_user" {
  description = "Main db user"
  default = "default-user"
}
# End of sensitive vairable 
