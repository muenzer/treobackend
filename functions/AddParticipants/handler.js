var lib = require('../lib');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();    

module.exports.handler = function(event, context, cb) {
	'use strict';

	event.Date = Date.parse(event.Date);
	var object = lib.registration.parseNewRegistration(event);

	//add to database
	lib.aws.addItem(dynamodb, 'Participants', object, cb);

	//generate email
	var data = lib.mail.createMailData(object);
	data.attr.MESSAGE = "Thank you for registering for";
	lib.mail.sendMailTemplate(data, cb);

	var reg = lib.mail.createRegistrationMail(object);
	lib.mail.sendMail(reg, cb);

  return cb(null, {
    message: 'Processed new registration: ' + object.Name
  });
};
