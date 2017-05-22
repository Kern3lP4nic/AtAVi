'use strict';
var TextMatch = require("../TextMatch/TextMatch");
var Actions = require("../Actions/Actions");
var QuestionActions = require("../QuestionActions/QuestionActions");
var QuestionService = require("../QuestionService/QuestionService");
var LogService = require("../LogService/LogService");

const askFirmNameQuestion = {"baseText": "What company do you work for?"};
const askGuestNameQuestion = {"baseText": "Can I ask your nominative?"};
const invalidFirmNameText = "The name you told me seems invalid. Can you say that again, please?";
const invalidGuestNameText = "The name you told me seems invalid. Can you say that again, please?";
const invalidDynamicAnswer = "I could not understand your answer.";
const errorObject = {Error: "No question composed", TypeError: "FlowModuleError"};

module.exports = {

    /*** Main routine function
     * @param textAnswer Text of the answer from the user
     * @param sessionId Session ID of the current session
     * @param sessionAttributes Object containing information about the session
     * @param callback callback
     */
    routine: function (textAnswer, sessionId, sessionAttributes, callback) {

        //Executed after waiting for the question data. sessionAttributes.lastQuestion contains the correct question.
        var questionFetch = function () {

            //COMPOSE
            module.exports.composeNextQuestion(sessionAttributes, sessionAttributes.lastQuestion, function (err, question) {

                /*//Log question without answer
                 module.exports.logAnswerOnDB(sessionId, sessionAttributes, question, null, function (err, data) {
                 if (err) {
                 console.error("Error in logAnswerOnDB: " + err);
                 }
                 });*/

                callback(null, {
                    "text": question.baseText,
                    "repeatText": question.recurrentText,
                    "session": sessionAttributes
                });
            });
        };

        //Check if sessionAttributes contains a lastQuestion
        if (!sessionAttributes.hasOwnProperty("lastQuestion")) {
            //No lastQuestion -> first interaction with the user

            //Save sessionId to session
            sessionAttributes.sessionId = sessionId;

            var prom = new Promise(function (resolve, reject) {
                module.exports.getFirstQuestion(function (err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            }).then(function (question) {
                console.log(question);
                //Save question to lastQuestion in session
                sessionAttributes.lastQuestion = question;
                questionFetch();

            }).catch(function (err) {
                console.error("Error in getFirstQuestion:", err);
                callback(err);
            });

        } else {
            //Session contains lastQuestion -> not first interaction

            //Found a matching answer
            var answer = module.exports.matchPossibleAnswers(textAnswer, sessionAttributes.lastQuestion);

            sessionAttributes.lastAnswer = answer;

            if (!answer.hasOwnProperty("Error")) {

                module.exports.logAnswerOnDB(sessionId, sessionAttributes, sessionAttributes.lastQuestion, answer, function (err) {
                    if (err) {
                        console.error("Error in logAnswerOnDB: " + err);
                    }
                });

                console.log("ACTIONS OF THE ANSWER:", answer.actions);

                //Call all actions of that answer
                for (var i = 0; i < answer.actions.length; ++i) {

                    console.log("SESSION BEFORE ANY ACTION");
                    console.log("SESSION", sessionAttributes);
                    console.log("ACTION", answer.actions[i]);
                    console.log("CALLING ACTION " + answer.actions[i].id_action);


                    module.exports.callAction(answer.actions[i].id_action, sessionAttributes, function (err, data) {
                        console.log("SESSION", sessionAttributes);
                        console.log("DAT", data);
                        console.log("ERR", err);

                        if (err) {
                            console.error("Error in action: " + err);
                        }
                    });
                }

                //Check for next question
                if (answer.hasOwnProperty("id_nextQuestion") && answer.id_nextQuestion >= 0) {
                    var prom2 = new Promise(function (response, reject) {
                        module.exports.getLastQuestion(answer, sessionAttributes, function (err, data) {
                            if (!err) {
                                response(data);
                            } else {
                                reject(err);
                            }
                        });
                    }).then(function (data) {
                        sessionAttributes.lastQuestion = data;
                        questionFetch();

                    }).catch(function (err) {
                        console.error("Error in getLastQuestion: " + err);
                        callback(err);
                    });
                }
                else {
                    //Is answer to last question
                    callback(null, {
                        "text": "Thank you for your patience. One of our employees will come to you in a minute.",
                        "session": {},
                        "shouldEndSession": true
                    });
                }

            } else {
                console.error("Error in matchPossibleAnswers:", answer);
                callback(null, {
                    "text": sessionAttributes.lastQuestion.recurrentText,
                    "repeatText": sessionAttributes.lastQuestion.recurrentText,
                    "session": sessionAttributes
                })
                // callback(answer);
            }
        }


    },

    /*** Returns in callback the last question asked by the AV to the guest
     * @param answer answer
     * @param sessionAttributes contains info about the session
     * @param callback callback
     */
    getLastQuestion: function (answer, sessionAttributes, callback) {
        QuestionService.getNextQuestion(answer.id_nextQuestion, function (err, data) {
            if (!err && data !== {}) {
                callback(null, data);
            } else {
                console.error("Error in getNextQuestion:", err);
                callback({"Error": "Error in getNextQuestion", "ok": false});
            }
        });
    },

    /*** Returns in callback the first question the AV should ask to the guest
     * @param callback callback
     */
    getFirstQuestion: function (callback) {
        QuestionService.getFirstQuestion(function (err, data) {
            if (!err) {
                callback(null, data[0]);
            } else {
                callback(err);
            }
        });
    },

    /*** Returns the nearest answer using TextMatch method
     * @param receivedAnswerText
     * @param questionAsked
     */
    matchPossibleAnswers: function (receivedAnswerText, questionAsked) {
        if (receivedAnswerText === null || receivedAnswerText === undefined || receivedAnswerText.length === 0) {
            return {Error: "Invalid text passed", TypeError: "InvalidTextPassed"};
        }
        if (questionAsked === null || questionAsked.answers === undefined || questionAsked.answers === null || questionAsked.answers.length === 0) {
            return {Error: "Invalid question passed", TypeError: "InvalidQuestionPassed"};
        }

        //Return answer if answer contains null text, it's the case I want all the text of the answer
        for (var i = 0; i < questionAsked.answers.length; ++i) {
            if (questionAsked.answers[i].text === null) {
                var result = questionAsked.answers[i];
                result.text = receivedAnswerText;
                return result;
            }
        }

        var possibleAnswersTexts = questionAsked.answers.map(function (a) {
            return a.text
        });

        var matchResult = TextMatch.matchText(receivedAnswerText, possibleAnswersTexts);

        if (matchResult.hasOwnProperty("Error")) {
            return matchResult;
        }

        var answerMatched = questionAsked.answers.find(function (a) {
            return a.text === matchResult.info;
        });

        return answerMatched;
    },

    /*** Returns in callback the string to send to AVS to make the AV speak to the guest
     * @param sessionAttributes information about session
     * @param question question to ask
     * @param callback
     */
    composeNextQuestion: function (sessionAttributes, question, callback) {

        if (question.hasOwnProperty("questionAction") && question.questionAction >= 0) {

            //Call to callQuestionAction
            console.log("CALLING QUESTION ACTION: " + question.questionAction);

            module.exports.callQuestionAction(question.questionAction, sessionAttributes, function (err, data) {
                if (!err) {
                    sessionAttributes.lastQuestion = data;
                    callback(null, data);
                } else {
                    console.error("Error in callQuestionAction:" + err);
                }
            });

        } else {
            callback(null, question)
        }

    },

    /*** Executes the action passed
     * @param actionId action to executeAction
     * @param actionParameters parameter passed to the action called
     * @param callback callback
     */
    callAction: function (actionId, actionParameters, callback) {

        if (Actions.checkActionID(actionId)) {

            Actions.runAction(actionId, actionParameters, function (err, data) {

                if (err) {
                    callback(err);
                }
                else {
                    callback(null, data);
                }
            });
        } else {
            console.error("callAction: invalid actionId passed: ", actionId);
        }
    },

    /** Executes the questionAction passed
     * @param questionActionId
     * @param actionParameters
     * @param callback
     */
    callQuestionAction: function (questionActionId, actionParameters, callback) {
        if (QuestionActions.checkActionID(questionActionId)) {
            QuestionActions.runAction(questionActionId, actionParameters, function (err, data) {
                if (!err) {
                    callback(null, data);
                } else {
                    callback(err);
                }
            });
        } else {
            console.error("callQuestionAction: invalid questionActionId passed: ", questionActionId);
        }
    },

    /*** Logs on the DB the question asked and the answer given
     * @param sessionId session ID of the conversation
     * @param sessionAttributes information about the session
     * @param question question string
     * @param answer answer string
     * @param callback callback
     */
    logAnswerOnDB: function (sessionId, sessionAttributes, question, answer, callback) {
        LogService.doLogAnswer(new Date().toTimeString(), sessionId, question, answer, function (err) {
            if (!err) {
                if (callback) {
                    callback(null, {ok: true, info: "Answer logged"});
                }
            } else {
                console.error("ERROR in doLogAnswer:", err);
                if (callback) {
                    callback({ok: false, "error": err});
                }
            }
        });
    }
};


