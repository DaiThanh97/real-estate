# Backend

<a href="https://codeclimate.com/repos/5f60e25e6f8e891d47010ecf/maintainability"><img src="https://api.codeclimate.com/v1/badges/59ea7517309388b9351c/maintainability" /></a>
<a href="https://codeclimate.com/repos/5f60e25e6f8e891d47010ecf/test_coverage"><img src="https://api.codeclimate.com/v1/badges/59ea7517309388b9351c/test_coverage" /></a>
### Start
```console
yarn start
```

### Test
```console
yarn test
```

### Lint
```console
yarn lint:fix
```

### Migrate
```console
yarn migrate
```

### Revert migration
```console
yarn revert
```

### Generating migrations
```console
yarn typeorm migration:generate -n Account 
```

### Seed data
```console
yarn cmd seed -m [resource,feature,notification_template,policy]
```

Example:
```console
yarn cmd seed -m resource
```

## API docs
- Swagger: [http://localhost:8080/documentation](http://localhost:8080/documentation)


### ABAC
Model config: check `abac.conf` file.

Example policy:
```
p, r.subject.identityName == "admin", master_value, (create)|(update), allow
```

Add resource and action in the route:
```
server.route([
        {
          method: "POST",
          path: `${pathApi}`,
          options: {
            auth: "jwt",
            ...
            app: {
              rule: { "resource": "master_value", action: "create" }
            }
          },
        }
      ]);
```

- Casbin ABAC: [https://casbin.org/docs/en/abac](https://casbin.org/docs/en/abac)
- Casbin function: [https://casbin.org/docs/en/function](https://casbin.org/docs/en/function)
- Expression Evaluator: [https://github.com/donmccurdy/expression-eval](https://github.com/donmccurdy/expression-eval)

### Connect Socket
Connect socket and join chat:
```
const socket = io.connect('http://localhost:8888/',  {
  path: '/socket.io',
  forceNew: true,
  jsonp: false,
  transports: ['websocket'],
});
```

Authenticate the socket:
```
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI..."
socket.emit('authenticate', { token: string, isUserWeb: boolean });
```

Read a message:
```
socket.emit('readMessage', { conversationId: 1, lastSeenId: 7 });
```

Get message from the server:
```
socket.on('chatInfo', data => {
  console.log(data);
});

// Get message info from server
socket.on('message', message => {
  console.log(message);
});

// Get conversation info from server
socket.on('conversation', data => {
    console.log(data);
});

// Get exception from server
socket.on('exception', data => {
    console.log(data);
});

// Get notification from server
socket.on('notification', data => {
    console.log(data);
});
```

Send a message:
```
socket.emit('chatMessage', { content: msg, identityName: "toOtherAccount", conversationId: 1 });
```

### Swagger
```
docker pull swaggerapi/swagger-ui
docker run -p 8888:8080 -e SWAGGER_JSON=/foo/openapi.json -v /path/hspace-oia:/foo swaggerapi/swagger-ui
```
