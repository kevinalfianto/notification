"use strict";
var express = require('express');
var router = express.Router();
router.post('/', function (request, response, next) {
    var email = request.body;
    console.log(email.recipients[0]);
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.send("201");
});
module.exports = router;
