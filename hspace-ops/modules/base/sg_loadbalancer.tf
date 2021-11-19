resource "aws_security_group" "lb" {
  name        = "${var.name}-load-balancer-sg"
  description = "controls access to the ALB in ${var.name}"
  vpc_id      = module.vpc.id

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = var.api_lb_cidrs
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
