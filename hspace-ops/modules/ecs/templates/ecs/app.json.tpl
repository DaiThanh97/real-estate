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
        "value": "${rds_endpoint}"
      },{
        "name": "TYPEORM_DATABASE",
        "value": "hspace"
      },{
        "name": "TYPEORM_PORT",
        "value": "5432"
      },{
        "name": "TYPEORM_ENTITIES",
        "value": "dist/infrastructure/orm/typeorm/models/*.js,dist/infrastructure/orm/typeorm/views/*.js"
      },{
        "name": "TYPEORM_ENTITIES_DIR",
        "value": "dist/infrastructure/orm/typeorm/models,dist/infrastructure/orm/typeorm/views"
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
        "value": "Origin,X-Requested-With,Content-Type,Accept,Authorization,X-Halato-User,X-Halato-License"
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
        "name": "FIREBASE_DATABASE_URL",
        "value": "https://halato-production.firebaseio.com"
      },{
        "name": "FIREBASE_PROJECT_ID",
        "value": "halato-production"
      },{
        "name": "FIREBASE_CLIENT_EMAIL",
        "value": "firebase-adminsdk-soylh@halato-production.iam.gserviceaccount.com"
      },{
        "name": "LICENCE_EXPIRE",
        "value": "120"
      },{
        "name": "LICENCE_SECRET_KEY",
        "value": "you_never_know_license"
      },{
        "name": "SOCKET_TRANSPORTS",
        "value": "websocket"
      },{
        "name": "SERVER_URL",
        "value": "https://api.halanet.vn"
      },{
        "name": "TYPEORM_SUBSCRIBERS",
        "valueFrom": "dist/infrastructure/orm/typeorm/subscribers/*.js"
       },{
        "name": "TYPEORM_SUBSCRIBERS_DIR",
        "valueFrom": "dist/infrastructure/orm/typeorm/subscribers"
       },{
        "name": "API_ENV",
        "value": "production"
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
      },{
        "name": "FIREBASE_PRIVATE_KEY",
        "valueFrom": "arn:aws:secretsmanager:ap-southeast-1:404381451858:secret:FIREBASE_PRIVATE_KEY-Xs7j5w"
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
        },
        {
        "containerPort": ${socket_port},
        "hostPort": ${socket_port}
        }
      ]
    }
]
