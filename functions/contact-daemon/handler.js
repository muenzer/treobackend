var mail = require('./mail.js');
var dateFormat = require('dateformat');

module.exports.handler = function(event, context, cb) {
	'use strict';
	//console.log(JSON.stringify(event));

	var object = {};
	var newImage = {};
	var emailData = {};

	event.Records.forEach(function(record) {
		newImage = record.dynamodb.NewImage;

		switch(record.eventName) {
			case "INSERT":
				var data = mail.createMailData(newImage);
				mail.sendMail(data, cb);
				console.log("Contact Email From: " + record.dynamodb.NewImage.emailaddress.S);
			break;
		}
	});

	return cb(null, {
		message: event.Records.length + ' DynamoDB events processed'
	});
};