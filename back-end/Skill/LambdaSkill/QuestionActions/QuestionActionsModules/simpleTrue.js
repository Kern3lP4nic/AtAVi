/**
 * Created by pily on 26/04/17.
 */
/**
 * Created by pily on 24/03/17.
 */

module.exports = {
   id: 2,
   executeAction: function (sessionAttributes, callback) {
      if (sessionAttributes.hasOwnProperty("lastQuestion") && sessionAttributes.lastQuestion.hasOwnProperty("baseText")) {
         var question = sessionAttributes.lastQuestion;
         question.baseText = question.baseText + " Trallallerollerollà";
         callback(null, question);
      } else {
         console.error("Error in questionAction " + module.exports.id + " - Invalid parameters passed: use {lastQuestion: question object with baseText}");
         callback({"Error": "Invalid parameters passed: use {lastQuestion: question object with baseText}"});
      }
   }
};