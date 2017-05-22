var https = require('https');
const querystring = require('querystring');

module.exports = {
   createChannel: function (token, name, callback) {

      var payload = {
         "token": token,
         "name": name
      };

      https.get('https://slack.com/api/channels.create?' + querystring.stringify(payload), function (res) {
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