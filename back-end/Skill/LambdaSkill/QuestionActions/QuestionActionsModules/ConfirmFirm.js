/**
 * Created by pily on 11/05/17.
 */

/*
 * Ask the user if the name he entered is right
 * */

module.exports = {
    id: 11,
    executeAction: function (sessionAttributes, callback) {
        if (sessionAttributes.hasOwnProperty("lastQuestion") && sessionAttributes.hasOwnProperty("firmName")) {

            //Change text
            var questionText = sessionAttributes.lastQuestion.baseText;
            var repeatQuestionText = sessionAttributes.lastQuestion.recurrentText;

            if (!questionText.match(/\s$/)) {
                questionText = questionText + " ";
            }

            if (!repeatQuestionText.match(/\s$/)) {
                repeatQuestionText = repeatQuestionText + " ";
            }

            if (sessionAttributes.firmName !== "") {
                //Company
                sessionAttributes.lastQuestion.baseText = questionText + sessionAttributes.firmName + "?";
                sessionAttributes.lastQuestion.recurrentText = repeatQuestionText + sessionAttributes.firmName + "?";
            } else {
                //Private firm
                sessionAttributes.lastQuestion.baseText = "Are you a private?";
                sessionAttributes.lastQuestion.recurrentText = "Are you a private?";
            }

            callback(null, sessionAttributes.lastQuestion);
        } else {
            console.error("Error in questionAction " + module.exports.id + " - Invalid parameters passed: use {lastQuestion: question object with baseText}");
            callback({"Error": "Invalid parameters passed: use {lastQuestion: question object with baseText, firmName: name of the firm}"});
        }
    }
};