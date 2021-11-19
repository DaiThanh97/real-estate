
resource "aws_alb" "api" {
  name               = "${var.name}-api-load-balancer"
  internal           = false
  load_balancer_type = "application"
  subnets            = var.public_subnets
  security_groups    = var.sg_lb

  tags = {
    Environment = var.name
  }
}

resource "aws_alb" "socket" {
  name               = "${var.name}-socket-load-balancer"
  internal           = false
  load_balancer_type = "network"
  subnets            = var.public_subnets

  tags = {
    Environment = var.name
  }
}

resource "aws_alb_target_group" "api" {
  name        = "${var.name}-api-tg"
  port        = var.api_port
  protocol    = "HTTP"
  vpc_id      = var.vpc
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

resource "aws_alb_listener" "api" {
  load_balancer_arn = aws_alb.api.id
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    target_group_arn = aws_alb_target_group.api.id
    type             = "forward"
  }
}

resource "aws_alb_target_group" "socket" {
  name        = "prod-socket-tg"
  port        = var.socket_port
  protocol    = "TCP"
  vpc_id      = var.vpc
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


resource "aws_alb_listener" "socket" {
  load_balancer_arn = aws_alb.socket.id
  port              = 443
  protocol          = "TLS"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    target_group_arn = aws_alb_target_group.socket.id
    type             = "forward"
  }
}

