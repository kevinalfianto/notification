import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Controller Email", () => {
    describe("POST /send-email", () => {
        // Test to queue send email
        it("should queue data email to rabbitmq", (done) => {
             chai.request(app)
                 .post('/send-email')
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });
    });
});