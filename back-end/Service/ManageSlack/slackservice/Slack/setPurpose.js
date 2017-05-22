var https = require('https');
const querystring = require('querystring');
var ni = require('./NameID/NameID');

module.exports = {
   setPurpose: function (token, channelID, callback) {
      ni.ID2name(token, channelID, function (err, data) {
         if (!err) {
            var payload = {
               'token': token,
               'channel': channelID,
               'purpose': 'Canale dedicato alla comunicazione con i rappresentanti dell\'azienda ' + data.name
            };
            https.get('https://slack.com/api/channels.setPurpose?' + querystring.stringify(payload), function (res) {
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
         } else {
            callback(err);
         }
      });
   }
};