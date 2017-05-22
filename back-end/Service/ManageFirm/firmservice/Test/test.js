'use strict';
const fs = require("../FirmService.js");


var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

//chai.config.includeStack = true;

var firm = {name:"test1", guests:[]};
var firm2 = {name:"test2", guests:[]};
var falseFirm ={nome:"roòuwqhrew"};
var guest = {nameg:"truewqrewe"};
const db= require("../DatabaseInteraction/DatabaseInteraction.js");

describe("Firm", function () {
    context("insertFirm", function () {
        it("Insert an not exist firm with name property", function (done) {
            fs.insertFirm(firm, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
        it("Insert an exist firm with name property", function (done) {
            fs.insertFirm(firm, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });        
        it("Insert an exist firm without name property", function (done) {
            fs.insertFirm(falseFirm, function (err,data) {
                expect(err).to.not.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("getFirms", function () {
        it("get firm regualr", function (done) {
            fs.getFirms(function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("updateFirm", function () {
        it("update firm regualr", function (done) {
            fs.updateFirm(firm, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
        it("update not exist firm", function (done) {
            fs.updateFirm(firm2, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("exsistsFirm", function () {
        it("existed", function (done) {
            fs.exsistsFirm(firm.name, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.deep.equal({ guests: [], name: 'test1' });
                done();
            });
        });
        it("notExisted", function (done) {
            fs.exsistsFirm("wqeewqerwewqewqwe", function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.deep.equal({});
                done();
            });
        });
    });

    context("addGuest", function () {
        it("addGuest to exist firm", function (done) {
            fs.addGuest(firm.name, guest ,function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
        it("addGuest to unexist firm", function (done) {
            fs.addGuest("oiewoiroireioerwioueriorweiou", guest ,function (err,data) {  
                expect(err).to.not.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("exist guest", function () {
        it("exist", function (done) {
            fs.exsistsGuest(guest.nameg, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.deep.equal({"nameg":guest.nameg});
                done();
            });
        });
        it("not exist", function (done) {
            fs.exsistsGuest("kuhrhwe", function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.deep.equal({});
                done();
            });
        });
    });

    //validate firm

    context("validate firm", function () {
        it("true firm", function (done) {
            var res=fs.validateFirm(firm);
            expect(res).to.deep.equal({"valid":true});
            done();
        });
        it("false firm special char", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res=fs.validateFirm({name:"no!!!£$K£!P$21",guests:[]});
            expect(res).to.deep.equal({"valid":false,"errors":['.name']});
            done();
        });
        it("false firm bad proprieties", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res= fs.validateFirm({name:"nogygiyo"} );
            expect(res).to.deep.equal({"valid":false,"errors":[""]});
            done();
        });
    });

   context("validate guest", function () {
        it("true guest", function (done) {
            var res=fs.validateGuest(guest);
            expect(res).to.deep.equal({"valid":true});
            done();
        });
        it("false guest special char", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res=fs.validateGuest({nameg:"no!!!£$K£!P$21"});
            expect(res).to.deep.equal({"valid":false,"errors":['.nameg']});
            done();
        });
        it("false guest bad proprieties", function (done) { //controllare anche campi opzionali ovvero di più non ce ne possono stare
            var res= fs.validateGuest({nameg:"no",ci:"a"} );
            expect(res).to.deep.equal({"valid":false,"errors":['']});
            done();
        });
    });
    
  /*  context("addInteraction", function () {
        it("addInteraction at unexist guest", function (done) {
            fs.addInteraction("ewhewlòqhrwhqlròwqe",firm.name, guest.nameg, "òuhwerhweqlr", "eioriewhrewq",function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
        it("addInteraction at exist guest", function (done) {
            fs.addInteraction("òohweòrhewrkòjhwqe",firm.name, guest.nameg, "khrkjwqhrwe", "ureqoiureqwiyrqw",function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    context("getGuestConversation", function () {
        it("get firm regualr", function (done) {
            fs.getGuestConversation(firm.name,guest.nameg, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });*/

    context("removing", function () {
         it("removing", function (done) {
            db.remove("firm",{"name":"test1"},function(err,data){});
            db.remove("firm",{"name":"test2"},function(err,data){});
            db.remove("guest_interaction",{"firm":firm.name,"guest":guest.nameg},function(err,data){});
            expect(1).to.equal(1);
            done();
         });
    });


});