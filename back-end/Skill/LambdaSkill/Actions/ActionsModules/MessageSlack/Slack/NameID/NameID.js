/**
 * Created by Pily on 20/03/17.
 */
const ChannelList = require("../ChannelsList/ChannelsList");

module.exports = {
   name2ID: function (token, name, callback) {
      // Get the list of channels
      ChannelList.getChannelsList(token, function (err, data) {
         if (!err) {

            // Search in the list for one with the requested channelName
            var channel = data.channels.find(function (channel) {
               return channel.name === name;
            });

            if (channel !== undefined) {
               const result = {
                  ok: true,
                  id: channel.id
               };
               callback(null, result);
            } else {
               callback({
                  ok: false,
                  error: "channel_name_not_found"
               });
            }
         } else {
            callback(err);
         }
      });
   },
   ID2name: function (token, id, callback) {
      // Get the list of channels
      ChannelList.getChannelsList(token, function (err, data) {
         var error;
         if (!err) {

            // Search in the list for one with the requested channelName
            var channel = data.channels.find(function (channel) {
               return channel.id === id;
            });

            if (channel !== undefined) {
               callback(null, {
                  ok: true,
                  name: channel.name
               });
            } else {
               callback({
                  ok: false,
                  error: "channel_id_not_found"
               });
            }
         } else {
            // Error occurred
            callback(err);
         }
      });
   }
};