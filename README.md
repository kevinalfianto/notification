# NOTIFICATION
Notification API

![Alt text](images/notification_diagram.jpg?raw=true)

## Description
Notification API is build to provide better notification for merchants and end customers. This API can help them to save time with manage notification with one time request. 

## Notification Code Structure
```
.
├── controllers             # Contain Handler for Endpoint
│   └── send_email          # Email notification Handler, publish topic to RabbitMQ
├── coverage                # Output for coverage report
├── dist                    # Output for compiled file (typescript into js)
├── images                  # Stored images for readme
├── model                   # Model data structure for Notification
│   └── email               # Model for Email Notificationn
├── node_modules            # Dependencies Libraries
├── tests                   # Test files
│   ├── controllers         # Unit Test for controllers
│   └── model               # Unit test for model
├── workers                 # Contain worker to send notification
│   └── send_email_worker   # Consume topic from rabbit mq, send email through mailgun
├── .env                    # configuration for apps
├── app.ts                  # main file for application
├── package-lock.json       # configuration and dependencies list
├── package.json            # configuration and dependencies list
├── README.md               # README file
└── tsconfig.json           # configuration for typescript
```

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

### Installation and Run Apps
clone notification to workspace<br />
<br />

change directory to notification:
```sh
$ cd notification
```

download dependencies:
```sh
$ npm i
```

run the rabbit mq on local: <br />
<br />
for mac: https://www.rabbitmq.com/install-homebrew.html <br />
for ubuntu: https://www.rabbitmq.com/install-debian.html <br />
<br />
set your environment rabbitmq through .env <br />
<br />
sign up mailgun service through https://www.mailgun.com/ <br />
get mailgun API key and mailgun domain name <br />
<br />
set your environment mailgun through .env <br />
<br />
build notification source code:

```sh
$ npx tsc -watch
```

run apps:

```sh
$ npm run dev
```

unit test using mocha, to run test:

```sh
$ npm run test
```

to generate coverage:

```sh
$ npm run coverage
```

### Database (not implemented yet)

notification_api_keys

COLUMN NAME | TYPE | DESCRIPTION |
--- | --- | --- | 
id | unsigned_integer | id of api key |
api_key | string | unique random string as api key  |
email | string | email that using api key  |
create_at | datetime | timestamp record created  |
update_at | datetime | timestamp record last updated  |

notification_email_sent

COLUMN NAME | TYPE | DESCRIPTION |
--- | --- | --- | 
id | unsigned_integer | id of email sent |
email | string | unique random string as api key  |
number | int | track how many user send notification using email  |
create_at | datetime | timestamp record created  |
update_at | datetime | timestamp record last updated  |

### Endpoints

METHOD | ENDPOINT | DESCRIPTION |
--- | --- | --- | 
POST | /send-email | Send notification through email | 
POST | /generate-api-key | generate api key (not implemented yet) |

