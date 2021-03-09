"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require('assert');
var email_1 = require("../../model/email");
require("mocha");
var chai_1 = require("chai");
describe('Email', function () {
    // Test construct email return correct data
    it('construct', function () {
        var email = new email_1.Email(["a", "b"], "new subject", "new body");
        chai_1.expect(email.subject).equal("new subject");
        chai_1.expect(email.body).equal("new body");
        chai_1.expect(email.recipients[0]).equal("a");
    });
});
