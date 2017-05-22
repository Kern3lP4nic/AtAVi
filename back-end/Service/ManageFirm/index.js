'use strict';

const firmService = require("./firmservice/FirmService.js");
const adminService = require("./authservice/AuthService.js");

exports.handler = (event, context, callback) =;> {
   
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

    const action =function(err,res){ // se c'è stato un'errore è dato da verify login e quindi è un problema di accesso
        if (err)
            done(err,null);
            //quà dovrebbe fermarsi
        switch (event.httpMethod) {
            case 'GET':
                switch(event.resource){
                    case '/ManageFirm/Firm': //success return api trame with obj= []
                        firmService.getFirms(done);
                        break;

                   /* case '/ManageFirm/Conversation': // if success return api trame with obj null
                        if(event.queryStringParameters.hasOwnProperty("firm") && event.queryStringParameters.hasOwnProperty("guest"))
                            firmService.getGuestConversation(event.queryStringParameters.firm,event.queryStringParameters.guest,done);
                        else
                            done({Error:"missing properties",TypeError:"missing properties"},null);
                        break;*/

                     case '/ManageFirm/Conversation': // if success return api trame with obj null
                            /*firmService.getGuestConversation(done);
                        break;*/
                        if(event.queryStringParameters.hasOwnProperty("firm") && event.queryStringParameters.hasOwnProperty("guest"))
                            firmService.getGuestConversation(event.queryStringParameters.firm,event.queryStringParameters.guest,done);
                        else
                            done({Error:"missing properties",TypeError:"missing properties"},null);
                        break;

                    default:
                        done({Error:"unexist resource",TypeError:"unexist resource"},null);
                        break;
                }
                break;
            case 'PUT': // if success return api trame with obj null
                var body = JSON.parse(event.body);
                var check = firmService.validateFirm(body);
                if(check.valid){
                    firmService.updateFirm(body,done);
                }else
                    done({Error:check.errors,TypeError:"firm data not valid"},null);
                break;
            default:
                done({Error:"unexist resource",TypeError:"unexist resource"},null);
                break;
        }

    };
    if(event.headers.hasOwnProperty('token'))
        adminService.verifyLogin(event.headers.token,action);
    else
        done({Error:"missed token", TypeError:"Invalid header"},null);
}
