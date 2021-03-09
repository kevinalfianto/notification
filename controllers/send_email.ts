import { Email } from '../model/email';
var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');
var topic = 'send_email';

// Endpoint send-email with method POST
// will return 201 when success
// if there are invalid request body return 422 
router.post('/', (request, response, next) => {
    try {
        let email = request.body as Email;

        publishTopicSendEmail(email)

        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.send("201")
      }
      catch(e) {
        console.log(e);
        response.send("422")
      }
});

// Function publishTopicSendEmail will publish topic send_email into rabbitmq
async function publishTopicSendEmail(email: Email) {
    var amqpURL = "amqp://" + process.env.RABBIT_MQ_HOST;
    amqp.connect(amqpURL, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var ok = channel.assertQueue(topic, {
                durable: false
            });

            channel.sendToQueue(topic, Buffer.from(JSON.stringify(email)));
        });

        setTimeout(function() {
            connection.close();
        }, 500);
    });
}

module.exports = router;
