/**
 * Created by pily on 08/05/17.
 */
var LogService = require("../../LogService/LogService");

module.exports = {
    id: 7,
    executeAction: function (sessionAttributes, callback) {
        if (!sessionAttributes.hasOwnProperty("skipAskForInterlocutor") || sessionAttributes.skipAskForInterlocutor === false) {
            if (sessionAttributes.hasOwnProperty("lastQuestion") && sessionAttributes.lastQuestion.hasOwnProperty("baseText")) {
                var question = sessionAttributes.lastQuestion;

                LogService.getLastInterlocutor(sessionAttributes.guestName, function (err, lastInterlocutor) {
                    if (!err) {
                        if (lastInterlocutor !== null) {
                            question.baseText = "Are you searching for " + lastInterlocutor + " as last time? Answer <emphasis level='strong'>yes</emphasis> or <emphasis level='strong'>no</emphasis>.";
                            question.recurrentText = "I couldn't understand your answer. Are you searching for " + lastInterlocutor + "? Answer yes or no.";
                            sessionAttributes.lastInterlocutor = lastInterlocutor;
                        }
                    } else {
                        console.error("Error in getLastInterlocutor: ", err);
                    }
                    callback(null, question);
                });

            } else {
                console.error("Error in questionAction " + module.exports.id + " - Invalid parameters passed: use {lastQuestion: question object with baseText}");
                callback({"Error": "Invalid parameters passed: use {lastQuestion: question object with baseText}"});
            }
        } else {
            sessionAttributes.skipAskForInterlocutor = false;
            sessionAttributes.lastInterlocutor = null;
            callback(null, sessionAttributes.lastQuestion);
        }
    }
};