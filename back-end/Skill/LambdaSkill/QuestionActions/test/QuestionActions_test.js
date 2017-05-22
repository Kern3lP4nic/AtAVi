/**
 * Created by pily on 26/04/17.
 */
'use strict';
var chai = require("chai");

var expect = chai.expect;

chai.config.includeStack = true;

var QuestionActions = require("../QuestionActions");

const validQuestionActionId = 2;
const negativeQuestionActionId = -1;
const invalidQuestionActionId = 684618645;

const validParameters = {
   guestName: "Stefano Dindo",
   firmName: "Zero12",
   lastAnswer: {"text": "Test message from Mocha"},
   lastQuestion: {"baseText": "Test question from Mocha"}
};

describe("QuestionActions", function () {
   describe("#checkAction", function () {
      context("Passing a valid questionActionId", function () {
         it("Returns true", function () {
            expect(QuestionActions.checkActionID(validQuestionActionId)).to.be.true;
         });
      });
      context("Passing a negative questionActionId", function () {
         it("Returns false", function () {
            expect(QuestionActions.checkActionID(negativeQuestionActionId)).to.be.false;
         });
      });
      context("Passing a invalid questionActionId", function () {
         it("Returns false", function () {
            expect(QuestionActions.checkActionID(invalidQuestionActionId)).to.be.false;
         });
      });
   });

   describe("#runAction", function () {
      context("Passing valid parameters", function () {
         it("Executes the action and calls the callback", function (done) {
            QuestionActions.runAction(validQuestionActionId, validParameters, function (err, data) {
               expect(err).to.be.null;
               expect(data).to.not.be.null;
               expect(data.baseText).to.be.a.string;
               done();
            })
         });
      });
      context("Passing invalid parameters", function () {
         it("Executes the action and calls the callback", function (done) {
            QuestionActions.runAction(invalidQuestionActionId, {}, function (err, data) {
               expect(err).to.not.be.null;
               expect(err.Error).to.be.a.string;
               done();
            })
         });
      });
   });
});