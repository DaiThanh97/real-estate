data "aws_secretsmanager_secret" "db_user" {
  arn = "arn:aws:secretsmanager:ap-southeast-1:404381451858:secret:TYPEORM_USERNAME-mpu2Bk"
}

data "aws_secretsmanager_secret_version" "db_user_current" {
  secret_id = data.aws_secretsmanager_secret.db_user.id
}


data "aws_secretsmanager_secret" "db_password" {
  arn = "arn:aws:secretsmanager:ap-southeast-1:404381451858:secret:TYPEORM_PASSWORD-mmUGWR"
}

data "aws_secretsmanager_secret_version" "db_password_current" {
  secret_id = data.aws_secretsmanager_secret.db_password.id
}


module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  identifier        = var.name
  engine            = var.engine
  engine_version    = var.engine_version
  instance_class    = var.instance_class
  allocated_storage = var.allocated_storage
  storage_encrypted = false

  name     = var.db_name
  username = coalesce(data.aws_secretsmanager_secret_version.db_user_current.secret_string, var.db_user)
  password = coalesce(data.aws_secretsmanager_secret_version.db_password_current.secret_string, var.db_password)
  port     = var.db_port

  vpc_security_group_ids = var.security_groups

  maintenance_window = var.maintenance_window
  backup_window      = var.backup_window

  backup_retention_period = var.backup_retention_period

  tags = {
    Environment = var.name
  }

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  subnet_ids = var.subnets

  family = "postgres12"

  major_engine_version = "12"

  final_snapshot_identifier = "snapshot-db-${var.name}"

  deletion_protection = true
  snapshot_identifier = var.init_snnapshot_name
}

resource "aws_route53_record" "rds" {
  zone_id = var.zone_id
  name    = "db"
  type    = "CNAME"
  ttl     = 5
  records = [replace(module.db.this_db_instance_endpoint, "/:.*/", "")]
}