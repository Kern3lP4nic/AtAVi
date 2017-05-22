'use strict';

const db = require("./DatabaseInteraction/DatabaseInteraction.js");
const table = "admin";
const crypto = require('crypto');
const jsontest = require("./TestJson.js");
//const codekey =  'lekfkghfkhfjhfkditc';

module.exports = {
   /*PRE: admin (username,email,password,superadmin)*/
   addAdmin: function (admin, callback) {//deve essere attinente al modello adminservice e deve aver la password
      //codifico la password
      var adminIns = {
         username: admin.username,
         email: admin.email,
         superadmin: admin.superadmin
      };
      adminIns.password = crypto.createHash('md5').update(admin.password).digest("hex");

      db.insert(table, adminIns, callback);
   },

   /*PRE: admin (username,email,password) no required password*/
   updateAdmin: function (admin, callback) {
      //devo modificarlo e controllare che se c'è la password la codifico,
      //ma la modifica va fatta a singole proprietà e devo anche controllare che il token corrisponda a quell'username nello strato precedente
      //non tengo in considerazione admin perchè uno nasce e muove o admin o superadmin
      var updExp = "SET email = :mail";
      var valueExp = {":mail": admin.email};

      if (admin.hasOwnProperty('password') && admin.password != null) {
         updExp = updExp + " , password = :pw";
         valueExp = {":mail": admin.email, ":pw" : crypto.createHash('md5').update(admin.password).digest("hex")};
      }

      db.update(table, {"username": admin.username}, updExp, valueExp, callback);
   },
   /*Pre: username is a string*/
   deleteAdmin: function (username, callback) {
      db.remove(table, {"username": username}, callback);
   }, /*POST: if exist delete else error*/

   getAdmins: function (callback) {
      db.queryProp(table, "username , email, superadmin", null, null, callback);
   },
   validateAdmin: function (obj) {
      return jsontest.test(require('./JSONschema/Admin.json'), obj);
   },
   validateUpdate: function (obj) {
      return jsontest.test(require('./JSONschema/UpdateAdmin.json'), obj);
   }
};