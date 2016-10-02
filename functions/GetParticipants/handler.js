var lib = require('../lib');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = function (event, context, cb) {
	'use strict';

	var params = {};

	lib.aws.getItems(docClient, 'Participants', params, cb);
};
