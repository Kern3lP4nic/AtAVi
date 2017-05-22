/**
 * Created by pily on 28/04/17.
 */
/**
 * Created by pily on 29/03/17.
 */
var chai = require("chai");
var expect = chai.expect;
chai.config.includeStack = true;

var GuestIsArrived = require("../GuestIsArrived");
var OrderCoffee = require("../OrderCoffee");

const validParametersWithFirmName = {
   firmName: "Zero12",
   guestName: "Stefano Dindo"
};
const validParametersWithoutFirmName = {
   guestName: "Stefano Dindo"
};
const invalidParameters = {
   firmName: "Zero12"
};

describe("OrderCoffee", function () {
   this.timeout(10000);
   describe("#executeFunction", function () {
      context("Passing valid parameters with firmName", function () {
         it("Sends a message to the channel asking for coffee", function (done) {
            OrderCoffee.executeAction(validParametersWithFirmName, function (err, data) {
               expect(err).to.be.null;
               expect(data).to.not.be.null;
               expect(data.ok).to.be.true;
               expect(data.ok).to.be.true;
               done();
            });
         });
      });
      context("Passing valid parameters without firmName", function () {
         it("Sends a message to the channel asking for coffee", function (done) {
            OrderCoffee.executeAction(validParametersWithoutFirmName, function (err, data) {
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
            OrderCoffee.executeAction(invalidParameters, function (err, data) {
               expect(err).to.not.be.null;
               expect(err.Error).to.not.be.true;
               expect(err.TypeError).to.not.be.null;
               done();
            })
         });
      });
   });
});