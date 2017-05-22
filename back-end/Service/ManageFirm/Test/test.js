'use strict';
const fs = require("../index.js");


var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

//chai.config.includeStack = true;

const event1={
    httpMethod:"GET",
    resource:"/ManageFirm/Firm",
    headers:{token:"ciaoi"}
}
const event2={
    httpMethod:"GET",
    resource:"/ManageFirm/Conversation",
    headers:{token:"ciaoi"},
    queryStringParameters:{
        firm:"prova1",
        guest:"ciccio"
    }
};
const event3={
    httpMethod:"GET",
    resource:"/ManageFirm/Conversation",
    headers:{token:"ciaoi"},
    queryStringParameters:{
        firm:"prova1"
    }
};
const eventPut={
    httpMethod:"PUT",
    resource:"/ManageFirm/Firm",
    headers:{token:"ciaoi"},
    body:"{\"name\":\"kjshewjkhwe\",\"guests\":[]}"
};
var expect1={
  "Error": "",
  "TypeError": "",
  "Object": [{"guests": [],"name": "test2"},{"guests": [],"name": "kjshewjkhwe"},{"guests":[],"name": "test1"}]
};

var expectPUT={
    "Error": "",
    "TypeError": "",
    "Object": null
};

describe("ManageFirm", function () {
    this.timeout(5000);
    context("request call GET /ManageFirm/Firm", function () {
        it("ok request", function (done) {
            fs.handler(event1,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                var res=JSON.parse(data.body);
                expect(res.Error).to.equal("");
                expect(res.TypeError).to.equal("");
                expect(res.Object).to.not.equal(null);
                done();
            });
        });
    });
    context("request call GET /ManageFirm/Conversation", function () {
        it("ok request", function (done) {
            fs.handler(event2,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                var res=JSON.parse(data.body);
                expect(res.Error).to.equal("");
                expect(res.TypeError).to.equal("");
                expect(res.Object).to.not.equal(null);
                done();
            });
        });
    });
    context("request call GET /ManageFirm/Conversation", function () {
        it("bad request", function (done) {
            fs.handler(event3,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data).to.deep.equal({
                    statusCode: '400',
                    body: JSON.stringify({Error:"missing properties",TypeError:"missing properties",Object:null}),
                    headers: {'Content-Type': 'application/json'}
                });
                done();
            });
        });
    });
    context("request call /ManageFirm/Firm", function () {
        it("ok request PUT ", function (done) {
            fs.handler(eventPut,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                var res=JSON.parse(data.body);
                expect(res.Error).to.equal("");
                expect(res.TypeError).to.equal("");
                expect(res.Object).to.equal(null);
                done();
            });
        });
    });
});