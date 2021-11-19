module "acm" {
  source      = "terraform-aws-modules/acm/aws"
  version     = "~> v2.0"
  domain_name = var.domain

  zone_id = aws_route53_zone.main.zone_id

  subject_alternative_names = ["*.${var.domain}"]

  wait_for_validation = true

  tags = {
    Name = var.domain
  }

}
