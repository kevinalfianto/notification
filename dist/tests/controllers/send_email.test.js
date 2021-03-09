"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var app_1 = __importDefault(require("../../app"));
// Configure chai
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
describe("Controller Email", function () {
    describe("POST /send-email", function () {
        // Test to queue send email
        it("should queue data email to rabbitmq", function (done) {
            chai_1.default.request(app_1.default)
                .post('/send-email')
                .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
        });
    });
});
