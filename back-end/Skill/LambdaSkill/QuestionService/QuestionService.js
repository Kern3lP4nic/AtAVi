'use strict';

const db = require("./DatabaseInteraction/DatabaseInteraction");
const table ="question";
const actionTable="action";
const actionSchema=require('./JSONschema/Action.json');

const schemaQuestion = require('./JSONschema/Question.json');
const jsontest = require("./TestJson.js");

module.exports = {
    addQuestion: function(question, callback) {
        db.insert(table, question, callback);
    },
    deleteQuestion: function(keyValue, callback) {
        db.read(table, {"id": keyValue.id}, function(err, res) {
            if(!err && res.dynamic===true) {
                db.remove(table, {"id":keyValue.id}, callback);
            }else
                callback({Error:"U can't delete a not dynamic question",TypeError:"deleteError"},null);
        });
    },
    addAction: function(action, callback) {
        db.insert(actionTable, action, callback);
    },
    deleteAction: function(keyValue, callback) {
        db.remove(actionTable, {"id_action":keyValue.id_action}, callback);
    },
    getQuestions: function(callback) {
        db.query(table, null, null, null, callback);
    },
    updateQuestion: function(question, callback) {
        db.insert(table, question, callback);
    },
    getActions: function(callback) {
        db.query(actionTable, null, null, null, callback);
    },
    getNextQuestion: function(question, callback) {
        db.read(table, {"id": question}, callback)
    },
    getFirstQuestion: function(callback) {
        db.query(table, 1, "isFirst = :first", {":first": true}, callback)
    },
    getLastAnswerText: function(callback) {
        db.query(table, 1, "id_nextQuestion = :last", {":last": null}, callback)
    },
    validateQuestion : function(obj) {
        return jsontest.test(schemaQuestion, obj);
    },
    validateAction: function(obj) {
        return jsontest.test(actionSchema, obj);
    }
};