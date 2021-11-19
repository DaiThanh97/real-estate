resource "aws_cloudfront_distribution" "web_distribution" {
  origin {
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    domain_name = var.s3_web_endpoint
    origin_id   = "app.${var.domain}"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "app.${var.domain}"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  aliases = ["app.${var.domain}"]

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }


restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    // Need to use use-east-1 acm arn
    acm_certificate_arn = "arn:aws:acm:us-east-1:404381451858:certificate/ae46b707-4cca-4187-9ac3-53289931749d"
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "web" {
  zone_id = var.zone_id
  name    = "app.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.web_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.web_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

