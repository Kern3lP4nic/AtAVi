/**
 * Created by pily on 27/04/17.
 */
var LogService = require("../../LogService/LogService");
var FirmService = require("./../FirmService/FirmService");

module.exports = {
    id: 3,
    executeAction: function (sessionAttributes, callback) {

        //Valid parameter object
        if (sessionAttributes.hasOwnProperty("firmName") && sessionAttributes.hasOwnProperty("sessionId")) {

            FirmService.exsistsFirm(sessionAttributes.firmName, function (err, data) {
                if (!err && !data.hasOwnProperty("name")) {
                    FirmService.insertFirm({"name": sessionAttributes.firmName, "guests": []}, function (err) {
                        if (err) {
                            console.error("Error in insertFirm: ", err);
                        }
                    });
                }
            });

            LogService.logFirm(sessionAttributes.sessionId, sessionAttributes.firmName, function (err) {
                if (err) {
                    console.error("Error in logFirm: ", err);
                }
            });

            callback(null, {ok: true, info: "Firm logged"});

        } else {
            console.error("Error in action " + module.exports.id + " - Invalid parameters: use {firmName: name of the firm, sessionId: sessionId of the session}");
            callback({Error: "Invalid parameters: use {firmName: name of the firm, sessionId: sessionId of the session}"})
        }
    }
};