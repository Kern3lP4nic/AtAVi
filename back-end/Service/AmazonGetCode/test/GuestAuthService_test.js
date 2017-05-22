/**
 * Created by pily on 21/03/17.
 */
'use strict';
var chai = require("chai");
const config = require("../config.json");

var assert = chai.assert;
var expect = chai.expect;

chai.config.includeStack = true;

var GuestAuthService = require("../GuestAuthService");

const invalidAuthenticationToken = "Invalid token";

describe("GuestAuthService", function () {
   describe("#auth", function () {
      context("Using an ivalid access token", function () {
         it("returns a valid JSON object", function (done) {
            GuestAuthService.auth(invalidAuthenticationToken, function (err, data) {
               console.log(err, data);
            });
         });
      });
   });
});
