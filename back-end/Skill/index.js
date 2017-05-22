"use strict";
var Alexa = require("alexa-app");                  //Alexa call wrapper

module.change_code = 1;                            //Allow code hotswap

var LambdaSkill = require("./LambdaSkill/Main");
var app = new Alexa.app("assistant");              //Creates new istance of the wrapper
app.persistentSession = true;                      //Set session persistance on
app.id = require("./package.json").alexa.applicationId;

//Default error message showed to user
const defaultErrorMessage = "The system is not working properly, please contact the administrator.";

const sessionNotAvailableErrorMessage = "This application needs session support to work properly.";

/*** Intent launched when the skill is launched without utterances
 */
app.launch(function (request, response) {
    //Check for session support
    if (request.hasSession()) {
        //Get the current session
        var session = request.getSession();
        //Clear the session
        session.clear();
        //Get the sessionId
        var sessionId = session.sessionId;


        console.error("SESSION ID: " + sessionId);


        //Get session attributes
        var sessionAttributes = session.getAttributes();

        //Call of LambdaSkill main
        return new Promise(function (resolve, reject) {
            LambdaSkill.main(null, sessionId, sessionAttributes, function (err, data) {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        }).then(function (dat) {
            //Set response
            response.say(dat.text).reprompt(dat.repeatText).shouldEndSession(false);
            //Update session data
            for (var key in dat.session) {
                if (dat.session.hasOwnProperty(key)) {
                    session.set(key, dat.session[key]);
                }
            }
            return response;
        }).catch(function (err) {
            //Some error occurred
            console.error("Some error occurred in FlowModule:", err);
            return response.say(defaultErrorMessage).shouldEndSession(true).send();
        });

    } else {
        //No session available
        console.error(sessionNotAvailableErrorMessage);
        return response.say(sessionNotAvailableErrorMessage).shouldEndSession(true).send();
    }
});

/*** Intent launched when the skill is launched with valid utterances
 */
app.intent("RootIntent",
    {
        "slots": {
            "Text": "AMAZON.LITERAL"
        },
        "utterances": ['{-|Text}']
    }, function (request, response) {
        //Check for session support
        if (request.hasSession()) {
            //Get the current session
            var session = request.getSession();
            //Get the sessionId
            var sessionId = session.sessionId;
            //Get session attributes
            var sessionAttributes = session.getAttributes();
            //Get text understood by Alexa in slot Text
            var text = request.slot("Text");

            //Call of LambdaSkill main
            return new Promise(function (resolve, reject) {
                LambdaSkill.main(text, sessionId, sessionAttributes, function (err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            }).then(function (dat) {
                //Add response text to response object
                response.say(dat.text);

                //Apply new session objects to session
                for (var key in dat.session) {
                    if (dat.session.hasOwnProperty(key)) {
                        session.set(key, dat.session[key]);
                    }
                }

                //Add reprompt text if present
                if (dat.hasOwnProperty("repeatText")) {
                    response.reprompt(dat.repeatText);
                }

                //Set should end session according to data passed
                if (dat.hasOwnProperty("shouldEndSession") && dat.shouldEndSession === true) {
                    response.shouldEndSession(dat.shouldEndSession);
                } else {
                    response.shouldEndSession(false);
                }

                //Return the response object
                return response;
            }).catch(function (err) {
                //Some error occured
                console.error("Some error occurred in FlowModule:", err);
                return response.say(defaultErrorMessage).shouldEndSession(true).send();
            });

        } else {
            //No session available
            console.error(sessionNotAvailableErrorMessage);
            return response.say(sessionNotAvailableErrorMessage).shouldEndSession(true).send();
        }
    }
);

/*** Intent launched when the skill session is terminated
 */
app.sessionEnded(function (request, response) {
    return response.say("Thank you for your patience. One of our employee will come to you in a minute.").shouldEndSession(true);
});

//Hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function () {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

//Exports of the app instance
module.exports = app;
