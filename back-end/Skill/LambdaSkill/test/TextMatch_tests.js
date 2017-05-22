'use strict';
var chai = require("chai");

var assert = chai.assert;
var expect = chai.expect;

chai.config.includeStack = true;

var TextMatch = require("../TextMatch/TextMatch");

const textsAvailable = [
   "Similar text",
   "Not that similar text, but anyway",
   "Sample text",
   "Another text"
];
const nonMatchingText = "Not valid text";
const matchingText = textsAvailable[Math.floor(Math.random() * textsAvailable.length)];


describe("TextMatch", function () {
   describe("#matchText", function () {
      context("Passing a matching text", function () {
         it("Returns the matching text", function (done) {
            var textMatchResult = TextMatch.matchText(matchingText, textsAvailable);
            expect(textMatchResult.hasOwnProperty("info")).to.be.true;
            expect(textMatchResult.info).to.be.string;
            expect(textsAvailable).to.contain(textMatchResult.info);
            done();
         });
      });
      context("Passing a non matching text", function () {
         it("Returns an error", function (done) {
            var textMatchResult = TextMatch.matchText(nonMatchingText, textsAvailable);
            expect(textMatchResult.hasOwnProperty("Error")).to.be.true;
            expect(textMatchResult.hasOwnProperty("TypeError")).to.be.true;
            expect(textMatchResult.hasOwnProperty("info")).to.be.false;
            expect(textMatchResult.Error).to.be.string;
            expect(textMatchResult.TypeError).to.be.string;
            done();

         });
      })
   });

})
;
