"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require('amqplib/callback_api');
var ts_mailgun_1 = require("ts-mailgun");
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'send_email';
        channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            var mailer = new ts_mailgun_1.NodeMailgun();
            mailer.apiKey = process.env.MAILGUN_API_KEY || "";
            mailer.domain = process.env.MAILGUN_DOMAIN || "";
            mailer.fromEmail = 'kevinalfianto@gmail.com';
            mailer.fromTitle = 'This is email';
            mailer.init();
            mailer
                .send('kevinalfianto2@gmail.com', 'Hello!', '<h1>hsdf</h1>')
                .then(function (result) { return console.log('Done', result); })
                .catch(function (error) { return console.error('Error: ', error); });
        }, {
            noAck: true
        });
    });
});
