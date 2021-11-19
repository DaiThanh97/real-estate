output "instance_id" {
  description = "Id of the created bastion instance."
  value       = element(concat(aws_instance.bastion_host.*.id, [""]), 0)
}

output "public_ip" {
  description = "Public ip of the created bastion instance."
  value       = element(concat(aws_instance.bastion_host.*.public_ip, [""]), 0)
}