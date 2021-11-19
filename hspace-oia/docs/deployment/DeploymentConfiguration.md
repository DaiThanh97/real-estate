## Deployment note
### Update in 14/04/2021
- Move all variables from .env to .env.migration (for beans)
- Add NODE_OPTIONS TO .env.migration: NODE_OPTIONS=--max_old_space_size=1024
- Change TYPEORM_ENTITIES, TYPEORM_ENTITIES_DIR in:
    -  .env  : 
        - TYPEORM_ENTITIES=dist/infrastructure/orm/typeorm/models/*.js,dist/infrastructure/orm/typeorm/views/*.js
        - TYPEORM_ENTITIES_DIR=dist/infrastructure/orm/typeorm/models,dist/infrastructure/orm/typeorm/views
    - .env.migration :
        - TYPEORM_ENTITIES=src/infrastructure/orm/typeorm/models/*.ts,src/infrastructure/orm/typeorm/views/*.ts
        - TYPEORM_ENTITIES_DIR=src/infrastructure/orm/typeorm/models,src/infrastructure/orm/typeorm/views
- add TYPEORM_SUBSCRIBERS, TYPEORM_SUBSCRIBERS_DIR to api env:
    - .env:
        - TYPEORM_SUBSCRIBERS=dist/infrastructure/orm/typeorm/subscribers/*.js
        - TYPEORM_SUBSCRIBERS_DIR=dist/infrastructure/orm/typeorm/subscribers
- Add API_ENV TO .env.migration and .env (e.g API_ENV=local )
