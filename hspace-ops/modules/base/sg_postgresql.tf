resource "aws_security_group" "postgresql" {
  name        = "sg_postgresql"
  description = "Postgresql database traffic"
  vpc_id      = module.vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "TCP"
    security_groups = [aws_security_group.ecs_tasks.id, aws_security_group.bastion.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
