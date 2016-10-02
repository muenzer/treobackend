var lib = require('../lib');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function(event, context, cb) {
	'use strict';

	var CourseSession = event.CourseSession;
	var EmailAddress = event.EmailAddress;

	var keys = {
			CourseSession: CourseSession,
			EmailAddress: EmailAddress
		};

	lib.aws.getParticipant(docClient, keys, updateStatus);

	function updateStatus(err, event) {
		console.log(event);

		var item = event.Item;

		item.PaymentStatus = 'Overdue';

		var object = lib.registration.parseNewRegistration(item);

		console.log(object);

		//add to database
		lib.aws.addItem(docClient, 'Participants', object, cb);

		//generate email
		var data = lib.mail.createMailData(object);

		lib.mail.sendMailTemplate(data, cb);
	}
};
