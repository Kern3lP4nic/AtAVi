var https = require('https');
const querystring = require('querystring');

module.exports = {
   invite: function (token, channelID, userID, callback) {

      var payload = {
         'token': token,
         'channel': channelID,
         'user': userID
      };

      https.get('https://slack.com/api/channels.invite?' + querystring.stringify(payload), function (res) {
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
      });
   }
};

