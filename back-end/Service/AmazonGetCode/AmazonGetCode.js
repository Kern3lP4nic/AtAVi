'use strict';

var AWS = require("aws-sdk");
AWS.config.update({region: 'us-west-1'});

var https = require("https");
var querystring = require("querystring");

var config = require("./config.json");

exports.handler = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var params = event.queryStringParameters;
    console.log(params);

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: { 
            'Access-Control-Allow-Headers': 'token', 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json' 
        }
    });

    switch (event.httpMethod) {
        case 'GET':
            var data = querystring.stringify({
                grant_type      : 'authorization_code',
                code            : params.code,
                client_id       : 'amzn1.application-oa2-client.1b4d3df586e24fbf8a9085facee73fb2',
                client_secret   : '69cac8afaf5a9f1f94316a7856a779f35adf28092fa19c9c577457965c70f9e2',
                redirect_uri    : 'http://localhost:4200/guest'
            });

            var options = {
                hostname: "api.amazon.com",
                port: 443,
                path: "/auth/o2/token",
                method: "POST",
                headers: {
                    'Content-Type'  : 'application/x-www-form-urlencoded'
                }
            };

            var request = https.request(options, (res) => {
                res.on('data', (d) => {
                    var result = JSON.parse(d);
                    done(false, result);
                });
            }).on('error', (e) => {
                console.error(e);
            });
            request.write(data);
            request.end();

            break;
        default:
            done(new Error('Unsupported method "${JSON.stringify(event)}"'));
    }   
};