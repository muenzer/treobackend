// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../lib/get');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
	'use strict';

	console.log(event);

	lib.respond(event, cb);
};



