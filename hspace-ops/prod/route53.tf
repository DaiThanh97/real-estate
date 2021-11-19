resource "aws_route53_zone" "main" {
  name = var.domain
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_alb.api.dns_name
    zone_id                = aws_alb.api.zone_id
    evaluate_target_health = true
  }
}


resource "aws_route53_record" "socket" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "socket.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_alb.socket.dns_name
    zone_id                = aws_alb.socket.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "web" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.web_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.web_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.web_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}


// Legacy records from matbao dns
resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain
  type    = "A"
  ttl     = "300"
  records = ["45.76.146.102"]
}

resource "aws_route53_record" "mail" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "mail.${var.domain}"
  type    = "A"
  ttl     = "300"
  records = ["103.15.48.44"]
}

