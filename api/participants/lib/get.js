var dynamo = require('./dynamo');

module.exports.respond = function(event, cb) {

  var params = {
    TableName : dynamo.tableName,
    Key: {
      CourseSession: decodeURIComponent(event.params.coursesession),
      EmailAddress: decodeURIComponent(event.params.emailaddress)
    }
  };

  return dynamo.doc.get(params, function(err, data) {
    if (err){
      cb(err);
    }else{
      var item = data.Item;

      cb(err,item);
    }
  });
};