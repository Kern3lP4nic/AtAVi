var https = require('https');
const querystring = require('querystring');
var cl = require('./ChannelsList/ChannelsList');
var cc = require('./createChannel');
var ni = require('./NameID/NameID');
var un = require('./unarchive');
var iv = require('./invite');
var sp = require('./setPurpose');
var ui = require('./usersID.json');


module.exports = {
   postMessage: function (token, channelName, text, callback) {

      var payload = {
         "token": token,
         "channel": channelName,
         "text": text,
         "username": "AtAVi"
      };

      cl.getChannelsList(token, function (err, data) {
         if (!err) {

            var channel;
            channel = data.channels.find(function (c) {
               return c.name === channelName;
            });

            if (channel) {
               if (channel.is_archived === false) {
                  sendMessage(payload, function (err, data) {
                     if (!err) {
                        callback(null, data);
                     } else {
                        callback(err);
                     }
                  });
               } else {
                  un.unarchiveChannelByID(token, channel.id, function (err, data) {
                     if (!err) {
                        sendMessage(payload, function (err, data) {
                           if (!err) {
                              callback(null, data);
                           } else {
                              callback(err);
                           }
                        });
                     } else {
                        callback(err);
                     }
                  });
               }
            } else {
               cc.createChannel(token, channelName, function (err, data) {
                  if (!err) {
                     var channelID = data.channel.id;
                     sp.setPurpose(token, channelID, function (err, data) {
                     });
                     sendMessage(payload, function (err, data) {
                        if (!err) {
                           callback(null, data);
                        } else {
                           callback(err);
                        }
                     });
                  } else {
                     callback(err);
                  }
               });
            }

         } else {
            callback(err);
         }
      });
   }
};

var sendMessage = function (payload, callBack) {
   var error = '';
   https.get('https://slack.com/api/chat.postMessage?' + querystring.stringify(payload), function (res) {
      var body = '';
      res.on('data', function (data) {
         body = body + data;
      }).on('end', function () {

         var json = JSON.parse(body);
         if (json.ok === true) {
            callBack(null, json);
         } else {
            // Error occurred
            callBack(json);
         }
      });

   }).on('error', function (e) {
      // Error occurred
      callBack({"ok": false, "error": e});
   }).end();
};