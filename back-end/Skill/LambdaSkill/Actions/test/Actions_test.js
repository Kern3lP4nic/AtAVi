/**
 * Created by pily on 24/03/17.
 */
'use strict';
var chai = require("chai");

var expect = chai.expect;

chai.config.includeStack = true;

var Actions = require("../Actions");

const validParameters = {
   text: "Text of the message",
   firmName: "Zero12"
};

const validFirmGuestParameters = {
   firmName: "Zero12",
   guestName: "Stefano Dindo",
   text: "Test message from Actions_test"
};
const validFirmParameters = {
   firmName: "Zero12",
   text: "Test message from Actions_test"
};
const validOnlyTextParameters = {
   text: "Test message from Actions_test"
};
const invalidMalformedPatameters = {
   text: "Malformed text parameter"
};

describe("SlackMessageToFirm", function () {
   this.timeout(5000);
   var SlackMessageToFirm = require("../ActionsModules/OrderCoffee");
   describe("#executeAction", function () {
      context("Passing invalid parameter", function () {
         context("Missing Text", function () {
            it("Returns an error", function (done) {
               SlackMessageToFirm.executeAction(invalidMalformedPatameters, function (err, data) {
                  expect(err).to.not.be.null;
                  expect(data).to.be.undefined;
                  expect(err.Error).to.equal('Invalid parameters: use {guestName: Guest name, [firmName: "Firm name"]}');
                  done();
               });
            });
         });
      });
      context("Passing valid parameters", function () {
         context("passing both firmName and GuestName", function () {
            it("Calls the Slack API correctly and returns an ok object in callback", function (done) {
               SlackMessageToFirm.executeAction(validFirmGuestParameters, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.null;
                  expect(data.ok).to.be.true;
                  done();
               });
            });
         });
         context("passing only firmName", function () {
            it("Calls the Slack API correctly and returns an ok object in callback", function (done) {
               SlackMessageToFirm.executeAction(validFirmGuestParameters, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.null;
                  expect(data.ok).to.be.true;
                  done();
               });
            });
         });
         context("passing only text", function () {
            it("Calls the Slack API correctly and returns an ok object in callback", function (done) {
               SlackMessageToFirm.executeAction(validFirmGuestParameters, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.null;
                  expect(data.ok).to.be.true;
                  done();
               });
            });
         });
      });
   });
});