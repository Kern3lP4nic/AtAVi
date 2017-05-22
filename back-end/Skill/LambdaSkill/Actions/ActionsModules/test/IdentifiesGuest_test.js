/**
 * Created by pily on 28/04/17.
 */

var chai = require("chai");
var expect = chai.expect;
chai.config.includeStack = true;

var IdentifiesGuest = require("../IdentifiesGuest");

const validParameters = {
    sessionId: "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
    lastAnswer: {"text": "Test guest name from Mocha"}
};

const validParametersSessionIdFirmName = {
    lastAnswer: {"text": "Test guest name from Mocha"},
    sessionId: "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
    firmName: "Test firm name"
};

describe("GuestIsArrived", function () {
    // this.timeout(1000);
    describe("#executeAction", function () {
        context("Passing valid parameters", function () {
            it("Sends the message correctly and returns an ok object in callback", function (done) {
                IdentifiesGuest.executeAction(validParametersSessionIdFirmName, function (err, data) {
                    expect(err).to.be.null;
                    expect(data).to.not.be.null;
                    expect(data.ok).to.be.true;
                    expect(data.ok).to.be.true;
                    done();
                });
            });
        });
    });
});