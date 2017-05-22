'use strict';
const fs = require("../QuestionService.js");

var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

chai.config.includeStack = true;

var question = {id:-1, baseText:"test", recurrentText:"test", isFirst:true, dynamic:false, answers:[{text:"test", id_nextQuestion:11, actions: [{id_action:1, text:"test"}]}]};
var question2 = {id:-2, baseText:"test2", dynamic:true, answer:[{text:"test2", id_nextQuestion:11, actions: [{id_action:2, text:"test2"}]}]};
var falseQuestion = {iddi:111};

describe("Question", function () {
    context("addQuestion", function () {
        it("Add a not existing question with name property", function (done) {
            fs.addQuestion(question, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                 done();
            });
        });
        it("Add an existing question with name property", function (done) {
            fs.addQuestion(question, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });        
        it("Add an existing question without name property", function (done) {
            fs.addQuestion(falseQuestion, function (err, data) {
                expect(err).to.not.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("getQuestions", function () {
        it("get all the questions", function (done) {
            fs.getQuestions(function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("updateQuestion", function () {
        it("update question", function (done) {
            fs.updateQuestion(question, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
        it("update not existing question", function (done) {
            fs.updateQuestion(question2, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("getActions", function () {
        it("get all actions", function (done) {
            fs.getActions(function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("getNextQuestion", function () {
        it("get a question's next question", function (done) {
            fs.getNextQuestion(question.id, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("getFirstQuestion", function () {
        it("get the first question", function (done) {
            fs.getFirstQuestion(function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("deleteQuestion", function () {
        it("delete a question that can be deleted", function (done) {
            fs.deleteQuestion(question2, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
        it("delete a question that can't be deleted", function (done) {
            fs.deleteQuestion(question, function (err, data) {
                expect(err).to.not.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("getLastAnswerText", function () {
        it("get last answer's text", function (done) {
            fs.getLastAnswerText(function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("validateQuestion", function () {
        it("true question", function (done) {
            var res = fs.validateQuestion(question);
            expect(res).to.deep.equal({"valid":true});
            done();
        });
        it("false question special char", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res = fs.validateQuestion({id:"aaa", baseText:"badTest", dynamic:true, answer:[{text:"badTest", id_nextQuestion:11, actions: [{id_action:2, text:"badTest"}]}]});
            expect(res.valid).to.equal(false);
            
            done();
        });
        it("false question bad proprieties", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res = fs.validateQuestion({id:"aaa", basssseText:"badTest", dynamic:true, answer:[{text:"badTest", id_nextQuestion:11, actions: [{id_action:2, text:"badTest"}]}]});
             expect(res.valid).to.equal(false);
            done();
        });
    });
});
