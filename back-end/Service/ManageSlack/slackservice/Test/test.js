'use strict';
const fs = require("../SlackService.js");

var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

chai.config.includeStack = true;

var interlocutor = {nameI:"pippo", id_slack:"test1", isDefault: false};
var interlocutor2 = {nameI:"pluto", id_slack:"test2", isDefault: false};
//var falseInterlocutor = {nammeI:"111"};

describe("Interlocutor", function () {
    context("addToDefault", function () {
        it("Add a not existing interlocutor to default with name property", function (done) {
            fs.addToDefault(interlocutor, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                 done();
            });
        });
        it("Add an existing interlocutor to default with name property", function (done) {
            fs.addToDefault(interlocutor, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });        
        /*it("Add a not existing interlocutor without name property", function (done) {
            fs.addInterlocutor(falseInterlocutor, function (err, data) {
                expect(err).to.not.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });*/
    });
    context("refreshInterlocutors", function () {
        it("refresh interlocutors list", function (done) {
            fs.refreshInterlocutors(function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("getInterlocutors", function () {
        it("get all the interlocutors", function (done) {
            fs.getInterlocutors(function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("getDefaultInterlocutor", function () {
        it("get all the default interlocutors", function (done) {
            fs.getDefaultInterlocutor(function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("deleteInterlocutor", function () {
        it("delete a default interlocutor", function (done) {
            fs.removeToDefault(interlocutor.id_slack, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("sendMessageChannel", function () {
        it("send a message to a channel #firm", function (done) {
            fs.sendMessageChannel("prova service", "azienda", function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("sendMessageGeneral", function () {
        it("send a message to a channel #general", function (done) {
            fs.sendMessageGeneral("prova service general", function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("validateInterlocutor", function () {
        it("true interlocutor", function (done) {
            var res = fs.validateInterlocutor(interlocutor);
            expect(res).to.deep.equal({"valid":true});
            done();
        });
        it("false interlocutor special char", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res = fs.validateInterlocutor({nameI:"bad!!!£$K£!P$21", id_slack:"badTest", isDefault: false });
            expect(res).to.deep.equal({"valid":false,"errors":['.nameI']});
            done();
        });
        it("false interlocutor bad proprieties", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res = fs.validateInterlocutor({nameI:"pippo", id_slakkk:"badTest", isDefault: false});
            expect(res.valid).to.equal(false);
            done();
        });
    });
});