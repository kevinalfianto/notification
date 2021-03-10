"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require('amqplib/callback_api');
var ts_mailgun_1 = require("ts-mailgun");
var dotenv = require('dotenv');
dotenv.config({ path: '.env' });
// Declare redis
var redis = require('redis');
var client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
var topic = 'send_email';
var amqpURL = process.env.RABBIT_MQ_HOST;
var mailgunApiKey = process.env.MAILGUN_API_KEY;
var mailgunDomain = process.env.MAILGUN_DOMAIN;
var emailFrom = process.env.EMAIL_FROM;
// Will subscribe topic send_email through rabbitmq
// then send email if there are no value for specified key in redis
amqp.connect(amqpURL, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertQueue(topic, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", topic);
        channel.consume(topic, function (msg) {
            var email = JSON.parse(msg.content);
            // At this time, the key only recipient and subject
            // can be improved using timestamp and so on
            var key = email.recipients + email.subject;
            client.on("error", function (error) {
                console.error(error);
            });
            // If there are value in specified key means email has been sent before
            client.get(key, function (err, reply) {
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
function sendEmail(email) {
    var mailer = new ts_mailgun_1.NodeMailgun();
    mailer.apiKey = mailgunApiKey || "";
    mailer.domain = mailgunDomain || "";
    mailer.fromEmail = emailFrom || "";
    mailer.fromTitle = email.subject;
    mailer.init();
    mailer
        .send(email.recipients, email.subject, email.body)
        .then(function (result) { return console.log('Done', result); })
        .catch(function (error) { return console.error('Error: ', error); });
}
exports.default = sendEmail;
