resource "aws_cloudwatch_log_group" "api_log_group" {
  name              = "/ecs/${var.name}-api"
  retention_in_days = 30

  tags = {
    Name        = "api-log-group"
    Environment = var.name
  }
}

resource "aws_cloudwatch_log_stream" "api_log_stream" {
  name           = "api-log-stream"
  log_group_name = aws_cloudwatch_log_group.api_log_group.name
}


resource "aws_cloudwatch_log_group" "socket_log_group" {
  name              = "/ecs/${var.name}-socket"
  retention_in_days = 30

  tags = {
    Name        = "socket-log-group"
    Environment = var.name
  }
}

resource "aws_cloudwatch_log_group" "migration_log_group" {
  name              = "/ecs/${var.name}-migration"
  retention_in_days = 30

  tags = {
    Name        = "migration-log-group"
    Environment = var.name
  }
}

resource "aws_cloudwatch_log_stream" "migration_log_stream" {
  name           = "migration-log-stream"
  log_group_name = aws_cloudwatch_log_group.migration_log_group.name
}
