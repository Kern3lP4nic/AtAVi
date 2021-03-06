/**
 * Created by pily on 24/03/17.
 */

var SlackPostMessage = require("./MessageSlack/MessageSlack");

module.exports = {
    id: 1,
    executeAction: function (parameters, callback) {

        //Valid parameter object
        if (parameters.hasOwnProperty("guestName")) {
            var guestName = parameters.guestName;

            var text = guestName + " has ordered some coffee.";

            if (parameters.hasOwnProperty("firmName") && parameters.firmName !== "") {
                var channelName = parameters.firmName.toLocaleLowerCase().replace(/[^a-z0-9_-]/g, "");

                SlackPostMessage.sendMessageChannel(text, channelName, function (err, data) {
                    if (err) {
                        console.error({"Error": "Error in sendMessageChannel"});
                    }
                });
                callback(null, {ok: true, info: "Message sent"});
            } else {
                SlackPostMessage.sendMessageGeneral(text, function (err, data) {
                    if (err) {
                        console.error({"Error": "Error in sendMessageGeneral"});
                    }
                });
                callback(null, {ok: true, info: "Message sent"});
            }
        } else {
            console.error("Error in action " + module.exports.id + " - Invalid parameters: use {guestName: Guest name, [firmName: \"Firm name\"]}");
            callback({Error: "Invalid parameters: use {guestName: Guest name, [firmName: \"Firm name\"]}"})
        }
    }
};
