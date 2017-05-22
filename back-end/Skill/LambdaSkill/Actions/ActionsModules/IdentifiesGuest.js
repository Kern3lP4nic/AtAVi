/**
 * Created by pily on 27/04/17.
 */
var LogService = require("../../LogService/LogService");
var FirmService = require("../../FirmService/FirmService");

module.exports = {
    id: 4,
    executeAction: function (sessionAttributes, callback) {

        if (sessionAttributes.hasOwnProperty("lastAnswer") && sessionAttributes.lastAnswer.hasOwnProperty("text") && sessionAttributes.hasOwnProperty("sessionId") && sessionAttributes.hasOwnProperty("firmName")) {

            if (sessionAttributes.hasOwnProperty("possibleGuestName") && sessionAttributes.possibleGuestName !== null) {
                //Possible guest interaction
                if (sessionAttributes.lastAnswer.text === "yes") {
                    //Right possible guest

                    sessionAttributes.guestName = sessionAttributes.possibleGuestName;

                    LogService.logGuest(sessionAttributes.sessionId, sessionAttributes.guestName, function (err) {
                        if (err) {
                            console.error("Error in logGuest: ", err);
                        }
                    });

                    FirmService.exsistsGuest(sessionAttributes.guestName, function (err, data) {
                        if (!err && !data.hasOwnProperty("nameg")) {
                            FirmService.addGuest(sessionAttributes.firmName,
                                {"nameg": sessionAttributes.guestName}, function (err) {
                                    if (err) {
                                        console.error("Error in addGuest: ", err);
                                    }
                                });
                        } else {
                            console.error("Error in exsistsGuest:", err);
                        }
                    });

                    callback(null, {ok: true, info: "Guest logged"});

                } else if(sessionAttributes.lastAnswer.text === "no") {
                    //Wrong possible guest
                    sessionAttributes.lastAnswer.id_nextQuestion = sessionAttributes.lastQuestion.id;
                    sessionAttributes.skipRecentGuest = true;
                    sessionAttributes.possibleGuestName = null;
                    callback(null, {ok: true, info: "Guest not default"});
                } else {
                    //Not valid answer
                    sessionAttributes.lastAnswer.id_nextQuestion = sessionAttributes.lastQuestion.id;
                    sessionAttributes.invalidAnswerIdentifiesGuest = true;
                }

            } else {
                //Default interaction

                sessionAttributes.guestName = sessionAttributes.lastAnswer.text;

                LogService.logGuest(sessionAttributes.sessionId, sessionAttributes.guestName, function (err) {
                    if (err) {
                        console.error("Error in logGuest: ", err);
                    }
                });

                FirmService.addGuest(sessionAttributes.firmName, {"nameg": sessionAttributes.guestName}, function (err) {
                    if (err) {
                        console.error("Error in addGuest: ", err);
                    }
                });

                callback(null, {ok: true, info: "Guest logged"});

            }

        }

    }
};