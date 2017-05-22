'use strict';
const fs = require("../index.js");
var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

//chai.config.includeStack = true;

var event1={
    httpMethod:"GET",
    resource:"/ManageAuth/Authentication",
    headers:{token:"0123456789"}
};
var recovery={
    httpMethod:"PUT",
    resource:"/ManageAuth/SendEmail",
    body:JSON.stringify({
            "recoveryToken":"8349e24aba1f78c81c729196d45f071a",
            "password":"ciaociao"
    })
};

var eventget2={
    httpMethod:"GET",
    resource:"/ManageAuth/SendEmail",
    queryStringParameters:{username:"nenne"}
};

var event2={
    httpMethod:"POST",
    resource:"/ManageAuth/Authentication",
    body:JSON.stringify({
            "username":"nenne",
            "password":"ciaociao"
    })
};
var event3={
    httpMethod:"DELETE",
    resource:"/ManageAuth/Authentication",
    headers:{token:"0123456789"}
}
const eventPut={
    httpMethod:"PUT",
    resource:"/ManageFirm/Firm",
    headers:{token:"0123456789"},
    body:"{\"firm\":{\"name\":\"kjshewjkhwe\",\"guests\":[]}}"
};

var expect1={
  "Error": "",
  "TypeError": "",
  "Object": {"email":"primo@test.it",
        "superadmin":true,
        "username":"primo",
        "token":""
    },
};
var expect2={
  "Error": "",
  "TypeError": "",
  "Object": {"email":"primo@test.it",
        "superadmin":true,
        "username":"primo"
    },
};
var expect3={
  "Error": "",
  "TypeError": "",
  "Object": null,
};


var token="";
describe("ManageFirm", function () {
    this.timeout(5000);
    context("request call POST /ManageAuth/Authentication", function () {
        it("ok request", function (done) {
            fs.handler(event2,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                token = JSON.parse(data.body).Object.token;
                expect1.Object.token = token;
                event1.headers.token = token;
                event3.headers.token = token;
                done();
            });
        });
    });

    context("request call GET /ManageAuth/Authentication", function () {
        it("ok request", function (done) {
            fs.handler(event1,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                done();
            });
        });
    });

     context("request call DELETE /ManageAuth/Authentication", function () {
        it("ok request", function (done) {
            fs.handler(event3,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                done();
            });
        });
    });
    context("request call PUT /ManageAuth/SendEmail", function () {
        it("ok request get 2", function (done) {
            fs.handler(recovery,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.Error).to.equal(null);
                done();
            });
        });
    });
    context("request call GET /ManageAuth/SendEmail", function () {
        it("ok request get 2", function (done) {
            fs.handler(eventget2,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                done();
            });
        });
    });


});