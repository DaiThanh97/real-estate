

resource "aws_wafv2_ip_set" "halato_ip_set" {
  name               = "halato-ip-set"
  description        = "halato ip set"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = ["113.161.55.215/32","14.169.142.236/32","14.169.175.128/32","171.224.241.132/32", "171.253.129.5/32",]
}

resource "aws_wafv2_web_acl" "halato_only_acl" {
  name  = "halato_only_rule"
  scope = "CLOUDFRONT"

  default_action {
    block {}
  }

  rule {
    name     = "halato-only-rule"
    priority = 1

    action {
      allow {}
    }

    statement {
      ip_set_reference_statement {
        arn = aws_wafv2_ip_set.halato_ip_set.arn
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = false
      metric_name                = "friendly-rule-metric-name"
      sampled_requests_enabled   = false
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = false
    metric_name                = "friendly-metric-name"
    sampled_requests_enabled   = false
  }
}
