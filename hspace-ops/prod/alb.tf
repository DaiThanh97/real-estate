resource "aws_alb" "api" {
  name               = "prod-api-load-balancer"
  internal           = false
  load_balancer_type = "application"
  subnets            = aws_subnet.public.*.id
  security_groups    = [aws_security_group.lb.id]

  tags = {
    Environment = var.env_name
  }
}

resource "aws_alb" "socket" {
  name               = "prod-socket-load-balancer"
  internal           = false
  load_balancer_type = "network"
  subnets            = aws_subnet.public.*.id

  tags = {
    Environment = var.env_name
  }
}

resource "aws_alb_target_group" "api" {
  name        = "prod-api-tg"
  port        = var.api_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }

  stickiness {
    type = "lb_cookie"
  }
}


resource "aws_alb_target_group" "socket" {
  name        = "prod-socket-tg"
  port        = var.socket_port
  protocol    = "TCP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    unhealthy_threshold = "3"
  }

  stickiness {
    type = "source_ip"
  }
}

resource "aws_alb_listener" "api" {
  load_balancer_arn = aws_alb.api.id
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = module.acm.this_acm_certificate_arn

  default_action {
    target_group_arn = aws_alb_target_group.api.id
    type             = "forward"
  }
}

resource "aws_alb_listener" "socket" {
  load_balancer_arn = aws_alb.socket.id
  port              = 443
  protocol          = "TLS"
  certificate_arn   = module.acm.this_acm_certificate_arn

  default_action {
    target_group_arn = aws_alb_target_group.socket.id
    type             = "forward"
  }
}
