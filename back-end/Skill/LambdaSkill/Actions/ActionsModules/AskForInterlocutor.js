/**
 * Created by pily on 27/04/17.
 */
/**
 * Created by pily on 24/03/17.
 */

var SlackPostMessage = require("./MessageSlack/MessageSlack");
var LogService = require("../../LogService/LogService");

module.exports = {
    id: 5,
    executeAction: function (parameters, callback) {

        var call = function () {
            var text = parameters.guestName + " has asked for " + parameters.lastInterlocutor + ".";

            LogService.logLastInterlocutor(parameters.sessionId, parameters.lastInterlocutor, function (err) {
                if (err) {
                    console.error("Error in logLastInterlocutor: ", err);
                }
            });

            if (parameters.hasOwnProperty("firmName") && parameters.firmName !== "") {
                var channelName = parameters.firmName.toLocaleLowerCase().replace(/[^a-z0-9_-]/g, "");

                SlackPostMessage.sendMessageChannel(text, channelName, function (err, data) {
                    if (!err) {
                        callback(null, {ok: true, info: "Message sent"});
                    } else {
                        callback(err);
                    }
                });
            } else {
                SlackPostMessage.sendMessageGeneral(text, function (err, data) {
                    if (!err) {
                        callback(null, {ok: true, info: "Message sent"});
                    } else {
                        callback(err);
                    }
                });
            }
        };

        //Valid parameter object
        if (parameters.hasOwnProperty("lastAnswer") && parameters.hasOwnProperty("guestName")) {

            if (parameters.hasOwnProperty("lastInterlocutor") && parameters.lastInterlocutor !== null) {
                if (parameters.lastAnswer.text.toLowerCase() === "no") {
                    parameters.lastAnswer.id_nextQuestion = parameters.lastQuestion.id;
                    parameters.skipAskForInterlocutor = true;
                } else {
                    call();
                }
            } else {
                parameters.lastInterlocutor = parameters.lastAnswer.text;
                call();
            }
        } else {
            console.error("Error in action " + module.exports.id + " - Invalid parameters: use {lastAnswer: answer object with text as interlocutor name, guestName: guest name, [firmName: name the company], [lastInterlocutor: name of the last interlocutor]}");
            callback({Error: "Invalid parameters: use {lastAnswer: answer object with text as interlocutor name, guestName: guest name, [firmName: name the company], [lastInterlocutor: name of the last interlocutor]}"})
        }
    }
};
