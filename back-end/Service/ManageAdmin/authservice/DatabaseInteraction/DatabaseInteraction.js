var AWS = require("aws-sdk");
var config = require("./Config.json");

AWS.config.update({
   region: "us-east-1",
   endpoint: "https://dynamodb.us-east-1.amazonaws.com",
   accessKeyId: config.accessKeyId,
   secretAccessKey: config.secretAccessKey
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
   insert: function (table, obj, callback) {
      var params = {
         "TableName": table,
         "Item": obj
      };
      docClient.put(params, function (err, data) {
         if (err) {
            callback({Error: err.message, TypeError: err.code}, null);
         } else callback(null, null);
      });

   },

   update: function (table, key, updateExpression, replace, callback) {
      var params = {
         "TableName": table,
         "Key": key,
         "UpdateExpression": updateExpression,
         "ExpressionAttributeValues": replace
      };

      docClient.update(params, function (err, data) {
         if (err) {
            callback({Error: err.message, TypeError: err.code}, null);
         } else callback(null, null);
      });

   },
   conditionUpdate: function (table, key, updateExpression, condition, replace, callback) {
      var params = {
         "TableName": table,
         "Key": key,
         "UpdateExpression": updateExpression,
         "ConditionExpression": condition,
         "ExpressionAttributeValues": replace
      };

      docClient.update(params, function (err, data) {
         if (err) {
            callback({Error: err.message, TypeError: err.code}, null);
         } else callback(null, null);
      });

   },
   //var remove = function(table, key, updateExpr, values){
   remove: function (table, key, callback) {

      var params = {
         "TableName": table,
         "Key": key
      };
      docClient.delete(params, function (err, data) {
         if (err) {
            callback({Error: err.message, TypeError: err.code}, null);
         } else
            callback(null, null);
      });
   },

   read: function (table, key, callback) { // leggo un solo item
      var params = {
         TableName: table,
         Key: key
      };

      docClient.get(params, function (err, data) {
         if (err)
            callback({Error: err.message, TypeError: err.code}, null);
         else if (!err && !data.Item)
            callback(null, {});
         else
            callback(null, data.Item);
      });
   },
   readProp: function (table, key, properties, callback) { // leggo un solo item
      var params = {
         "TableName": table,
         "Key": key,
         "ProjectionExpression": properties
      };

      docClient.get(params, function (err, data) {
         if (err)
            callback({Error: err.message, TypeError: err.code}, null);
         else if (!err && !data.Item)
            callback(null, {});
         else
            callback(null, data.Item);
      });
   },

   queryProp: function (table, properties, filterExpression, expressionAttributeValues, callback) {

      var params = {
         "TableName": table,
         "ProjectionExpression": properties
      };

      if (filterExpression) {
         params.FilterExpression = filterExpression;
         params.ExpressionAttributeValues = expressionAttributeValues;
      }
      docClient.scan(params, function (err, data) {
         if (err) {
            callback({Error: err.message, TypeError: err.code}, null);
         } else
            callback(null, data.Items);
      });
   },

   query: function (table, limit, filterExpression, expressionAttributeValues, callback) {

      var params = {
         "TableName": table
      };

      if (filterExpression) {
         params.FilterExpression = filterExpression;
         params.ExpressionAttributeValues = expressionAttributeValues;
      }
      docClient.scan(params, function (err, data) {
         if (err) {
            callback({Error: err.message, TypeError: err.code}, null);
         } else
            callback(null, data.Items);
      });
   }

};