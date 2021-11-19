terraform {
  backend "s3" {
    bucket = "hspace-infrastructure"
    key    = "prod.state.tfstate"
  }
}
