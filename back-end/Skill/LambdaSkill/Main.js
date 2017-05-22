/**
 * Created by pily on 28/03/17.
 */
var FlowModule = require("./FlowModule/FlowModule");
module.exports = {
   /*** Main function of AtAVi IA
    * @param textAnswer text of the answer to the last question
    * @param sessionId sessionID of the session
    * @param session    session object, is kept during the whole session and used to get parameters
    * @param callback   callback
    */
   main: function (textAnswer, sessionId, session, callback) {
      FlowModule.routine(textAnswer, sessionId, session, function (err, questionText) {
         if (err) {
            callback(err);
         } else {
            callback(null, questionText);
         }
      });
   }
};