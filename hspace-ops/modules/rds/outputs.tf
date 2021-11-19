output "db_address" {
  description = "The address of the RDS instance"
  value       = module.db.this_db_instance_address
}

output "db_arn" {
  description = "The ARN of the RDS instance"
  value       = module.db.this_db_instance_arn
}

output "db_availability_zone" {
  description = "The availability zone of the RDS instance"
  value       = module.db.this_db_instance_availability_zone
}

output "db_endpoint" {
  description = "The connection endpoint"
  value       = module.db.this_db_instance_endpoint
}

output "db_username" {
  description = "The master username for the database"
  value       = module.db.this_db_instance_username
}
