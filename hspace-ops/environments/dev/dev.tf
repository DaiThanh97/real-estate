module "env" {
  source = "../../modules/base.env"

  aws_region                  = "ap-southeast-1"
  name                        = var.vpc_name
  cidr                        = var.vpc_cidr
  public_key                  = var.public_key
  ssl_certificate_id          = "arn:aws:acm:ap-southeast-1:317527472911:certificate/c44a895b-493f-4321-a55c-5b5c9a3eb666"
  subdomain                   = var.subdomain

  public_subnet_cidrs         = var.public_subnet_cidrs
  private_app_subnet_cidrs    = var.private_app_subnet_cidrs
  private_db_subnet_cidrs     = var.private_db_subnet_cidrs
  rds_username                = var.rds_username
  rds_password                = var.rds_password
  rds_instance_class          = var.rds_instance_class
  rds_allocated_storage       = var.rds_allocated_storage
  rds_multi_az                = var.rds_multi_az
  rds_publicly_accessible     = var.rds_publicly_accessible
  rds_skip_final_snapshot     = var.rds_skip_final_snapshot
  rds_backup_retention_period = var.rds_backup_retention_period
  azs                         = var.azs
  base_ami_id                 = var.base_ami_id
  app_ami_id                  = var.app_ami_id
  app_instance_type           = var.app_instance_type
  app_root_volume_size        = var.app_root_volume_size
  env_name                    = "dev"
}
