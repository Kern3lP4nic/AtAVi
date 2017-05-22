/**
 * Created by pily on 08/05/17.
 */
module.exports = {
    id: 10,
    executeAction: function (sessionAttributes, callback) {
        var question = sessionAttributes.lastQuestion;

        if (sessionAttributes.hasOwnProperty("joke") && sessionAttributes.joke !== null) {
            var joke = sessionAttributes.joke;
            question.baseText = joke + " Would you like to hear another joke?";
            question.recurrentText = "I couldn't understand your answer, would you like to hear another joke? Answer yes or no.";
            sessionAttributes.joke = null;
        }

        callback(null, question);
    }
};