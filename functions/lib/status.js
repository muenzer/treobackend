module.exports.parse = function(event) {
	'use strict';

	var statuslist = {
		registered: "Registered",
		waitlist: "Wait List",
		paid: "Paid",
		overdue: "Over Due",
		unenrolled: "Unenrolled"
	};

	var status = event.pathParams.status;

	return statuslist[status];
};