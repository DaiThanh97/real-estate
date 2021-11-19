# hspace-ops

## Prerequisite
- Terraform version 0.13 or above
- AWS CLI with config profile located as below:
  - path: $HOME/.aws
  - name: default
  - This setting can be overrided at {ENV_NAME}/provider.tf.

## Production infrastructure

### Entry point
`cd prod` to start manage production infrastructure

### Initial
```
terraform init
terraform state pull
```
If you encountered to provide AWS region, you need to use default region which is defined at `variables.tf`.

### Deploy new changes
Create your own `terraform.tfvars` to override value at `variables.tf` then perform this command below

```
terraform apply
```

### Enable bastion host
`enable_bastion` is the variable which is controled wherether the bastion host is enable or not. The default value is `false`, change it to `true` at your `terraform.tfvars` to enable it. After apply new change, you will see the output which contains public ip of the bastion which can be used for ssh like this:

```
ssh -i "BASTION_PRIVATE_KEY_FILE" ubuntu@BASTION_PUBLIC_IP
```

Ask your admin to get BASTION_PRIVATE_KEY_FILE or you can modify two variables `ec2_public_key` and `ec2_key_name` to create new one.

### Define environment variables
In case you need to define an environment variable for your ECS task, you need to follow these steps below:
- Go to `templates/ecs` and open the template of your task.
- In your template file, go to `environment` section, and put your variable in it with format

```
{
  "name": "YOUR_VAR_NAME"
  "value": "YOUR_VALUE"
}
```
- Apply your changes by run `terraform apply`.

#### Secret information
If your variable contains sensitive information like service password, secret key .etc then you have to create a secret key-val record at AWS Secret Manager so that you can pull it to your ECS task.

- Create your secret record at AWS Secret Manager:
```
aws secretsmanager create-secret --name "YOUR_SECRET_NAME" --description "YOUR_SECRET_DESCRIPTION" --secret-string "YOUR_SECRET_STRING"
```
If this command run successfully, you will get the result which look likes this 
```
    "ARN": "arn:aws:secretsmanager:app-southeast-1:123456789012:secret:YOUR_SECRET_NAME-rzM8Ja",
    "Name": "YOUR_SECRET_NAME",
    "VersionId": "35e07aa2-684d-42fd-b076-3b3f6a19c6dc"
```
- Go to `template/ecs` and open the template of your task. Jump to `secrets` section, put your variable in it with format:
```
{
  "name": "YOUR_SECRET_NAME"
  "valueFrom": "arn:aws:secretsmanager:app-southeast-1:123456789012:secret:YOUR_SECRET_NAME-rzM8Ja"
}
```
- Apply your changes by run `terraform apply`.

### Change application version
Override those variables `api_image`, `socket_image`, and `db_migration_image` to change version of applications which are running in production.

## Release flow
- Every commit push to `develop` branch will create a Docker image which is tagged by `COMMIT_HASH` and `dev-latest`. The `DEV` and `QA` environment use `dev-latest` tag to specific which Docker image are using.
- Every commit push to `releases/*` branches will tag a Docker image which has current `COMMIT_HASH` tag to `rc`. The `STAGING` environment use this tag to specific which Docker image are using.
- When merge `releases/*` branches into `master` branch, a Docker image which has current `COMMIT_HASH` tag will be tagged to `latest`. 
- Create a git tag in `master` branch will tag a Docker image has corresponding `COMMIT_HASH` tag an equal tag. This workflow is used to versioning Docker image that will be used for production hosting.
