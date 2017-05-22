/**
 * Created by pily on 24/03/17.
 */
'use strict';
var requiredir = require("require-dir");
var ActionsModules = requiredir("./QuestionActionsModules");

module.exports = {
   runAction: function (actionID, actionParameters, callback) {

      var resultCheckActionID = module.exports.checkActionID(actionID);
      if (resultCheckActionID.hasOwnProperty("Error")) {
         callback(resultCheckActionID);
      } else {
         var resultGetActionFromID = getActionFromID(actionID);
         if (!resultGetActionFromID.hasOwnProperty("Error")) {
            ActionsModules[resultGetActionFromID.info].executeAction(actionParameters, function (err, result) {
               if (!err) {
                  callback(null, result);
               } else {
                  callback(err);
               }
            });
         } else {
            callback(resultGetActionFromID);
         }
      }
   },

   /** Checks if the action id passed is valid and associated with a valid questionAction
    * @param questionActionID
    * @returns {boolean}
    */
   checkActionID: function (questionActionID) {
      var result = getActionFromID(questionActionID);
      return (!result.hasOwnProperty("Error"));
   }
};

var getActionFromID = function (actionID) {
   if (actionID === null) {
      return {Error: "The action ID passed is null", TypeError: "InvalidActionID"};
   }
   if (actionID < 0) {
      return {Error: "The action ID passed is negative", TypeError: "InvalidActionID"};
   }

   var result;
   Object.keys(ActionsModules).forEach(function (moduleName) {
      if (ActionsModules[moduleName].id === actionID) {
         result = moduleName;
      }
   });

   if (result) {
      return {info: result};
   } else {
      return {Error: "The action ID passed is not associated with any action", TypeError: "InvalidActionID"};
   }
};