/**
 * Created by pily on 01/04/17.
 */
'use strict';
var chai = require("chai");
const config = require("../config.json");

var expect = chai.expect;

chai.config.includeStack = true;

var setPurpose = require('../setPurpose');
var cl = require("../ChannelsList/ChannelsList");

var validToken = config.tokenSlack;
var invalidToken = config.tokenSlack + "3ef23";

describe("setPurpose", function () {
   describe("#setPurpose", function () {
      context("Passing a valid token", function () {
         context("Passing a valid channelID", function () {
            it("Sets the channel purpose", function (done) {
               cl.getChannelsList(validToken, function (err, data) {
                  expect(err).to.be.null;
                  var channelID = data.channels[data.channels.length - 1].id;
                  setPurpose.setPurpose(validToken, channelID, function (err, data) {
                     if (err) {
                        expect(["not_in_channel"]).to.contain(err.error);
                     } else {
                        expect(data.ok).to.be.true;
                     }
                     done();
                  });
               });
            });
         });
      });
      context("Passing an invalid token", function () {
        it("Returns an error", function (done) {
           setPurpose.setPurpose(invalidToken, "CHANNELID", function (err, data) {
              expect(err.error).to.equal("invalid_auth");
              done();
           });
        });
      });
   });
});