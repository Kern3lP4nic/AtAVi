'use strict';

var levenshtein = require("fast-levenshtein");

module.exports = {
   /*** Find the most similar string in an array
    * @param textToMatch
    * @param textsAvailable
    * @returns {_.min|*}
    */
   matchText: function (textToMatch, textsAvailable) {
      if(textToMatch === null){
         return {Error: "Null string passed as textToMatch", TypeError: "InvalidInputString"}
      }

      // Get the distance between @textToMatch and every string in @textsAvailable
      var result = levenshteinOfArray(textToMatch, textsAvailable);

      // Finds the index of the nearest string to @textToMatch
      var bestIndex = result.indexOf(result.reduce(function (a, b, i, result) {
         return Math.min(a, b);
      }));

      // Check if the distance is too high
      if (result[bestIndex] > _maxDistance(textToMatch)) {
         return {Error: "Max string distance exceeded", TypeError: "StringMatchNotFound"};
      }

      // Returns the nearest string
      return {ok: true, info: textsAvailable[bestIndex]};
   }
};

/*** Finds the levenshtein values of an array of strings against one string
 * @param textToMatch string to match against
 * @param textsAvailable array of strings
 */
var levenshteinOfArray = function (textToMatch, textsAvailable) {

   var result = new Array(textsAvailable.length);

   // Get the levenshtein value of each pair
   for (var i = 0; i < textsAvailable.length; ++i) {

      result[i] = levenshtein.get(textToMatch, textsAvailable[i]);
   }

   return result;
};

/*** Calculation of the max distance allowed to match a string
 * @param textToMatch
 * @returns {number} max distance integer
 * @private
 */
var _maxDistance = function (textToMatch) {
   var MULTIPLIER = 0.1;
   return Math.round(textToMatch.length * MULTIPLIER);
};