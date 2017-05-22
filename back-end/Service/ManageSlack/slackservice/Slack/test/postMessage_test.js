'use strict';
var chai = require("chai");
const config = require("../config.json");
var _ = require("lodash");

var expect = chai.expect;

chai.config.includeStack = true;

var pm = require('../postMessage');
var cl = require("../ChannelsList/ChannelsList");


//IMPORTANT those tests work ony if the token is valid and the channel whose channel name is chosen exist
const text = "Test message from AtAVi";
const validToken = config.tokenSlack;
const wrongToken = "wrong token";

const baseChannelNameForTest = "TestChannel";

const archivedChannelName = "canale_prova";
const existentChannelName = "canale_prova2";

describe("postMessage", function () {
   context("Using a valid token", function () {
      context("passing the channel name of an non-existent channel", function () {
         it("it creates a new channel with the name passed, posts the message contained in the field text in the current channel, invites in the channel people contained in a list and sets the purpose", function (done) {
            this.timeout(5000);
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

               pm.postMessage(validToken, newChannelName, text, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.null;
                  expect(data.ok).to.be.true;
                  done();
               });
            });
         });
      });
      context("passing the channel name of an existent and unarchived channel", function () {
         it("it posts the message contained in the field text in the current channel", function (done) {
            cl.getChannelsList(validToken, function (err, data) {
               var channels = data.channels;
               var channelName = channels.find(function (c) {
                  return c.is_archived === false;
               }).name;

               expect(channelName).to.not.be.null;

               pm.postMessage(validToken, channelName, text, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.null;
                  expect(data.ok).to.be.true;
                  done();
               });
            });
         });
      });
      context("Passing the channel name of an archived channel", function () {
         it("it unarchive the channel and send it the text as a message", function(done){
            this.timeout(5000);
            cl.getChannelsList(validToken, function (err, data) {
               var channels = data.channels;
               var channelName = channels.find(function (c) {
                  return c.is_archived === true;
               }).name;

               expect(channelName).to.not.be.null;

               pm.postMessage(validToken, channelName, text, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.null;
                  expect(data.ok).to.be.true;
                  done();
               });
            });
         });
      });
   });
   context("Using an invalid token", function () {
      it("it return a JSON Object which contains the error \'invalid_auth\'", function (done) {
         pm.postMessage(wrongToken, existentChannelName, text, function (err, data) {
            expect(data).to.be.undefined;
            expect(err).to.not.be.null;
            expect(err.error).to.equal("invalid_auth");
            done();
         });
      });
   });
})
;