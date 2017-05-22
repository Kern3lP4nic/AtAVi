'use strict';
var chai = require("chai");
const config = require("../config.json");

var expect = chai.expect;

chai.config.includeStack = true;

var NameID = require("../NameID/NameID");

//IMPORTANT those tests work ony if the token is valid and the channel whose channel name is chosen exist
const validToken = config.tokenSlack;
const wrongToken = "wrong token";
const validChannelName = "canale_prova";
const wrongChannelName = "Wnafnasfkaw";
const validChannelID = "C4J0S2JKW";
const wrongChannelID = "F4S6W34SDF2";

describe("NameID", function () {
   describe("#name2ID", function () {
      context("Using a valid token", function () {
         context("Passing the channel name of an existent channel", function () {
            it("returns a valid JSON object", function (done) {
               NameID.name2ID(validToken, validChannelName, function (err, data) {
                  expect(typeof data).to.equal("object");
                  done();
               });
            });
            it("returns a JSON object containing the field ok", function (done) {
               NameID.name2ID(validToken, validChannelName, function (err, data) {
                  expect(typeof data).to.equal("object");
                  done();
               });
            });
            it("returns a JSON object containing the field ok set to true", function (done) {
               NameID.name2ID(validToken, validChannelName, function (err, data) {
                  expect(data.ok).to.equal(true);
                  done();
               });
            });
            it("returns a JSON object containing the field id", function (done) {
               NameID.name2ID(validToken, validChannelName, function (err, data) {
                  expect(typeof data).to.equal("object");
                  done();
               });
            });
            it("returns a JSON object containing the filed id set to a channel id", function (done) {
               NameID.name2ID(validToken, validChannelName, function (err, data) {
                  expect(data.id).to.match(/^[0-9A-Z]+$/);
                  done();
               });
            });
         });

         context("Passing the channel name of a non present channel", function () {
            it("returns a valid JSON object", function (done) {
               NameID.name2ID(validToken, wrongChannelName, function (err) {
                  expect(err).to.not.be.null;
                  expect(err.ok).to.be.false;
                  expect(err.error).to.equal("channel_name_not_found");
                  done();
               })
            });
         });
      });
      context("Requesting the list with an invalid token", function () {
         it("returns a valid JSON err object", function (done) {
            NameID.name2ID(wrongToken, "CHANNELNAME", function (err) {
               expect(err).to.not.be.null;
               expect(err.ok).to.be.false;
               expect(err.error).to.equal("invalid_auth");
               done();
            });
         });
      });
   });

   describe("#ID2name", function () {
      context("Using a valid token", function () {
         context("Passing the channel ID of an existent channel", function () {
            it("returns a valid JSON object", function (done) {
               NameID.ID2name(validToken, validChannelID, function (err, data) {
                  expect(err).to.be.null;
                  expect(data).to.not.be.undefined;
                  expect(data.ok).to.be.true;
                  expect(data.name).to.be.a.string;
                  expect(data.name.length).to.be.greaterThan(0);
                  done();
               })
            });
         });
         context("Passing the channel ID of a non present channel", function () {
            it("returns an error", function (done) {
               NameID.name2ID(validToken, wrongChannelID, function (err) {
                  expect(err).to.not.be.null;
                  expect(err.ok).to.be.false;
                  expect(err.error).to.equal("channel_name_not_found");
                  done();
               })
            });
         });
      });
      context("Requesting the list with an invalid token", function () {
         const name = "whatever channelName";
         it("returns a valid JSON err object", function (done) {
            NameID.name2ID(wrongToken, name, function (err) {
               expect(err).to.not.be.null;
               expect(err.ok).to.be.false;
               expect(err.error).to.equal("invalid_auth");
               done();
            });
         });
      });
   });
});