"use strict";
module.change_code = 1;
var LambdaSkill = require("./LambdaSkill/Main");

var session = {};

LambdaSkill.main(null, "TESTFORALL", session, function (err, data) {
    console.log("ERR:", err);
    console.log("DAT:", data);

    LambdaSkill.main("hello", "TESTFORALL", session, function (err, data) {
        console.log("ERR:", err);
        console.log("DAT:", data);

        LambdaSkill.main("Google", "TESTFORALL", session, function (err, data) {
            console.log("ERR:", err);
            console.log("DAT:", data);

            LambdaSkill.main("Filippo", "TESTFORALL", session, function (err, data) {
                console.log("ERR:", err);
                console.log("DAT:", data);

                LambdaSkill.main("no", "TESTFORALL", session, function (err, data) {
                    console.log("ERR:", err);
                    console.log("DAT:", data);

                    LambdaSkill.main("Stefano Dindo", "TESTFORALL", session, function (err, data) {
                        console.log("ERR:", err);
                        console.log("DAT:", data);

                        LambdaSkill.main("yes", "TESTFORALL", session, function (err, data) {
                            console.log("ERR:", err);
                            console.log("DAT:", data);

                            LambdaSkill.main("Some materials", "TESTFORALL", session, function (err, data) {
                                console.log("ERR:", err);
                                console.log("DAT:", data);

                                LambdaSkill.main("yes", "TESTFORALL", session, function (err, data) {
                                    console.log("ERR:", err);
                                    console.log("DAT:", data);

                                    LambdaSkill.main("no", "TESTFORALL", session, function (err, data) {
                                        console.log("ERR:", err);
                                        console.log("DAT:", data);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
