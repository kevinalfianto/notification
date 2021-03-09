"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require('amqplib/callback_api');
var ts_mailgun_1 = require("ts-mailgun");
var dotenv = __importStar(require("dotenv"));
var redis = require("redis");
var client = redis.createClient();
var topic = 'send_email';
dotenv.config();
amqp.connect('amqp://localhost', function (error0, connection) {
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
            var key = email.recipients + email.subject;
            client.on("error", function (error) {
                console.error(error);
            });
            client.get(key, function (err, reply) {
                if (reply == null) {
                    sendEmail(email);
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
function sendEmail(email) {
    var mailer = new ts_mailgun_1.NodeMailgun();
    mailer.apiKey = '4d5db45132c8a2ca31556e1a8d83f37f-afab6073-36a7e20b';
    mailer.domain = 'sandbox891acaa02894429091474cd1d9d3a176.mailgun.org';
    mailer.fromEmail = 'kevin.alfianto@gmail.com';
    mailer.fromTitle = email.subject;
    mailer.init();
    mailer
        .send(email.recipients, email.subject, email.body)
        .then(function (result) { return console.log('Done', result); })
        .catch(function (error) { return console.error('Error: ', error); });
}
