/**
 * Created by pily on 24/03/17.
 */
'use strict';
var requiredir = require("require-dir");
var ActionsModules = requiredir("./ActionsModules");

module.exports = {
   runAction: function (actionID, actionParameters, callback) {

      var resultCheckActionID = module.exports.checkActionID(actionID);
      if (resultCheckActionID.hasOwnProperty("Error")) {
         callback(resultCheckActionID);
      } else {
         var resultGetActionFromID = getActionFromID(actionID);
         if (resultGetActionFromID.hasOwnProperty("Error")) {
            callback(resultGetActionFromID);
         } else {
            ActionsModules[resultGetActionFromID.info].executeAction(actionParameters, function (err, result) {
               if (err) {
                  callback(err);
               } else {
                  callback(null, result);
               }
            });
         }
      }
   },
   checkActionID: function (actionID) {
      var result = getActionFromID(actionID);
      return !(result.hasOwnProperty("Error") && result.ok === true);
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