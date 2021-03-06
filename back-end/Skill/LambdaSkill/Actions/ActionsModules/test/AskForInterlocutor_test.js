/**
 * Created by pily on 28/04/17.
 */
var chai = require("chai");
var expect = chai.expect;
chai.config.includeStack = true;

var AskForInterlocutor = require("../AskForInterlocutor");

const validParametersWithFirmName = {
    guestName: "Stefano Dindo",
    firmName: "Zero12",
    lastAnswer: {"text": "Test message from Mocha"},
    lastInterlocutor: "Test last interlocutor"
};
const validParametersWithoutFirmName = {
    guestName: "Stefano Dindo",
    lastAnswer: {"text": "Test message from Mocha"}
};
const invalidParameters = {
    lastAnswer: {"text": "Test message from Mocha"}
};

describe("AskForInterlocutor", function () {
    this.timeout(10000);
    describe("#executeAction", function () {
        context("Passing valid parameters with firmName", function () {
            it("Sends the message correctly and returns an ok object in callback", function (done) {
                AskForInterlocutor.executeAction(validParametersWithFirmName, function (err, data) {
                    expect(err).to.be.null;
                    expect(data).to.not.be.null;
                    expect(data.ok).to.be.true;
                    expect(data.ok).to.be.true;
                    done();
                });
            });
        });
        context("Passing valid parameters without firmName", function () {
            it("Sends the message correctly and returns an ok object in callback", function (done) {
                AskForInterlocutor.executeAction(validParametersWithoutFirmName, function (err, data) {
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
                AskForInterlocutor.executeAction(invalidParameters, function (err, data) {
                    expect(err).to.not.be.null;
                    expect(err.Error).to.not.be.true;
                    expect(err.TypeError).to.not.be.null;
                    done();
                })
            });
        });
    });
});

