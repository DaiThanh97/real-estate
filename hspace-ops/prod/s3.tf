data "aws_iam_policy_document" "s3_policy" {
  version = "2012-10-17"
  statement {
    sid     = "S1"
    effect  = "Allow"
    actions = ["s3:GetObject"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    resources = ["arn:aws:s3:::${var.web_domain}/*"]
  }
}

resource "aws_s3_bucket" "web" {
  bucket = var.web_domain
  acl    = "public-read"
  policy = data.aws_iam_policy_document.s3_policy.json
  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Environment = var.env_name
  }
}

data "aws_iam_policy_document" "storage_policy" {
  version = "2012-10-17"
  statement {
    sid     = "S1"
    effect  = "Allow"
    actions = ["s3:GetObject"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    resources = ["arn:aws:s3:::hspace-storage/*"]
  }
}

resource "aws_s3_bucket" "storage" {
  bucket = "hspace-storage"
  acl    = "public-read"
  policy = data.aws_iam_policy_document.storage_policy.json

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = [""]
  }


  tags = {
    Environment = var.env_name
  }
}
