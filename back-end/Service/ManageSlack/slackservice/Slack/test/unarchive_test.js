/**
 * Created by pily on 01/04/17.
 */
'use strict';
var chai = require("chai");
const config = require("../config.json");

var expect = chai.expect;

chai.config.includeStack = true;

var unarchive = require('../unarchive');
var cl = require("../ChannelsList/ChannelsList");

var validToken = config.tokenSlack;
var invalidToken = config.tokenSlack + "3ef23";

describe("unarchive", function () {
   describe("#unarchiveChannelByID", function () {
      context("Passing a valid token", function () {
         it("Unarchive the channel passed", function (done) {
            cl.getChannelsList(validToken, function (err, data) {
               expect(err).to.be.null;
               var archivedChannel = data.channels.find(function (channel) {
                  return channel.is_archived === true;
               });
               if (archivedChannel) {
                  unarchive.unarchiveChannelByID(validToken, archivedChannel.id, function (err, data) {
                     expect(err).to.be.null;
                     expect(data).to.not.be.null;
                     expect(data.ok).to.be.true;
                  });
               } else {
                  console.error("No archived channels found. I can't test unarchive");
               }
               done();
            });
         });
      });
      context("Passing an invalid token", function () {
         it("Returns an error", function (done) {
            unarchive.unarchiveChannelByID(invalidToken, "CHANNELID", function (err, data) {
               expect(err.error).to.equal("invalid_auth");
               done();
            });
         });
      });
   });
});