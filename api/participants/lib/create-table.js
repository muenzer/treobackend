var dynamo = require('./dynamo');

module.exports.respond = function(event, cb) {

  var params = {
    TableName: dynamo.tableName,
    AttributeDefinitions: [
    { "AttributeName": "CourseSession", "AttributeType": "S" },
    { "AttributeName": "EmailAddress", "AttributeType": "S" },
    { "AttributeName": "PaymentStatus", "AttributeType": "S"},
    { "AttributeName": "DueDate", "AttributeType": "N"}
    ],
    KeySchema: [
    { "AttributeName": "CourseSession", "KeyType": "HASH" },
    { "AttributeName": "EmailAddress", "KeyType": "RANGE" }  
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    "GlobalSecondaryIndexes": [
    {    
      "IndexName": "PaymentStatus",
      "KeySchema": [
      { "AttributeName": "PaymentStatus", "KeyType": "HASH"}, 
      { "AttributeName": "DueDate", "KeyType": "RANGE" } 

      ],
      "Projection": {
        "ProjectionType": "ALL"
      },
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,"WriteCapacityUnits": 1
      }
    }
    ]
  };

  return dynamo.raw.createTable(params, cb);

};