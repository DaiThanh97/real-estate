FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY .npmrc ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:14-alpine
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY .npmrc ./
COPY package*.json ./
COPY .npmrc ./
RUN npm ci
COPY tsconfig*.json ./
COPY --from=builder /usr/src/app/dist/ dist/
COPY abac.conf ./abac.conf
EXPOSE 8080 8888
ENTRYPOINT ["npm", "run"]
CMD ["start"]
