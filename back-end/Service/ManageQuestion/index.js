'use strict';

const questionService = require("./questionservice/QuestionService");
const adminService = require("./authservice/AuthService");

exports.handler = (event, context, callback) => {
   
   const done = function (err, res ) {
        var rect = {
            Error:"",
            TypeError:"",
            Object:null
        };
        if(err) {
            rect.Error = err.Error;
            rect.TypeError = err.TypeError;
        } else
            rect.Object = res;

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

    const action = function(err,res) {
        if (err)
            done(err,null);
        switch (event.httpMethod) {
            case 'GET':
                switch(event.resource) {
                    case '/ManageQuestions/Actions':
                        questionService.getActions(done);
                    break;

                    case '/ManageQuestions/Questions':
                        questionService.getQuestions(done);
                    break;

                    default:
                        done({Error:"unexist resource", TypeError:"unexist resource"}, null);
                    break;
                }
            break;

            case 'POST':
                var body = JSON.parse(event.body);
                switch(event.resource) {
                    case '/ManageQuestions/Actions':
                        var check = questionService.validateAction(body);
                        if(check.valid){
                            questionService.addAction(body, done);
                        } else
                            done({Error:check.errors,TypeError:"data not valid"},null);
                    break;

                    case '/ManageQuestions/Questions':
                        var check = questionService.validateQuestion(body);
                        if(check.valid){
                            questionService.addQuestion(body, done);
                        } else
                            done({Error:check.errors,TypeError:"data not valid"},null);
                    break;

                    default:
                        done({Error:"unexist resource", TypeError:"unexist resource"}, null);
                    break;
                }

                
            break;

            case 'PUT':
                var body = JSON.parse(event.body);
                var check = questionService.validateQuestion(body);
                if(check.valid){
                    questionService.updateQuestion(body, done);
                } else
                    done({Error:check.errors,TypeError:"data not valid"},null);
                
                break;

            case 'DELETE':
                var body = JSON.parse(event.body);
                switch(event.resource) {
                    case '/ManageQuestions/Actions':
                        var check = questionService.validateAction(body);
                        if(check.valid){
                            questionService.deleteAction(body, done);
                        } else
                            done({Error:check.errors,TypeError:"data not valid"},null);
                        
                    break;

                    case '/ManageQuestions/Questions':
                        var check = questionService.validateQuestion(body);
                        if(check.valid){
                            questionService.deleteQuestion(body, done);
                        } else
                            done({Error:check.errors,TypeError:"data not valid"},null);
                        
                    break;

                    default:
                        done({Error:"unexist resource", TypeError:"unexist resource"}, null);
                    break;
                }

            break;

            default:
                done({Error:"unexist resource",TypeError:"unexist resource"},null);
            break;

        }

    }

    if(event.headers.hasOwnProperty('token'))
        adminService.verifyLogin(event.headers.token,action);
    else
        done({Error:"missed token", TypeError:"Invalid header"},null);
};
