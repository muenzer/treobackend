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

	var status = 'Unenrolled';

	lib.aws.updateStatus(docClient, keys, status, cb);

	lib.aws.getParticipant(docClient, keys, function(err, object) {
		//generate email
		var data = lib.mail.createMailData(object.Item);
		data.id = 8;

		lib.mail.sendMailTemplate(data, cb);	
	});

};
