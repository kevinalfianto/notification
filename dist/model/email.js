"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
// Represent Email to make encode or decode easier
var Email = /** @class */ (function () {
    function Email(recipients, subject, body) {
        this.recipients = recipients;
        this.subject = subject;
        this.body = body;
    }
    return Email;
}());
exports.Email = Email;
