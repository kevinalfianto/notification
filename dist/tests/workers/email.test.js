"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require('assert');
var send_email_worker_1 = __importDefault(require("../../workers/send_email_worker"));
var email_1 = require("../../model/email");
require("mocha");
var chai_1 = require("chai");
describe('sendEmail', function () {
    it('send email not error', function () {
        var email = new email_1.Email(["a", "b"], "new subject", "new body");
        chai_1.expect(send_email_worker_1.default(email)).ok;
    });
});
