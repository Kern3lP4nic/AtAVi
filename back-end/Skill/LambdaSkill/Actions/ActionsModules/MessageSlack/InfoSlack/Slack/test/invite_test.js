/**
 * Created by pily on 01/04/17.
 */
'use strict';
var chai = require("chai");
const config = require("../config.json");

var expect = chai.expect;

chai.config.includeStack = true;

var invite = require('../invite');
var cl = require("../ChannelsList/ChannelsList");
var ul = require("../userList");

var validToken = config.tokenSlack;
var invalidToken = config.tokenSlack + "3ef23";

describe("invite", function () {
   describe("#invite", function () {
      context("Passing a valid token", function () {
         context("Passing a valid channel ID", function () {
            context("Passing a valid user ID", function () {
               it("Invites the user to the channel", function (done) {
                  cl.getChannelsList(validToken, function (err, data) {
                     expect(err).to.be.null;
                     var channelID = data.channels[0].id;
                     ul.userList(validToken, function (err, data) {
                        expect(err).to.be.null;
                        var userID = data.members[0].id;
                        invite.invite(validToken, channelID, userID, function (err, data) {
                           if (err !== null) {
                              expect(err.error).to.equal("already_in_channel");
                           } else {
                              expect(err).to.be.null;
                              expect(data.ok).to.be.true
                           }
                           done();
                        });
                     });
                  });
               });
            });
         });
      });
      context("Passing an invalid user ID", function () {
         it("Returns an error", function (done) {
            cl.getChannelsList(validToken, function (err, data) {
               expect(err).to.be.null;
               var channelID = data.channels[0].id;
               ul.userList(validToken, function (err, data) {
                  expect(err).to.be.null;
                  var userID = data.members[0].id + "kjabsfa";
                  invite.invite(validToken, channelID, userID, function (err, data) {
                     expect(err).to.not.be.null;
                     expect(err.error).to.equal("user_not_found");
                     done();
                  });
               });
            });
         });
      });
      context("Passing an invalid channel ID", function () {
         it("Returns an error", function (done) {
            cl.getChannelsList(validToken, function (err, data) {
               expect(err).to.be.null;
               var channelID = data.channels[0].id + "KNSFAF";
               ul.userList(validToken, function (err, data) {
                  expect(err).to.be.null;
                  var userID = data.members[0].id;
                  invite.invite(validToken, channelID, userID, function (err, data) {
                     expect(err).to.not.be.null;
                     expect(err.error).to.equal("channel_not_found");
                     done();
                  });

               });
            });
         });
         context("Passing an invalid token", function () {
            it("Returns an error", function (done) {
               invite.invite(invalidToken, "CHANNELID", "USERID", function (err, data) {
                  expect(err).to.not.be.null;
                  expect(err.error).to.equal("invalid_auth");
                  done();
               });
            });
         });
      });
   });
   describe("#inviteDefault", function () {
      context("Passing a valid token", function () {
         context(", a valid channel id", function () {
            it("invites all default interlocutors to the channel", function (done) {
               cl.getChannelsList(validToken, function (err, data) {
                  expect(err).to.be.null;
                  var channelID = data.channels[0].id;

                  invite.inviteDefault(validToken, channelID, function (err, data) {
                     expect(err).to.be.null;
                     expect(data).to.not.be.null;
                     expect(data.ok).to.be.true;
                     expect(data.info).to.equal("All default interlocutors invited");
                     done();
                  });
               });
            });
         });
         context(", an invalid channel id", function () {
            it("Returns an error", function (done) {
               invite.inviteDefault(validToken, "CHANNEL_ID", function (err, data) {
                  expect(err).to.not.be.null;
                  expect(data).to.be.undefined;
                  expect(err.ok).to.be.false;
                  expect(err.error).to.equal("channel_not_found");
                  done();
               });
            });
         });
      });
      context("Passing an invalid token", function () {
         it("returns an error", function (done) {
            invite.inviteDefault(invalidToken, "CHANNEL_ID", function (err, data) {
               expect(err).to.not.be.null;
               expect(data).to.be.undefined;
               expect(err.ok).to.be.false;
               expect(err.error).to.equal("invalid_auth");
               done();
            });
         });
      });
   });
});