var lib = require('../lib');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function(event, context, cb) {
	'use strict';

	var CourseSession = event.CourseSession;
	var EmailAddress = event.EmailAddress;
	var msg = event.Message;

	var keys = {
			CourseSession: CourseSession,
			EmailAddress: EmailAddress
		};

	lib.aws.getParticipant(docClient, keys, updateStatus);

	function updateStatus(err, event) {
		var item = event.Item;

		item.PaymentStatus = 'Registered';
		item.Message = msg;

		var object = lib.registration.parseNewRegistration(item);

		console.log(object);

		//add to database
		lib.aws.addItem(docClient, 'Participants', object, cb);

		//generate email
		var data = lib.mail.createMailData(object);
		data.attr.MESSAGE = msg;

		lib.mail.sendMailTemplate(data, cb);
	}
};
