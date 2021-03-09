var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');

router.post('/', (request, response, next) => {
    try {
        let email = request.body as Email;
        

        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                throw error1;
                }
                var queue = 'send_email';
                var msg = email.body;

                channel.assertQueue(queue, {
                durable: false
                });

                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            });

            setTimeout(function() {
                connection.close();
                process.exit(0)
            }, 500);
        });

       

        console.log(email.recipients[0]);
        console.log(process.env.RABBIT_MQ_HOST)

        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.send("201")
      }
      catch(e) {
        console.log(e);
        response.send("422")
      }
});

module.exports = router;
