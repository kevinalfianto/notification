import express from "express";
import path from "path";
import * as dotenv from 'dotenv';

var send = require('./routes/public/send_email');
var basename  = path.basename(module.filename);
const app = express()

app.use(express.json());
app.use(express.urlencoded());
app.use('/send-email', send);

dotenv.config();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    next(err);
});

const port = process.env.PORT || 9600;

app.listen(port, () => console.log(`APP LISTEN ON PORT ${port}`));