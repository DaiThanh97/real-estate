terraform {
  backend "s3" {
    bucket         = "hspace-infrastructure"
    encrypt        = true
    key            = "stage/state.tf"
    region         = var.aws_region
  }
}