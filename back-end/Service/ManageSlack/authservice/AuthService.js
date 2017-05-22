'use strict';

const db = require("./DatabaseInteraction/DatabaseInteraction.js");
const table = "admin";
const crypto = require('crypto');
const jsontest = require("./TestJson");
const codekey =  'lekfkghfkhfjhfkditc';
const nodemailer = require('nodemailer');

module.exports = {
   sendEmail: function (user, callback) {
      db.readProp(table, {"username":user}, "email", function(err,data){
            if(!err){
                  var code = crypto.createHash('md5').update((new Date().getTime()+"lekfkghfkhfjhfkditc")).digest("hex");
                  db.update(table, {"username": user}, "SET recoveryTkn = :recoveryTkn ", {":recoveryTkn":code} , function(err,res){
                        if(!err){
                              // create reusable transporter object using the default SMTP transport
                              var transporter = nodemailer.createTransport({
                                    host: 'email-smtp.us-east-1.amazonaws.com',
                                    port: 587,
                                    auth: {
                                          user: 'AKIAITKLS5E7UW6UCJFA',
                                          pass: 'AsNVW/aFdw+fv/hsVMimCzYiqyHbxu/Mv9+zS0yqA8Ay'
                                    }
                              });

                              // setup email data with unicode symbols
                              var mailOptions = {
                                    from: 'kern3lp4nic.team@gmail.com', // sender address
                                    to: data.email, // list of receivers
                                    subject: 'Password recovery ATAVI', // Subject line
                                    text: user + ' il tuo codice è per il recupero è :'+code // plain text body
                                    //html: '<b>+'<b>' // html body
                              };

                              // send mail with defined transport object
                              transporter.sendMail(mailOptions, function(err2,res2){
                                    if(err2)
                                          callback({Error:err2,TypeError:err2},null);
                                    else
                                          callback(null,null);
                              });
                        
                        }
                        else{callback(err,null)}
                  });

            }else
                  callback(err,null)

      });

   },
   passwordRecoveryToken: function (token, password, callback) {
      var pass = crypto.createHash('md5').update(password).digest("hex");
      db.queryProp(table, "username,superadmin", "recoveryTkn = :val", {":val":token}, function(err,data){
            if(!err)
                  if(data.length>0)
                        db.conditionUpdate(table, {"username": data[0].username}, "SET recoveryTkn = :recoveryTkn , password= :va2", "recoveryTkn = :recoveryTkn", {":recoveryTkn":token , ":va2":pass}, callback);
                  else
                        callback({Error:"bad Token",TypeError:"BadParamsException"});
            else
                  callback(err,null);
      });
   },
   logout: function (token, username, callback) {
      db.conditionUpdate(table, {"username": username}, "SET tkn = :val", "tkn = :val2", {
         ":val": " ",
         ":val2": token
      }, callback);
   },

   login: function (username, password, callback) {
      //codifico la password
      var pass = crypto.createHash('md5').update(password).digest("hex");

      db.queryProp(table, "username , email , superadmin", "username = :ml and password = :psw", {
            ":ml": username,
            ":psw": pass
         },
         function (err, res) {
            var result = null;
            if (!err && res.length > 0) {
               var token = crypto.createHash('md5').update((new Date().getTime() + username)).digest("hex");
               result = null;
               db.update(table, {"username": username}, "SET tkn = :val", {":val": token}, function (err, res2) {
                  if (!err) {
                     result = res[0];
                     result.token = token;
                  }
                  callback(err, result);
               });
            } else {
               err = {Error: "Invalid administrator credential", TypeError: "InvalidAdminCredential"};
               callback(err, null);
            }
         });
   },
   verifyLogin: function (token, callback) { //ok non toccare da testare ma funzionante
      db.queryProp(table, "username , email , superadmin", "tkn = :tokn", {":tokn": token}, function (err, res) {
         var result = null;
         if (!err && res.length > 0) {
            result = res[0];
         } else
            err = {Error: "Invalid administrator token", TypeError: "InvalidAdminToken"};
         callback(err, result);
      });
   },
   validateAuth: function (obj) {
      return jsontest.test(require('./JSONschema/Auth.json'), obj);
   }
};