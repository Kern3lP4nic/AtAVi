'use strict';

const db = require("./DatabaseInteraction/DatabaseInteraction.js");
const table ="interlocutor";

const schemaInterlocutor = require('./JSONschema/Interlocutor.json');
const jsontest = require("./TestJson.js");

const list = require("./Slack/userList");
const token = require("./Slack/config.json").tokenSlack;

module.exports = {
    addToDefault: function(interlocutor, callback) {
        //db.insert(table, interlocutor, function(err, res) {
            //if(!err)
                db.update(table, {"id_slack":interlocutor.id_slack}, "SET isDefault = :val", {":val":true}, callback);
            //else
                //callback(err,null);
    //});
    },
    removeToDefault: function(interlocutor, callback) {
       db.update(table, {"id_slack":interlocutor}, "SET isDefault = :val", {":val":false}, callback);
    },
    refreshInterlocutors: function(callback) {
        list.userList(token, function(err,res){
            if(err)
                callback(err,null);
            else{
                db.query(table, 100, null, null,function(err,res2){
                if(err)
                    callback(err,null); 
                else{
                    res.members.forEach(function(x){
                        if(!res2.find(function(item){
                            return  x.id == item.id_slack;
                        })) db.insert(table,{"id_slack":x.id,"isDefault":false,"nameI":x.real_name},function(err,res){console.log("inserito");});  
                        });
                    res2.forEach(function(x){
                        if(!res.members.find(function(item,x){
                            return  x.id_slack == item.name;
                        })) db.remove(table,{"id_slack": x.id_key},function(err,res){});  
                    });
                    callback(null,null);
                }
            });
        }
        });
    },
    getInterlocutors: function(callback) {
        db.query(table, 100, null, null, callback);
    },
    getDefaultInterlocutor: function(limit, callback) {
        db.query(table, 100, "isDefault = :yes", {":yes": true}, callback);
    },
    validateInterlocutor : function(obj) {
        return jsontest.test(schemaInterlocutor, obj);
    }
};