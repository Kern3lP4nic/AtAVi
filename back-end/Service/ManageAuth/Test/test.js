'use strict';
const fs = require("../AuthService");

var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

var admin = {username:"primo", email:"zanonedoardo@outlook.com", password:"ciaociao", superadmin:true};

//
describe("Admin", function () {
    this.timeout(5000);
    context("sendEmail", function () {
        it("verify email for password recovery", function (done) {
            fs.sendEmail(admin.username, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
    //passwordRecoveyToken
    var token="";
    context("login", function () {
        it("verify user e password", function (done) {
            fs.login(admin.username, admin.password, function (err, data) {
                expect(err).to.equal(null);
                expect(data.username).to.equal(admin.username);
                expect(data.token).to.not.equal(null);
                token=data.token;
                done();
            });
        });
    });
    context("verifyLogin", function () {
        it("all ok", function (done) {
            fs.verifyLogin(token, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(admin);
                done();
            });
        });
    });
    context("logout", function () {
        it("logout", function (done) {
            fs.logout(token, admin.username, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
});