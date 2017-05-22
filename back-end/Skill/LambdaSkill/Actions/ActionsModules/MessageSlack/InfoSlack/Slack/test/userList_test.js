/**
 * Created by pily on 01/04/17.
 */
'use strict';
var chai = require("chai");
const config = require("../config.json");

var expect = chai.expect;

chai.config.includeStack = true;

var userList = require("../userList");

var validToken = config.tokenSlack;
var invalidToken = config.tokenSlack + "3ef23";

describe("userList", function () {
   describe("#userList", function () {
      context("Passing a valid token", function () {
         it("Returns the list of all users", function (done) {
            userList.userList(validToken, function (err, data) {
               expect(err).to.be.null;
               expect(data).to.not.be.null;
               expect(data.ok).to.be.true;
               expect(data.members).to.be.an.array;
               done();
            });
         });
      });
      context("Passing an invalid token", function () {
         it("Returns an error", function (done) {
            userList.userList(invalidToken, function (err, data) {
               expect(err).to.not.be.null;
               expect(err.ok).to.be.false;
               expect(err.error).to.equal("invalid_auth");
               done();
            });
         });
      });
   });
});