output "id" {
  value = aws_vpc.vpc.id
}

output "main_route_table_id" {
  value = aws_vpc.vpc.main_route_table_id
}

output "default_security_group_id" {
  value = aws_vpc.vpc.default_security_group_id
}

output "cidr_block" {
  value = aws_vpc.vpc.cidr_block
}

output "igw" {
  value = aws_internet_gateway.vpc.id
}
