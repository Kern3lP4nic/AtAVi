/**
 * Created by pily on 03/05/17.
 */

var FirmService = require("../../FirmService/FirmService");
var LogService = require("../../LogService/LogService");
module.exports = {
    id: 6,
    executeAction: function (sessionAttributes, callback) {

        if (sessionAttributes.hasOwnProperty("lastQuestion") && sessionAttributes.lastQuestion.hasOwnProperty("baseText") && sessionAttributes.hasOwnProperty("firmName")) {

            if (sessionAttributes.hasOwnProperty("skipRecentGuest") && sessionAttributes.skipRecentGuest === true) {
                sessionAttributes.skipRecentGuest = false;
                callback(null, sessionAttributes.lastQuestion);
            } else {

                if (sessionAttributes.firmName !== "") {

                    LogService.getRecentGuest(sessionAttributes.firmName, sessionAttributes.sessionId, function (err, guestName) {

                        if (!err && guestName !== null) {
                            if (sessionAttributes.hasOwnProperty("invalidAnswerIdentifiesGuest") && sessionAttributes.invalidAnswerIdentifiesGuest === true) {
                                //Wrong answer last time
                                sessionAttributes.lastQuestion.baseText = "I couldn't understand your answer. Are you " + guestName + "? Answer with <emphasis lvel='strong'>yes</emphasis> or <emphasis level='strong'>no</emphasis>.";
                                sessionAttributes.invalidAnswerIdentifiesGuest = false;
                            } else {
                                //Normal flow
                                sessionAttributes.lastQuestion.baseText = "Are you " + guestName + "?";
                                sessionAttributes.lastQuestion.recurrentText = "I couldn't understand what you said. Answer yes or no.";
                            }

                            sessionAttributes.possibleGuestName = guestName;
                            callback(null, sessionAttributes.lastQuestion);
                        } else if (err) {
                            console.error("Error in exsistsGuest: ", err);
                            callback(null, sessionAttributes.lastQuestion);
                        } else {
                            callback(null, sessionAttributes.lastQuestion);
                        }
                    });
                } else {
                    //Case private guest
                    callback(null, sessionAttributes.lastQuestion);
                }
            }

        } else {
            console.error("Error in questionAction " + module.exports.id + " - Invalid parameters passed: use {lastQuestion: question object with baseText, firmName: name of the firm}");
            callback({"Error": "Invalid parameters passed: use {lastQuestion: question object with baseText, firmName: name of the firm}"});
        }
    }
};