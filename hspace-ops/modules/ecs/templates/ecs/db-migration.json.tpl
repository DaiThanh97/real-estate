[
  {
      "name": "${app_name}",
      "image": "${app_image}",
      "cpu": ${fargate_cpu},
      "memory": ${fargate_memory},
      "networkMode": "awsvpc",
      "environment": [{
        "name": "TYPEORM_CONNECTION",
        "value": "postgres"
      },{
        "name": "TYPEORM_HOST",
        "value": "hspace-maindb.cqjfjz8reebz.ap-southeast-1.rds.amazonaws.com"
      },{
        "name": "TYPEORM_DATABASE",
        "value": "hspace"
      },{
        "name": "TYPEORM_PORT",
        "value": "5432"
      },{
        "name": "TYPEORM_ENTITIES",
        "value": "dist/infrastructure/orm/typeorm/models/*.js"
      },{
        "name": "TYPEORM_ENTITIES_DIR",
        "value": "dist/infrastructure/orm/typeorm/models"
      },{
        "name": "PORT",
        "value": "8080"
      },{
        "name": "JWT_EXPIRE",
        "value": "864000"
      },{
        "name": "CORS_ORIGINS",
        "value": "*"
      },{
        "name": "CORS_HEADERS",
        "value": "Origin,X-Requested-With,Content-Type,Accept,Authorization,X-Halato-User"
      },{
        "name": "AWS_DEFAULT_REGION",
        "value": "ap-southeast-1"
      },{
        "name": "AWS_S3_BUCKET_NAME",
        "value": "hspace-storage"
      },{
        "name": "FILE_MAX_LIMIT_UPLOAD_SIZE",
        "value": "83886080"
      },{
        "name": "AWS_SDK_LOAD_CONFIG",
        "value": "1"
      },{
        "name": "AWS_SES_SENDER",
        "value": "halatech@halato.vn"
      },{
        "name": "SOCKER_PORT",
        "value": "8888"
      },{
        "name": "SOCKET_TRANSPORTS",
        "value": "websocket"
      },{
        "name": "SERVER_URL",
        "value": "https://app.halanet.vn"
      }],
      "secrets": [
      {
        "name": "TYPEORM_USERNAME",
        "valueFrom": "arn:aws:secretsmanager:ap-southeast-1:404381451858:secret:TYPEORM_USERNAME-mpu2Bk"
      },{
        "name": "TYPEORM_PASSWORD",
        "valueFrom": "arn:aws:secretsmanager:ap-southeast-1:404381451858:secret:TYPEORM_PASSWORD-mmUGWR"
      },{
        "name": "JWT_SECRET_KEY",
        "valueFrom": "arn:aws:secretsmanager:ap-southeast-1:404381451858:secret:JWT_SECRET_KEY-3GxKyF"
      }],
      "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
                    "awslogs-group": "/ecs/${app_name}",
                    "awslogs-region": "${aws_region}",
                    "awslogs-stream-prefix": "ecs"
                  }
          },
      "portMappings": [
            {
                    "containerPort": ${app_port},
                    "hostPort": ${app_port}
                  }
          ]
    }
]
