data "template_file" "user_data" {
  template = file("${path.module}/templates/bastion_init_setup.sh")
}

resource "aws_key_pair" "hspace_key" {
  key_name   = var.ec2_key_name
  public_key = var.ec2_public_key
}

resource "aws_instance" "bastion_host" {

  ami                         = "ami-0c20b8b385217763f"
  instance_type               = "t2.nano"
  associate_public_ip_address = true
  ebs_optimized               = false
  vpc_security_group_ids      = var.bastion_sgs
  subnet_id                   = var.subnet
  user_data                   = data.template_file.user_data.rendered
  key_name                    = aws_key_pair.hspace_key.key_name


  tags = {
    Envrionment = var.name
    Name        = "Bastion host"
  }
}