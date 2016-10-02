require("mailin-api-node-js");

module.exports.sendMail = function(data, callback) {
	'use strict';

	var client = new Mailin("https://api.sendinblue.com/v2.0","rkcs4NxFYjKAwU9H",5000); //Optional parameter: Timeout in MS

	client.send_email(data).on('complete', function(data) {
		console.log(data);

		var response = JSON.parse(data);
		if(response.code === "success") {
			callback(null, response.message);
		} else {
			callback(response.code, response.message);
		}
		
	});
};

module.exports.createMailData = function(object) {
	'use strict';

	console.log(object);

	var input = { 
          to : {"meghan@designedbytro.com":"Meghan Howard"},
          from: [object.emailaddress.S,object.name.S],
          replyto: [object.emailaddress.S,object.name.S],
          subject: "Contact: " + object.name.S,
          html: object.message.S
        }; 

    return input;
};