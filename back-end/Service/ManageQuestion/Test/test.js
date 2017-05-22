'use strict';
const fs = require("../index.js");


var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

const event1={
    httpMethod:"GET",
    resource:"/ManageQuestions/Actions",
    headers:{token:"ciaoi"}
}

const event3={
    httpMethod:"GET",
    resource:"/ManageQuestions/Questions",
    headers:{token:"ciaoi"}
}
const eventPOST={
    httpMethod:"POST",
    resource:"/ManageQuestions/Questions",
    headers:{token:"ciaoi"},
    body:"{\"id\":-1, \"baseText\":\"test2\", \"dynamic\":true, \"answers\":[{\"text\":\"test2\", \"id_nextQuestion\":11, \"actions\": [{\"id_action\":-1, \"text\":\"test2\"}]}]}"
};
const eventPOST2={
    httpMethod:"POST",
    resource:"/ManageQuestions/Actions",
    headers:{token:"ciaoi"},
    body:"{\"id_action\":-1, \"text\":\"test2\"}"
};
const eventDELETE={
    httpMethod:"DELETE",
    resource:"/ManageQuestions/Questions",
    headers:{token:"ciaoi"},
    body:JSON.stringify({id:-2, baseText:"test2", dynamic:true, answers:[{text:"test2", id_nextQuestion:11, actions: [{id_action:-1, text:"test2"}]}]}
    )};
const eventDELETE2={
    httpMethod:"DELETE",
    resource:"/ManageQuestions/Actions",
    headers:{token:"ciaoi"},
    body:"{\"id_action\":-1, \"text\":\"test2\"}"
};
const eventPUT={
    httpMethod:"PUT",
    resource:"/ManageQuestions/Questions", 
    headers:{token:"ciaoi"},
    body:JSON.stringify({id:-2, baseText:"test2", dynamic:true, answers:[{text:"test2", id_nextQuestion:-5, actions: [{id_action:-1, text:"test2"}]}]
    })
}

var expect1={
  "Error": "",
  "TypeError": "",
  "Object": null
};


describe("ManageQuestion", function () {
    context("request ok token GET /ManageQuestions/Questions", function () {
        it("ok token", function (done) {
            fs.handler(event3,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                done();
            });
        });
    });

    context("request call GET /ManageQuestions/Action", function () {
        it("ok request get quest", function (done) {
            fs.handler(event1,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                done();
            });
        });
    });
    context("request call POST /ManageQuestions/Questions", function () {
        it("ok request post quest", function (done) {
            fs.handler(eventPOST,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.deep.equal(JSON.stringify(expect1));
                done();
            });
        });
    });
    context("request call POST /ManageQuestions/Actions", function () {
        it("ok request", function (done) {
            fs.handler(eventPOST2,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.deep.equal(JSON.stringify(expect1));
                done();
            });
        });
    });

    context("request call PUT /ManageQuestions/Questions", function () {
        it("ok request", function (done) {
            fs.handler(eventPUT,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.deep.equal(JSON.stringify(expect1));
                done();
            });
        });
    });
    context("request call DELETE /ManageQuestions/Actions", function () {
        it("ok request del act", function (done) {
            fs.handler(eventDELETE2,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.deep.equal(JSON.stringify(expect1));
                done();
            });
        });
    });
    context("request call DELETE /ManageQuestions/Questions", function () {
        it("ok request del", function (done) {
            fs.handler(eventDELETE,{}, function (err,data) {
                expect(err).to.equal(null);
                expect(data.statusCode).to.equal('200');
                expect(data.body).to.deep.equal(JSON.stringify(expect1));
                done();
            });
        });
    });
    
});