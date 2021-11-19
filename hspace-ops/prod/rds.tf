module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  identifier        = var.db_identifier
  engine            = "postgres"
  engine_version    = "12.4"
  instance_class    = "db.t2.micro"
  allocated_storage = 20
  storage_encrypted = false

  name     = var.db_name
  username = var.db_user
  password = var.db_password
  port     = var.db_port

  vpc_security_group_ids = [aws_security_group.db.id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  backup_retention_period = 7

  tags = {
    Environment = var.env_name
  }

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  subnet_ids = aws_subnet.private.*.id

  family = "postgres12"

  major_engine_version = "12"

  final_snapshot_identifier = var.db_identifier

  deletion_protection = true
}
