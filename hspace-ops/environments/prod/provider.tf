provider "aws" {
  shared_credentials_file = "$HOME/.aws/credentials"
  profile                 = "halato"
  region                  = "ap-southeast-1"
}

terraform {
  backend "s3" {
    bucket         = "hspace-infrastructure"
    encrypt        = true
    key            = "prod.state.tfstate"
    region         = "ap-southeast-1"
  }
}
