'use strict';

const adminService = require("./adminservice/AdminService");
const authService = require("./authservice/AuthService");

exports.handler = (event, context, callback) => {
   
   const done = function (err, res){
        var rect={
            Error:"",
            TypeError:"",
            Object:null
        };
        if(err){
            rect.Error=err.Error;
            rect.TypeError=err.TypeError;
        }else
            rect.Object=res;

        callback(null, {
            statusCode: err ? '400' : '200',
            body: JSON.stringify(rect),
            headers: {
                'Access-Control-Allow-Headers': 'token', 
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'
            }

        });
    };

    switch (event.httpMethod) { //event.httpMethod
        case 'GET':
            switch(event.resource){
                case '/ManageAuth/SendEmail':
                        if(event.queryStringParameters.hasOwnProperty("username"))
                            authService.sendEmail(event.queryStringParameters.username, done);
                        else
                            done({Error:"invalid username",TypeError:"queryStringValidate"},null);
                    break;
                case '/ManageAuth/Authentication':
                    if(event.headers.hasOwnProperty("token")){
                        authService.verifyLogin(event.headers.token, done);
                    }
                    else
                        done({Error:"invalid token",TypeError:"invalidToken"},null);
                    break;
                
                default:
                    done({Error:"unexist resource",TypeError:"unexist resource"},null);
                    break;
            }
            break;
        case 'POST':
                var body = JSON.parse(event.body);
                //login // valid schema
                var check = adminService.validateUpdate(body);
                if(check.valid)
                    authService.login(body.username, body.password,done);
                else
                    done({Error:check.errors,TypeError:"data not valid"},null);
            break;
        case 'PUT':
            switch(event.resource){
                    case '/ManageAuth/SendEmail':
                        var body = JSON.parse(event.body);
                        if(body.hasOwnProperty("recoveryToken") && body.hasOwnProperty("password"))
                            authService.passwordRecoveryToken(body.recoveryToken, body.password, done);
                        else
                            done({Error:"missed recoveryToken or password", TypeError:"bodyValidateException"},null);
                    break;
                case '/ManageAuth/Authentication':
                    if(!event.headers.hasOwnProperty("token"))
                        done({Error:"invalid token",TypeError:"invalidToken"},null);
                    authService.verifyLogin(event.headers.token, function(err,res){
                        var body = JSON.parse(event.body);
                        //modifica del proprio account
                        // valid schema, token ok and username is equal

                        var check = adminService.validateUpdate(body);
                        if(!err && check.valid && (res.username==body.username))
                            adminService.updateAdmin(body,done);
                        else
                            done({Error:check.errors,TypeError:"admin data not valid"},null);
                    });
                break;
            }
        break;
        case 'DELETE': 
            if(event.headers.hasOwnProperty("token")){
                 authService.verifyLogin(event.headers.token, function(err,res){
                    if(!err)
                        authService.logout(event.headers.token,res.username,done);
                    else
                        done({Error:"no valid token or username",TypeError:"tokenNotValid"},null);
                });
            }else
                done({Error:"invalid token",TypeError:"invalidToken"},null);
            break;
        default:
            done({Error:"unexist resource",TypeError:"unexist resource"},null);
            break;
    }
};
