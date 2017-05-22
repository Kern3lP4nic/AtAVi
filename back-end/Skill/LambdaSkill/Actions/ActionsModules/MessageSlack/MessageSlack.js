'use strict';

const PostMessage = require("./Slack/postMessage");
const invite = require("./Slack/invite");
const NameID = require("./Slack/NameID/NameID");
const token = require("./Slack/config.json").tokenSlack;
const InfoSlack = require("./InfoSlack/InfoSlack");

module.exports = {
   sendMessageChannel: function (text, firmName, callback) {
      PostMessage.postMessage(token, firmName, text, function (err, res) {
         if (!err) {
            NameID.name2ID(token, firmName, function (err, data) {
               if (!err) {
                  inviteDefault(token, data.id, function (err) {
                     if (err) {
                        console.error("Error in inviteDefault:", err);
                     }
                  });
                  callback(null, {ok: true});
               } else {
                  console.error("Error in name2ID:", err);
                  callback(err);
               }
            });
         } else {
            console.error("Error in postMessage:", err);
            callback(err);
         }
      });
   },
   sendMessageGeneral: function (text, callback) {
      PostMessage.postMessage(token, "general", text, function (err, data) {
      });
      callback(null, {ok: true});
   }
};

var inviteDefault = function (token, channelID, callback) {
   InfoSlack.getDefaultInterlocutor(100, function (err, users) {
      if (users.length > 0) {
         inviteChain(token, channelID, users, 0, function (err, data) {
            if (err) {
               callback(err)
            }
            else {
               callback(null, data);
            }
         });
      }
   });
};

var inviteChain = function (token, channelID, users, i, callback) {
   invite.invite(token, channelID, users[i].id_slack, function (err) {
      if (!err || err.error === "already_in_channel" || err.error === "cant_invite_self") {
         if (i + 1 < users.length) {
            inviteChain(token, channelID, users, i + 1, function (err, data) {
               if (err) {
                  callback(err);
               } else {
                  callback(null, data);
               }
            });
         } else {
            callback(null, {"ok": true, "info": "All default interlocutors invited"});
         }
      } else {
         callback(err);
      }
   });
};