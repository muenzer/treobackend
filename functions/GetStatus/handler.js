var lib = require('../lib');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function(event, context, cb) {
	'use strict';

	var status = event.Status;

	console.log(status);

	lib.aws.getStatus(docClient, status, cb);
};
