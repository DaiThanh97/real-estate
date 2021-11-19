aws_region = "ap-southeast-1"
vpc_cidr = "10.0.0.0/16"
domain = "halanet.vn"

private_app_subnet_cidrs = ["10.0.48.0/21", "10.0.112.0/21"]
private_db_subnet_cidrs = ["10.0.0.0/19", "10.0.64.0/19"]
public_subnet_cidrs = ["10.0.32.0/20", "10.0.96.0/20"]

app_ami_id = "ami-044f6b65ca57f16dd" #UBUNTU
app_port = 8080

rds_username = "default-user"
rds_password = "you-will-never-know"
rds_name = "hspace"
init_rds_snapshot_name = "init-halatpo-prod"

bastion_key_name = "prod_halato"
bastion_public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQD2YkeC0FyiX0jI4cAezLyFyxIVWggJl/EayD6Ag4pxzdZDa3bHarRsdEFa2vIkMgC+fWD/eAgvNz2qzcJbhxxL/RqL655oz5J2098nKWk/d9OStktu5MD/nqDE/UVxtff5w04gHm/+ZtTErBYto5KTtZ6zwoKU0QeBJW2OaSbJgYGkrxWtPLekOK9NMxlpXwNLoFOjrHDA+0CkM6uBd3CVhURuBSrfR5+2+rqivk5hMI+UZH4GbwfQype24gKJ/Vtqb7W9c1nQi0wrFnFY+pr/VzwlzO/G1PpxRm3LKM+GOf0kBNmG5h0Sn7ejyN8v4hWivdD8pJuXmRw/B54ZBf2nydLet4eO3H/0XET/wJ9Btz4g3aZT2sFLToRICVjtH8Y0BVsay925Op78cXRplLFGZ/qeeQQs0qBl0xoOZpExfxts2+XvUwTRwzeadLs3qzPkriWf9CerzRAWIV2dzhKzbVnZmIAoINTGFhre8wM+QNUY3BD5RTWFvDkh91tlTlE= liem.tran@Liems-MacBook-Pro.local"
api_lb_cidrs=["0.0.0.0/0"]
web_api_cidr="171.224.241.132/32"
