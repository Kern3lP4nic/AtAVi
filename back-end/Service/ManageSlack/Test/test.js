'use strict';
const fs = require("../index.js");


var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

const event1={
    httpMethod:"GET",
    resource:"/ManageSlack/DefaultInterlocutors",
    headers:{token:"ciaoi"}
}

const event2={
    httpMethod:"GET",
    resource:"/ManageSlack/Interlocutors",
    headers:{token:"ciaoi"}
}
const eventPOST={
    httpMethod:"POST",
    resource:"/ManageSlack/DefaultInterlocutors",
    headers:{token:"ciaoi"},
    body:"{\"id_slack\":\"azz\",\"isDefault\":true,\"nameI\":\"kwerjhewrh\"}"
};
const eventDELETE={
    httpMethod:"DELETE",
    resource:"/ManageSlack/DefaultInterlocutors",
    headers:{token:"ciaoi"},
    body:"{\"id_slack\":\"azz\",\"isDefault\":true,\"nameI\":\"kwerjhewrh\"}"
};
const eventPUT={
    httpMethod:"PUT",
    resource:"/ManageSlack/Interlocutors",
    headers:{token:"ciaoi"}
}

var expect1={
  "Error": "",
  "TypeError": "",
  "Object": null
};


describe("ManageFirm", function () {
    this.timeout(4000);

    context("request call GET /Manageslack/DefaultInterlocutors", function () {
        it("ok request", function (done) {
            fs.handler(event1,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                var res=JSON.parse(data.body);
                expect(res.Error).to.equal('');
                expect(res.TypeError).to.equal('');
                expect(res.Object).to.not.equal(null);
                done();
            });
        });
    });

    context("request call GET /Manageslack/Interlocutors", function () {
        it("ok request", function (done) {
            fs.handler(event2,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                var res=JSON.parse(data.body);
                expect(res.Error).to.equal('');
                expect(res.TypeError).to.equal('');
                expect(res.Object).to.not.equal(null);
                done();
            });
        });
    });

    context("request call POST /Manageslack/DefaultInterlocutors", function () {
        it("ok request", function (done) {
            fs.handler(eventPOST,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.equal(JSON.stringify(expect1));
                done();
            });
        });
    });
    context("request call DELETE /Manageslack/DefaultInterlocutors", function () {
        it("ok request", function (done) {
            fs.handler(eventDELETE,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.equal(JSON.stringify(expect1));
                done();
            });
        });
    });
    context("request call PUT /Manageslack/interlocutors", function () {
        it("ok request", function (done) {
            fs.handler(eventPUT,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.equal(JSON.stringify(expect1));
                done();
            });
        });
    });
});