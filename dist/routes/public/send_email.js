"use strict";
var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');
router.post('/', function (request, response, next) {
    try {
        var email_1 = request.body;
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var queue = 'send_email';
                var msg = email_1.body;
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            });
            setTimeout(function () {
                connection.close();
                process.exit(0);
            }, 500);
        });
        console.log(email_1.recipients[0]);
        console.log(process.env.RABBIT_MQ_HOST);
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.send("201");
    }
    catch (e) {
        console.log(e);
        response.send("422");
    }
});
module.exports = router;
