'use strict';
const db= require("./DatabaseInteraction/DatabaseInteraction.js");
const table="firm";
const interactionTable="guest_interaction";
const schemaGuest = require('./JSONschema/Guest.json');
const schemaFirm = require('./JSONschema/Firm.json');
const jsontest = require("./TestJson.js");
// Error during operation

module.exports = {
    /*  limit: number of firms returned
        callback function of exectuting at the end
        err,res 
        err !not null -> res null
        err null -> res :[]*/
    getFirms: function(callback) { //testes
        db.query(table,100,null,null,callback); //da sistemare discorso limit
    },
    insertFirm: function(firm,callback) {// perchè limit??
        db.insert(table,firm,callback);//replace the obj
    },
    updateFirm: function(firm,callback) { //tested
        db.insert(table,firm,callback);
    },
    addGuest: function(nameFirm,guest,callback){ //tested
            db.read(table,{"name":nameFirm}, function(err,res){
                if(!err && (Object.keys(res).length > 0)){
                    db.update(table,
                    {"name":nameFirm},
                    "SET guests = list_append(if_not_exists(guests, :empty_list) , :val)",
                    {":val":[guest],":empty_list":[]},
                    function(err,res){callback(err,res);});
                }
                else
                    callback({Error:"Firm not exists",TypeError:"updateError"},null);
        });
    },
    exsistsFirm: function(name,callback) { //tested
        db.read(table,{"name":name},callback);
    },
    exsistsGuest: function(name,callback) { //tested
        db.query(table, 100000000, "contains(guests,:a)", {":a" : {"nameg":name}},
            function(err,res){
                if (err)
                    callback(err,null);
                else{
                    var result = {};
                    if(res.length > 0)
                        result=res[0].guests[0];
                    callback(null,result);
                }
            }
        );
    },
    getGuestConversation: function(firm,guest,callback) {//tested 
        db.query(interactionTable,100,"firm = :firm and guest = :guest",{":firm":firm,":guest":guest},callback); 
    },
    validateGuest : function(obj){ //tested
        return jsontest.test(schemaGuest,obj);
    },
    validateFirm : function(obj){ //tested
        return jsontest.test(schemaFirm,obj);
    }
};
