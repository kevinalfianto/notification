var amqp = require('amqplib/callback_api');
import { NodeMailgun } from 'ts-mailgun';
import { Email } from '../model/email';
var dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// Declare redis
const redis = require('redis');
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

var topic = 'send_email';

const amqpURL = process.env.RABBIT_MQ_HOST;
const mailgunApiKey = process.env.MAILGUN_API_KEY;
const mailgunDomain = process.env.MAILGUN_DOMAIN;
const emailFrom = process.env.EMAIL_FROM;

// Will subscribe topic send_email through rabbitmq
// then send email if there are no value for specified key in redis
amqp.connect(amqpURL, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(topic, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", topic);

        channel.consume(topic, function(msg) {
            let email = JSON.parse(msg.content) as Email;
            // At this time, the key only recipient and subject
            // can be improved using timestamp and so on
            var key = email.recipients + email.subject

            client.on("error", function(error) {
                console.error(error);
            });

            // If there are value in specified key means email has been sent before
            client.get(key, function(err, reply) {
                if (reply == null) {
                    sendEmail(email);
                    client.set(key, "OK");
                }
                console.log(reply);
            });
        }, {
            noAck: true
        });
    });
});

// Function sendEmail will send email through mailgun
export default function sendEmail(email: Email) {
    const mailer = new NodeMailgun();

    mailer.apiKey = mailgunApiKey || "";
    mailer.domain = mailgunDomain || "";
    mailer.fromEmail = emailFrom || "";
    mailer.fromTitle = email.subject;
    mailer.init();
    
    mailer
        .send(email.recipients, email.subject, email.body)
        .then((result) => console.log('Done', result))
        .catch((error) => console.error('Error: ', error));
}