/**
 * Created by Pily on 17/03/17.
 */
'use strict';
const https = require("https");
const querystring = require("querystring");

const uri = 'https://slack.com/api/channels.list';


module.exports = {
   getChannelsList: function (token, callback) {

      const payload = {
         "token": token
      };

      https.get(uri + "?" + querystring.stringify(payload), function (res) {

         var body = '';

         res.on('data', function (data) {
            body = body + data;
         }).on('end', function () {

            var json = JSON.parse(body);
            if (json.ok === true) {
               callback(null, json);
            } else {
               callback(json);
            }
         });

      }).on('error', function (e) {
         callback(e);
      }).end();
   }
};