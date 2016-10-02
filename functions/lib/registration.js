module.exports.parseNewRegistration = function(object) {
	'use strict';
	var classDate = object.Date;
	var number = object.Number;
	var dueDate;

	if(object.PaymentStatus === 'Wait List' ||  object.PaymentStatus === 'Interested') {
		object.Template = 3;
		object.DueDate = 0;
		object.Payment = 0;
	} else if(object.PaymentStatus === 'Registered') {
		if(object.Type === 'Class') {
			object.Template = 2;
			object.Payment = 50 * number;
			dueDate = module.exports.calcDueDate(classDate, 45, 3);
			object.DueDate = dueDate;
		} else if (object.Type === 'Workshop') {
			object.Template = 4;
			object.Payment = object.Cost * number;
			dueDate = module.exports.calcDueDate(classDate, 14, 1);
			object.DueDate = dueDate;
		}
	} else if(object.PaymentStatus === 'Overdue') {
		object.Template = 6;

		if(object.Type === 'Class') {
			dueDate = module.exports.calcDueDate(classDate, 5, 5);
			object.DueDate = dueDate;
		} else if (object.Type === 'Workshop') {
			dueDate = module.exports.calcDueDate(classDate, 5, 5);
			object.DueDate = dueDate;
		}
	}

	return object;
};

module.exports.calcDueDate = function(classDateMS, cutoffDays, graceDays) {
	'use strict';
	var today = Date.now();
	var dueDateMS = classDateMS - (cutoffDays * 24*3600*1000);

	if(today > dueDateMS) { //Too close to cutoff
		dueDateMS = today + (graceDays * 24*3600*1000);
		if(dueDateMS > classDateMS) {
			dueDateMS = classDateMS;
		} if(dueDateMS < today) {
			dueDateMS = today;
		}
	}

	return dueDateMS;
};
