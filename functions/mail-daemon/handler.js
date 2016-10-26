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
				var reg = mail.createRegistrationMail(newImage);
				mail.sendMail(reg, cb);
				console.log("Update email about " + record.dynamodb.NewImage.EmailAddress.S);
			break;
			case "MODIFY":
				if(typeof(record.dynamodb.NewImage.EmailFlag) != 'undefined' && record.dynamodb.NewImage.EmailFlag.BOOL) {

					var number = newImage.Number.N | newImage.Number.S;
					if(number == 1) {
						number = 'one space';
					} else {
						number = number + ' spaces';
					}

					emailData = {
						to: newImage.EmailAddress.S,
						id: newImage.Template.N,
						attr:{
												CLASS: newImage.ClassName.S,
												NAME: newImage.Name.S,
												COST: newImage.Payment.N | newImage.Payment.S,
												DATE: dateFormat(Number(newImage.Date.N), "mmmm dS"),
												DUEDATE: dateFormat(Number(newImage.DueDate.N), "mmmm dS"),
												NUMBER: newImage.Number.N | newImage.Number.S,
												MESSAGE: newImage.Message ? newImage.Message.S : ""
											}
					};

					console.log(emailData);
					mail.sendMailTemplate(emailData, cb);
					console.log("Sent email to " + newImage.EmailAddress.S + " using template " + newImage.Template.N);
				}
		}
		//console.log(record.eventName);
		//console.log(record.dynamodb);
	});

	return cb(null, {
		message: event.Records.length + ' DynamoDB events processed'
	});
};