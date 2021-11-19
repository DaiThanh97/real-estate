resource "aws_security_group" "ecs_tasks" {
  name        = "${var.name}-ecs-tasks-sg"
  description = "allow inbound access from the ALB only"
  vpc_id      = module.vpc.id

  ingress {
    protocol        = "tcp"
    from_port       = var.api_port
    to_port         = var.api_port
    security_groups = [aws_security_group.lb.id]
  }

  ingress {
    protocol    = "tcp"
    from_port   = var.socket_port
    to_port     = var.socket_port
    cidr_blocks = [module.vpc.cidr_block]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
