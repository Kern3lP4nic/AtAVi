/**
 * Created by pily on 28/04/17.
 */

var chai = require("chai");
var expect = chai.expect;
chai.config.includeStack = true;

var IdentifiesFirm = require("../IdentifiesFirm");

const validParameters = {
   sessionId: "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
   lastAnswer: {"text": "Test firm name from Mocha"}
};

const validParametersFirmNameSessionId = {
    sessionId: "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
    firmName: "Test firm name"
};

const invalidParameters = {
   lastAnswer: {"text": "Test firm from Mocha"}
};

describe("GuestIsArrived", function () {
   // this.timeout(1000);
   describe("#executeAction", function () {
      context("Passing valid parameters", function () {
         it("Sends the message correctly and returns an ok object in callback", function (done) {
            IdentifiesFirm.executeAction(validParametersFirmNameSessionId, function (err, data) {
               expect(err).to.be.null;
               expect(data).to.not.be.null;
               expect(data.ok).to.be.true;
               expect(data.ok).to.be.true;
               done();
            });
         });
      });
      context("Passing invalid parameters", function () {
         it("Returns an error in callback", function (done) {
            IdentifiesFirm.executeAction(invalidParameters, function (err, data) {
               expect(err).to.not.be.null;
               expect(err.Error).to.not.be.true;
               expect(err.TypeError).to.not.be.null;
               done();
            })
         });
      });
   });
});

