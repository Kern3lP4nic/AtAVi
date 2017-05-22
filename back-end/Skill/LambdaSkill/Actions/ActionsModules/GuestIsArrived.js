/**
 * Created by pily on 24/03/17.
 */

var SlackPostMessage = require("./MessageSlack/MessageSlack");

var FirmService = require("../../FirmService/FirmService");

module.exports = {
   id: 0,
   executeAction: function (sessionAttributes, callback) {
      //Valid parameter object

      var text = "";
      var channelName = "";

      if (sessionAttributes.hasOwnProperty("guestName")) {
         text = sessionAttributes.guestName + " is arrived.";

         if (sessionAttributes.hasOwnProperty("firmName") && sessionAttributes.firmName !== "") {
            //With firmName

            //Add guest to the firm if not signed up
            FirmService.exsistsGuest(sessionAttributes.guestName, function (err, data) {
               if (!err && data === {}) {
                  FirmService.exsistsFirm(sessionAttributes.firmName, function (err, data) {
                     if (!err && data !== {}) {
                        FirmService.addGuest(sessionAttributes.firmName, {"nameg": sessionAttributes.guestName}, function (err) {
                           if (err) {
                              console.error("Error in addGuest: ", err);
                           }
                        })
                     }
                  });
               }
            });


            channelName = sessionAttributes.firmName.toLocaleLowerCase().replace(/[^a-z0-9_-]/g, "");

            SlackPostMessage.sendMessageChannel(text, channelName, function (err, data) {
               if (!err) {
                  callback(null, {ok: true, info: "Message sent"});
               } else {
                  callback(err);
               }
            });
         } else {

            //Without firmName
            SlackPostMessage.sendMessageGeneral(text, function (err, data) {
               if (!err) {
                  callback(null, {ok: true, info: "Message sent"});
               } else {
                  callback(err);
               }
            });
         }
      } else {
         console.error("Error in action " + module.exports.id + " - Invalid parameters: use {guestName: guest name, [firmName: name the company]");
         callback({"Error": "Invalid parameters: use {guestName: guest name, [firmName: name the company]"});
      }
   }
};
