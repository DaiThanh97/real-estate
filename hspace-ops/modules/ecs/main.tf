data "template_file" "api" {
  template = file("${path.module}/templates/ecs/app.json.tpl")

  vars = {
    app_name       = "${var.name}-api"
    app_image      = var.api_image
    app_port       = var.api_port
    socket_port    = var.socket_port
    s3_bucket_name = var.s3_env_bucket
    env_file_name  = var.env_api_file_name
    fargate_cpu    = var.fargate_cpu
    fargate_memory = var.fargate_memory
    aws_region     = var.aws_region
    rds_endpoint    = var.rds_endpoint
  }
}


data "template_file" "db_migration" {
  template = file("${path.module}/templates/ecs/db-migration.json.tpl")

  vars = {
    app_name       = "${var.name}-migration"
    app_image      = var.db_migration_image
    s3_bucket_name = var.s3_env_bucket
    env_file_name  = var.env_migration_file_name
    fargate_cpu    = var.fargate_cpu
    fargate_memory = var.fargate_memory
    aws_region     = var.aws_region
    rds_endpoint    = var.rds_endpoint
  }
}

resource "aws_ecs_task_definition" "api" {
  family                   = "${var.name}-api-task"
  task_role_arn            = var.ecs_services_access_role_arn
  execution_role_arn       = var.ecs_task_execution_role_arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions    = data.template_file.api.rendered
}

resource "aws_ecs_service" "api" {
  name             = "${var.name}-api-service"
  cluster          = aws_ecs_cluster.main.id
  task_definition  = aws_ecs_task_definition.api.arn
  desired_count    = var.api_min_containers
  launch_type      = "FARGATE"
  platform_version = "1.3.0"

  network_configuration {
    security_groups  = var.sg_ecs_tasks
    subnets          = var.app_subnets
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.api.id
    container_name   = "${var.name}-api"
    container_port   = var.api_port
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.socket.id
    container_name   = "${var.name}-api"
    container_port   = var.socket_port
  }

  depends_on = [aws_alb_listener.api]
}

resource "aws_ecs_task_definition" "migration" {
  family                   = "${var.name}-migration-task"
  task_role_arn            = var.ecs_services_access_role_arn
  execution_role_arn       = var.ecs_task_execution_role_arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions    = data.template_file.db_migration.rendered
}

resource "aws_ecs_service" "migration" {
  name             = "${var.name}-migration-service"
  cluster          = aws_ecs_cluster.main.id
  task_definition  = aws_ecs_task_definition.migration.arn
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "1.3.0"

  network_configuration {
    security_groups = var.sg_ecs_tasks
    subnets         = var.app_subnets
  }
}

resource "aws_vpc_endpoint" "dkr" {
  vpc_id              = var.vpc
  private_dns_enabled = true
  service_name        = "com.amazonaws.ap-southeast-1.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  security_group_ids = [
    var.sg_vpce_id
  ]
  subnet_ids = var.app_subnets

  tags = {
    Name        = "dkr-endpoint"
    Environment = var.name
  }
}

resource "aws_vpc_endpoint" "ses" {
  vpc_id              = var.vpc
  private_dns_enabled = true
  service_name        = "com.amazonaws.ap-southeast-1.email-smtp"
  vpc_endpoint_type   = "Interface"
  security_group_ids = [
    var.sg_vpce_id
  ]
  subnet_ids = var.app_subnets

  tags = {
    Name        = "ses-endpoint"
    Environment = var.name
  }
}

resource "aws_vpc_endpoint" "s3" {
  vpc_id            = var.vpc
  service_name      = "com.amazonaws.ap-southeast-1.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = var.route_table_ids

  tags = {
    Name        = "s3-endpoint"
    Environment = var.name
  }
}

resource "aws_vpc_endpoint" "logs" {
  vpc_id              = var.vpc
  private_dns_enabled = true
  service_name        = "com.amazonaws.ap-southeast-1.logs"
  vpc_endpoint_type   = "Interface"
  security_group_ids = [
    var.sg_vpce_id
  ]
  subnet_ids = var.app_subnets

  tags = {
    Name        = "logs-endpoint"
    Environment = var.name
  }
}

resource "aws_route53_record" "api" {
  zone_id = var.zone_id
  name    = "api.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_alb.api.dns_name
    zone_id                = aws_alb.api.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "socket" {
  zone_id = var.zone_id
  name    = "socket.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_alb.socket.dns_name
    zone_id                = aws_alb.socket.zone_id
    evaluate_target_health = true
  }
}

