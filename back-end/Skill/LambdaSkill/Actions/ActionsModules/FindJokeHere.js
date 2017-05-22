/**
 * Created by pily on 08/05/17.
 */

const jokes = [
    "Teacher say: Jack, what do you know about the Dead Sea? Jack says: I didn't even know it was ill.",
    "A doctor calls his patient and says: The check you gave me for my bill came back. The patient replied: So did my cold!",
    "The teacher says: “I wish you’d pay a little attention, Victoria. I am paying as little as I can Mrs.Sanders, said Victoria.",
    "What is the longest word in the English language? Smiles.Because there is a mile between its first and last letters!"
];

module.exports = {
    id: 9,
    executeAction: function (sessionAttributes, callback) {

        //Valid parameter object
        if (sessionAttributes.hasOwnProperty("lastQuestion")) {
            sessionAttributes.joke = jokes[Math.floor(Math.random() * jokes.length)];
            // sessionAttributes.joke = jokes[1];
            sessionAttributes.lastAnswer.id_nextQuestion = sessionAttributes.lastQuestion.id;
        } else {
            console.error("Error in action " + module.exports.id + " - Invalid parameters: use {lastQuestion: question object}");
            callback({Error: "Invalid parameters: use {lastQuestion: question object}"})
        }
    }
};