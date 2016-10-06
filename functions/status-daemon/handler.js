var mail = require('./mail.js');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function(event, context, cb) {
	'use strict';

	var today = Date.now();

	var params = {
		TableName: "participants-dev",
		IndexName: "PaymentStatus",
		ProjectionExpression:"PaymentStatus, #name, ClassName, Payment, DueDate",
		FilterExpression: "(PaymentStatus = :reg or PaymentStatus = :overdue) and DueDate < :today",
		ExpressionAttributeNames:{
			"#name": "Name"
		},
		ExpressionAttributeValues: {
			":today": today,
			":reg": "Registered",
			":overdue": "Overdue"
		},
	};

	docClient.scan(params, function(err, data) {
		if (err)
			console.log(JSON.stringify(err, null, 2));
		else {
			var items = data.Items;

			if(items.length > 0) {
				var mailData = mail.createOverdueMail(items);
				mail.sendMail(mailData, cb);
			}
		}
	});
};
