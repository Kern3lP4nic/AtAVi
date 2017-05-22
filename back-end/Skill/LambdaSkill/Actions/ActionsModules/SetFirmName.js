/**
 * Created by pily on 11/05/17.
 */

module.exports = {
    id: 12,
    executeAction: function (sessionAttributes, callback) {

        if (sessionAttributes.hasOwnProperty("lastAnswer")) {

            if (sessionAttributes.lastAnswer.text.toLowerCase() === "no") {
                sessionAttributes.firmName = "";
            } else {
                sessionAttributes.firmName = sessionAttributes.lastAnswer.text;
            }

            console.log("SESSION ATTRIBUTES INSIDE ACTION", sessionAttributes);

            callback(null, {"ok": true, info: "firmName set"})

        } else {
            console.error("Error in questionAction " + module.exports.id + " - Invalid parameters passed: use {lastQuestion: question object with baseText}");
            callback({"Error": "Invalid parameters passed: use {lastQuestion: question object with baseText}"});
        }
    }
};