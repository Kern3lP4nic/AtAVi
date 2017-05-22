var https = require('https');
const querystring = require('querystring');


module.exports = {
    userList: function(token, callbackData) {

        var payload = {
            'token': token
        };

        https.get('https://slack.com/api/users.list?' + querystring.stringify(payload), function(res) {
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