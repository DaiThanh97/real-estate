variable "name" {}
variable "zone_id" {}

variable "db_name" {}
variable "db_user" {}
variable "db_password" {}
variable "db_port" {}

variable "subnets" {
  type = list(string)
}

variable "security_groups" {
  type = list(string)
}

variable "engine" {
  default = "postgres"
}

variable "engine_version" {
  default = "12.5"
}

variable "instance_class" {
  default = "db.t2.micro"
}

variable "allocated_storage" {
  # 10 gigabyte
  default = 20
}

variable "backup_retention_period" {
  # 1 day
  default = 7
}

variable "skip_final_snapshot" {
  default = true
}

variable "maintenance_window" {
  default = "Mon:00:00-Mon:03:00"
}

variable "backup_window" {
  default = "03:00-06:00"
}

variable "multi_az" {
  default = false
}

variable "storage_encrypted" {
  default = false
}

variable "publicly_accessible" {
  default = false
}

variable "init_snnapshot_name" {
  default = ""
}
