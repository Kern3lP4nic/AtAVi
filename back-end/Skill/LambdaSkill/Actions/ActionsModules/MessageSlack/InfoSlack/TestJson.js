var Ajv = require('ajv'); 
ajv = new Ajv( {allErrors: true})
module.exports = {
    test: function (schema,obj) {   
        var validate = ajv.compile(schema)
        var valid = validate(obj);
        if(!valid){
            var array=[];
            for (var i = 0; i < validate.errors.length; i++) { array.push(validate.errors[i].dataPath); }
            return {"valid":false,"errors":array};
        }
        return {"valid":true};
        
    }
}