'use strict';
const fs = require("../LogService.js");


var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

var guest = {nameg:"truewqrewe"};
const db= require("../DatabaseInteraction/DatabaseInteraction.js");

describe("LogService", function () {

    context("logLastInterlocutor", function () {
        it("get firm regualr", function (done) {
            fs.logLastInterlocutor("caiociao","pippo", function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("log firm", function () {
        it("correct firm", function (done) {
            fs.logFirm("caiociao","ciccio s.p.a", function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("log guest", function () {
        it("correct guest regualr", function (done) {
            fs.logGuest("caiociao","ciccio", function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("getLastInterlocutor", function () {
        it("get firm regualr", function (done) {
            fs.getLastInterlocutor("ciccio", function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("getRecentGuest", function () {
        it("get guest regualr", function (done) {
            fs.getRecentGuest("ciccio s.p.a","caiociao", function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                //expect(data).to.not.equal(null);
                //expect(data).to.equal("ciccio");
                done();
            });
        });
    });

        

});