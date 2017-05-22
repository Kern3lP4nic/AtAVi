/**
 * Created by Pily on 17/03/17.
 */
'use strict';
var chai = require("chai");
const config = require("../config.json");

var expect = chai.expect;

chai.config.includeStack = true;

const validToken = config.tokenSlack;
const wrongToken = "wrong token";

var ChannelsList = require("../ChannelsList/ChannelsList");

describe("ChannelsList", function () {
   describe("#getChannelsList", function () {
      context("Requesting the list with valid token", function () {
         it("returns a valid JSON object", function (done) {
            ChannelsList.getChannelsList(validToken, function (err, channelsList) {
               expect(typeof channelsList).to.equal("object");
               done();
            })
         });
         it("returns a JSON object containing the filed ok set to true", function (done) {
            ChannelsList.getChannelsList(validToken, function (err, channelsList) {
               expect(channelsList.ok).to.equal(true);
               done();
            })
         });
         it("returns a JSON object containing the array channels", function (done) {
            ChannelsList.getChannelsList(validToken, function (err, channelsList) {
               expect(Array.isArray(channelsList.channels)).to.equal(true);
               done();
            })
         });
         it("returns a JSON object containing the field channels as array non empty", function (done) {
            ChannelsList.getChannelsList(validToken, function (err, channelsList) {
               expect(channelsList.channels.length).to.be.greaterThan(0);
               done();
            });
         });
      });


      context("Requesting the list with an invalid token", function () {
         it("returns a valid JSON error object", function (done) {
            ChannelsList.getChannelsList(wrongToken, function (err) {
               expect(typeof err).to.equal("object");
               done();
            })
         });
         it("returns a JSON error object containing the filed ok set to false", function (done) {
            ChannelsList.getChannelsList(wrongToken, function (err) {
               expect(err.ok).to.equal(false);
               done();
            })
         });
         it("returns a JSON error object containing the field error set to 'invalid_auth'", function (done) {
            ChannelsList.getChannelsList(wrongToken, function (err) {
               expect(err.error).to.equal('invalid_auth');
               done();
            })
         });
      });
   });
});




