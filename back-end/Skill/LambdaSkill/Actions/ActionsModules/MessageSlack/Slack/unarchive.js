var https = require('https');
const querystring = require('querystring');

module.exports = {
   unarchiveChannelByID: function (token, channelID, callbackData) {

      var payload = {
         'token': token,
         'channel': channelID
      };

      https.get('https://slack.com/api/channels.unarchive?' + querystring.stringify(payload), function (res) {

         var body = "";
         res.on('data', function (chunk) {
            body = body + chunk;
         }).on('end', function () {
            var json = JSON.parse(body);
            if (json.ok === false)
               callbackData(json);
            else
               callbackData(null, json);
         });
      }).on('error', function (e) {
         callbackData(e);
      });
   }
};