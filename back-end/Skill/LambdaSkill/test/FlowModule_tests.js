/**
 * Created by pily on 17/03/17.
 */
'use strict';
var chai = require("chai");

var expect = chai.expect;

chai.config.includeStack = true;

var FlowModule = require("../FlowModule/FlowModule");

const lastQuestionSample = {
    "id": 1,
    "baseText": "Do you want some coffe?",
    "recurrentText": "Coffe as usual?",
    "answers": [{
        "text": "Yes",
        "id_nextQuestion": 2,
        "actions": {
            "id": 1,
            "text": "Order coffe"
        }
    }, {
        "text": "No",
        "id_nextQuestion": 2,
        "action": {
            "id": 2,
            "text": "Do nothing"
        }
    }, {
        "text": "Repeat",
        "id_nextQuestion": 1,
        "action": {
            "id": 2,
            "text": "Do nothing"
        }
    }]
};
const firstQuestionSample = {
    "id": 1,
    "baseText": "Hello! What's your name?"
};
const alwaysMatchingAnswerQuestion = {
    "id": 1,
    "baseText": "Hello! What's your name?",
    "answers": [{
        "text": null,
        "id_nextQuestion": 2,
        "actions": [
            {
                "id": 1,
                "text": "Action description"
            }]
    }]
};
const matchingAnswerReceived = "No";
const nonMatchingAnswerReceived = "I don't know";
const firstTimeSession = {};
const firmNameAskedSession = {firmNameAsked: true};
const guestNameAskedSession = {firmNameAsked: true, firmName: 'Zero12', guestNameAsked: true};
const identifiedGuestSession = {firmNameAsked: true, firmName: 'Zero12', guestNameAsked: true};
const recurrentSession = {firmNameAsked: true, firmName: 'Zero12', guestNameAsked: true, recurrent: true};
const actionCalledCorrectID = 1;
const actionCalledWrongID = -1;
const actionCalledCorrectParameters = {firmName: "Zero12", guestName: "Stefano Dindo"};
const actionCalledWrongParameters = {wrongName: "more than wrong"};
const validQuestionId = 1;
const validSessionID = "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5e6";  //Change this for each complete test
const validAnswer = {"text": "answer text", "id_nextQuestion": validQuestionId, "actions": [],};

const validQuestionActionId = 2;
const questionWithQuestionAction = {
    "id": 1,
    "baseText": "Do you want some coffe?",
    "recurrentText": "Coffe as usual?",
    "questionAction": validQuestionActionId,
    "answers": [{
        "text": "Yes",
        "id_nextQuestion": 2,
        "actions": {
            "id": 1,
            "text": "Order coffe"
        }
    }, {
        "text": "No",
        "id_nextQuestion": 2,
        "action": {
            "id": 2,
            "text": "Do nothing"
        }
    }, {
        "text": "Repeat",
        "id_nextQuestion": 1,
        "action": {
            "id": 2,
            "text": "Do nothing"
        }
    }]
};
const sessionWithLastQuestion = {
    firmNameAsked: true,
    firmName: 'Zero12',
    guestNameAsked: true,
    lastQuestion: questionWithQuestionAction
};

describe("FlowModule", function () {

    describe("#routine", function () {
        context("First interaction", function () {
            it("Completes the routine successfully", function (done) {
                FlowModule.routine(null, validSessionID, firstTimeSession, function (err, data) {
                    expect(data.hasOwnProperty("Error")).to.be.false;
                    expect(data.hasOwnProperty("TypeError")).to.be.false;
                    expect(data).to.be.a.object;
                    expect(data.text).to.be.string;
                    expect(data.repeatText).to.be.string;
                    expect(data.session).to.be.object;
                    done();
                });
            });
        });

        context("Answer guest name question with valid text", function () {
            it("Completes the routine successfully asking the next question", function (done) {
                FlowModule.routine("Stefano Dindo", validSessionID, guestNameAskedSession, function (err, data) {
                    expect(data.hasOwnProperty("Error")).to.be.false;
                    expect(data.hasOwnProperty("TypeError")).to.be.false;
                    expect(data).to.be.a.object;
                    expect(data.text).to.be.string;
                    expect(data.repeatText).to.be.string;
                    expect(data.session).to.be.object;
                    done();
                });
            });
        });
    });

    describe("#getLastQuestion", function () {
        context("Calling the function with valid sessionID", function () {
            it("Returns the last question asked in that session", function (done) {
                FlowModule.getLastQuestion(validAnswer, recurrentSession, function (err, data) {
                    expect(err).to.be.null;
                    expect(data).to.not.be.null;
                    done();
                });
            });
        });
    });

    describe("#getFirstQuestion", function () {
        context("Calling the function", function () {
            it("Returns a question", function (done) {
                FlowModule.getFirstQuestion(function (err, firstQuestion) {
                    expect(err).to.be.null;
                    expect(firstQuestion).to.not.be.null;
                    expect(firstQuestion.baseText).to.be.a.string;
                    expect(firstQuestion.id).to.be.an.int;
                    done();
                });
            });
        });
    });

    describe("#matchPossibleAnswers", function () {
        context("Passing a matching answer", function () {
            it("returns the matching answer", function (done) {
                var resultMatchPossibleAnswers = FlowModule.matchPossibleAnswers(matchingAnswerReceived, lastQuestionSample);
                expect(resultMatchPossibleAnswers.hasOwnProperty("Error")).to.be.false;
                expect(resultMatchPossibleAnswers.hasOwnProperty("TypeError")).to.be.false;
                expect(resultMatchPossibleAnswers.id).to.be.int;
                expect(resultMatchPossibleAnswers.text).to.be.string;
                done();
            });
        });
        context("Passing a non matching answer", function () {
            it("returns an error", function (done) {
                var resultMatchPossibleAnswers = FlowModule.matchPossibleAnswers(nonMatchingAnswerReceived, lastQuestionSample);
                expect(resultMatchPossibleAnswers.hasOwnProperty("Error")).to.be.true;
                expect(resultMatchPossibleAnswers.hasOwnProperty("TypeError")).to.be.true;
                expect(resultMatchPossibleAnswers.Error).to.be.a.string;
                expect(resultMatchPossibleAnswers.TypeError).to.be.a.string;
                done();
            });
        });
        context("Passing a question with an always matching answer", function () {
            it("returns the matching answer", function (done) {
                var answer = FlowModule.matchPossibleAnswers("Whatever text", alwaysMatchingAnswerQuestion);
                done();
            });
        });
    });

    describe("#composeNextQuestion", function () {
        context("Passing a first question", function () {
            it("Returns a valid question", function (done) {
                FlowModule.composeNextQuestion(firstTimeSession, firstQuestionSample, function (err, composedQuestion) {
                    console.log(err, composedQuestion);
                    expect(err).to.be.null;
                    expect(composedQuestion).to.not.be.null;
                    expect(composedQuestion.id).to.be.int;
                    expect(composedQuestion.baseText).to.be.string;
                    done()
                });

            });
        });
        context("Passing a question and a first time session", function () {
            it("Returns a valid question", function (done) {
                FlowModule.composeNextQuestion(firstTimeSession, firstQuestionSample, function (err, composedQuestion) {
                    expect(err).to.be.null;
                    expect(composedQuestion).to.not.be.null;
                    expect(composedQuestion.id).to.be.int;
                    expect(composedQuestion.baseText).to.be.string;
                    done()
                });
            });
        });
        context("Passing a question and a recurrent time session", function () {
            it("Returns a valid question", function (done) {
                FlowModule.composeNextQuestion(recurrentSession, lastQuestionSample, function (err, composedQuestion) {
                    expect(err).to.be.null;
                    expect(composedQuestion).to.not.be.null;
                    expect(composedQuestion.id).to.be.int;
                    expect(composedQuestion.baseText).to.be.string;
                    done()
                });

            });
        });
        context("Passing a question with a questionAction", function () {
            it("Returns a valid question", function (done) {
                FlowModule.composeNextQuestion(sessionWithLastQuestion, questionWithQuestionAction, function (err, composedQuestion) {
                    expect(err).to.be.null;
                    expect(composedQuestion).to.not.be.null;
                    expect(composedQuestion.id).to.be.int;
                    expect(composedQuestion.baseText).to.be.string;
                    done()
                });

            });
        });
    });

    describe("#callAction", function () {
        context("Passing a valid actionID", function () {
            context("Passing correct parameters", function () {
                it("Executes the action and returns its status", function (done) {
                    FlowModule.callAction(actionCalledCorrectID, actionCalledCorrectParameters, function (err, data) {
                        expect(err).to.be.null;
                        expect(data).to.not.be.null;
                        done();
                    });
                }).timeout(5000);
            });
            context("Passing incorrect parameters", function () {
                it("Executes the action and returns its status", function (done) {
                    FlowModule.callAction(actionCalledCorrectID, actionCalledWrongParameters, function (err, data) {
                        expect(err).to.not.be.null;
                        expect(data).to.be.undefined;
                        done();
                    });
                });
            });
        });
        context("Passing an invalid actionID", function () {
            it("Returns an error through callback", function (done) {
                FlowModule.callAction(actionCalledWrongID, actionCalledCorrectParameters, function (err, data) {
                    expect(err).to.not.be.null;
                    expect(data).to.be.undefined;
                    expect(err.Error).to.not.be.null;
                    expect(err.TypeError).to.not.be.null;
                    expect(err.TypeError).to.equal("InvalidActionID");
                    done()
                });
            });
        });
    });

    describe("#logAnswer", function () {
        context("passing valid parameters", function () {
            it("logs the interaction correctly", function (done) {
                FlowModule.logAnswerOnDB(validSessionID, {}, lastQuestionSample, {text: "No"}, function (err, data) {
                    expect(err).to.be.null;
                    expect(data.ok).to.be.true;
                    done();
                });
            });
        });
    });
});