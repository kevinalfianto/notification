# NOTIFICATION
Notification API

![alt text](https://github.com/kevinalfianto/notification/blob/master/images/notification_diagram.png?raw=true)

npx tsc --watch
npm run dev


## Description
Notification API is build to provide better notification for merchants and end customers. This API can help them to save time with manage notification with one time request. 

## Setup
### Prerequisite

- Git
- Node v10.15.0 or later
- TypeScript v4.2.3
- NPM v6.14.8 or later
- Express v4.17.11
- Mocha v8.2.1
- Chai v4.3.3
- Redis
- RabbitMQ
- Mailgun

### Installation
clone notification to workspace

```sh
$ cd notification
```

download dependencies
```sh
$ npm i
```

run the rabbit mq on local:
for mac: https://www.rabbitmq.com/install-homebrew.html
for ubuntu: https://www.rabbitmq.com/install-debian.html

set your environment rabbitmq through .env

sign up mailgun service through https://www.mailgun.com/
get mailgun API key and mailgun domain name

set your environment mailgun through .env

build notification source code:

```sh
$ npx tsc -watch
```

run apps:

```sh
$ npm run dev
```

test:

```sh
$ npm run test
```

to generate coverage:

```sh
$ npm run coverage
```

### Endpoints

METHOD | ENDPOINT | Description |
--- | --- | --- | 
POST | /send-email | Send notification through email | 

