var amqp = require('amqplib/callback_api');
import { NodeMailgun } from 'ts-mailgun';
import { Email } from '../model/email';
import * as dotenv from 'dotenv';
const redis = require("redis");
const client = redis.createClient();
const mailer = new NodeMailgun();
var topic = 'send_email';

dotenv.config();

amqp.connect('amqp://localhost', function(error0, connection) {
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
            var key = email.recipients + email.subject

            client.on("error", function(error) {
                console.error(error);
            });

            client.get(key, function(err, reply) {
                if (reply == null) {
                    sendEmail(email, mailer);
                    client.set(key, "OK");
                }
                console.log("REPLY:");
                console.log(reply);
            });
        }, {
            noAck: true
        });
    });
});

export default function sendEmail(email: Email, mailer: NodeMailgun) {
    mailer.apiKey = '4d5db45132c8a2ca31556e1a8d83f37f-afab6073-36a7e20b';
    mailer.domain = 'sandbox891acaa02894429091474cd1d9d3a176.mailgun.org';
    mailer.fromEmail = 'kevin.alfianto@gmail.com';
    mailer.fromTitle = email.subject;
    mailer.init();
    
    mailer
        .send(email.recipients, email.subject, email.body)
        .then((result) => console.log('Done', result))
        .catch((error) => console.error('Error: ', error));
}