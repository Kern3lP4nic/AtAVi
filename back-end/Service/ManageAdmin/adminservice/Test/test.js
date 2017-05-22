'use strict';
const fs = require("../AdminService.js");

var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

var tkn="ciaoi";
var admin = {username:"secondo", email:"secondo@test.it", password:"secondo2", superadmin:false};


describe("Admin", function () {
    context("addAdmin", function () {
    
        it("Add a not existing admin", function (done) {
            fs.addAdmin(admin, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                 done();
            });
        });
        it("Add an existing admin", function (done) {
            fs.addAdmin(admin, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });        
    });
    context("getAdmins", function () {
        it("get all the admins", function (done) {
            fs.getAdmins(function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
    context("updateAdmin", function () {
        it("update admin", function (done) {
            fs.updateAdmin(admin, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
        /*it("update not existing admin", function (done) {
            fs.updateAdmin(admin2, function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });*/
    });
    context("deleteAdmin", function () {
        it("delete an admin", function (done) {
            fs.deleteAdmin("secondo", function (err, data) {
                expect(err).to.equal(null);
                expect(data).to.equal(null);
                done();
            });
        });
    });
});