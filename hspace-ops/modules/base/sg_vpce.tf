resource "aws_security_group" "vpce" {
  name   = "sg_vpce"
  vpc_id = module.vpc.id
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [module.vpc.cidr_block]
  }

  ingress {
    from_port   = 23
    to_port     = 23
    protocol    = "tcp"
    cidr_blocks = [module.vpc.cidr_block]
  }


  ingress {
    from_port   = 25
    to_port     = 25
    protocol    = "tcp"
    cidr_blocks = [module.vpc.cidr_block]
  }

  ingress {
    from_port   = 465
    to_port     = 465
    protocol    = "tcp"
    cidr_blocks = [module.vpc.cidr_block]
  }

  ingress {
    from_port   = 587
    to_port     = 587
    protocol    = "tcp"
    cidr_blocks = [module.vpc.cidr_block]
  }

  tags = {
    Environment = var.name
  }
}