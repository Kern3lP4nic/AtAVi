'use strict';
const db = require("./DatabaseInteraction/DatabaseInteraction.js");
const table = "firm";
const logTable = "guest_interaction";
// Error during operation

module.exports = {
    /*take timestamp - session id - question - answer -> SFRUTTA UPDATE */
    /* TORNO ULTIMA QUESTION */
    doLogAnswer: function (timestamp, sessionID, questionObj, answerObj, callback) {
        db.update(logTable, {"sessionId": sessionID},
            "SET logg = list_append(if_not_exists(logg, :empty_list) , :val)",
            {":val": [{"timestamp": timestamp, "question": questionObj, "answer": answerObj}], ":empty_list": []},
            callback);
    },
    /**/
    getLastQuestion: function (sessionID, callback) {
        db.read(logTable, {"sessionId": sessionID}, function (err, res) {
            var back = null;
            if (!err) {
                if (Object.keys(res).length === 0) {
                    back = res;
                } else {
                    back = res.logg[res.logg.length - 1].question;
                }
            }
            callback(err, back);
        });
    },
    logGuest: function (sessionID, guest, callback) {
        db.update(logTable, {"sessionId": sessionID},
            "SET guest = :val",
            {":val": guest},
            callback);
    },
    logFirm: function (sessionID, firm, callback) {
        db.update(logTable, {"sessionId": sessionID},
            "SET firm = :val",
            {":val": firm},
            callback);
    },
    logLastInterlocutor: function (sessionID, interlocutor, callback) {
        db.update(logTable, {"sessionId": sessionID},
            "SET interlocutor = :val",
            {":val": interlocutor},
            callback);
    },
    getLastInterlocutor: function (guestName, callback) {//null or string

        db.query(logTable, 1000000, "guest = :val", {":val": guestName}, function (err, res) {
            var back = null;

            if (!err && res.length > 0 && res[0].interlocutor !== undefined) {
                back = res[0].interlocutor;
            }

            callback(err, back);
        });
    },
    getRecentGuest: function (firmName,sessionID,callback){//null or string
        db.query(logTable, 100000, "firm = :val and sessionId <> :val2",{":val": firmName,":val2":sessionID},function(err,res){
            var back = null;

            if (!err && res.length > 0 && res[0].guest !== undefined) {
                back = res[0].guest;
            }

            callback(err, back);
        });
    }
};
