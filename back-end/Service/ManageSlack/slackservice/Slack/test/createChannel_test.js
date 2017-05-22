/**
 * Created by pily on 01/04/17.
 */
'use strict';
var chai = require("chai");
var _ = require("lodash");
const config = require("../config.json");

var expect = chai.expect;

chai.config.includeStack = true;

var cc = require('../createChannel');
var cl = require("../ChannelsList/ChannelsList");
const validToken = config.tokenSlack;
const invalidToken = config.tokenSlack + "lansflnalinw";

const baseChannelNameForTest = "TestChannel";

describe("createChannel", function () {
   context("Passing a valid token", function () {
      context("Passing new channel name", function () {
         it("Creates a new channel", function (done) {

            cl.getChannelsList(validToken, function (err, data) {
               var channels = data.channels;
               var filteredChannels = channels.filter(function (channel) {
                  return _.includes(channel.name, baseChannelNameForTest.toLocaleLowerCase());
               });
               var newChannelName;
               if (filteredChannels.length === 0) {
                  newChannelName = baseChannelNameForTest;
               } else {
                  newChannelName = baseChannelNameForTest + (filteredChannels.length + 1)

               }
               cc.createChannel(validToken, newChannelName, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.null;
                  expect(data).to.be.a.object;
                  expect(data.ok).to.be.true;
                  expect(data.channel.id).to.be.a.string;
                  done();
               });
            });
         });
      });
      context("Passing an already taken channel name", function () {
         it("Returns a name_taken error", function (done) {
            cl.getChannelsList(validToken, function (err, data) {
               var takenChannelName = data.channels[0].name;
               cc.createChannel(validToken, takenChannelName, function (err, data) {
                  expect(err).to.not.be.null;
                  expect(data).to.be.undefined;
                  expect(err.ok).to.be.false;
                  expect(err.error).to.be.a.string;
                  expect(err.error).to.equal("name_taken");
                  done();
               });
            });
         });
      });
   });
   context("Passing an invalid token", function () {
      it("Returns a invalid_auth error", function (done) {
         cc.createChannel(invalidToken, "CHANNELNAME", function (err, data) {
            expect(err).to.not.be.null;
            expect(data).to.be.undefined;
            expect(err.ok).to.be.false;
            expect(err.error).to.be.a.string;
            expect(err.error).to.equal("invalid_auth");
            done();
         });
      });
   });
});

