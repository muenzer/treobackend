var lib = require('../functions/lib');

describe('Handle registration information', function() {
	describe("Parse new registration data", function(){
		it("should return a data string for a new class", function() {
			var newImage = {
				"Deposit": "true",
				"CourseSession": "748#992",
				"Number": "2",
				"ClassName": "Intro to Clay - Four Week Class",
				"Cost": "200",
				"Date":"2016-08-30T10:56:03+02:00",
				"EmailAddress": "chris.muenzer@gmail.com",
				"PaymentStatus": "Registered",
				"Name": "Chris Muenzer",
				"Type": "Class"
			};

			var data = lib.registration.parseNewRegistration(newImage);

			expect(data.Template).toEqual(2);
			expect(data.Payment).toEqual(100);
		});
		it("should return a data string for a new workshop", function() {
			var newImage = {
				"Deposit": "true",
				"CourseSession": "748#992",
				"Number": "2",
				"ClassName": "Intro to Clay - Four Week Class",
				"Cost": "200",
				"Date":"2016-08-30T10:56:03+02:00",
				"EmailAddress": "chris.muenzer@gmail.com",
				"PaymentStatus": "Registered",
				"Name": "Chris Muenzer",
				"Type": "Workshop"
			};

			var data = lib.registration.parseNewRegistration(newImage);

			expect(data.Template).toEqual(4);
			expect(data.Payment).toEqual(400);
		});
		it("should return a data string for a waitlist", function() {
			var newImage = {
				"Deposit": "true",
				"CourseSession": "748#992",
				"Number": "2",
				"ClassName": "Intro to Clay - Four Week Class",
				"Cost": "200",
				"Date":"2016-08-30T10:56:03+02:00",
				"EmailAddress": "chris.muenzer@gmail.com",
				"PaymentStatus": "Wait List",
				"Name": "Chris Muenzer",
				"Type": "Workshop"
			};

			var data = lib.registration.parseNewRegistration(newImage);

			expect(data.Template).toEqual(3);
		});
		it("should return a data string for overdue", function() {
			var newImage = {
				"Deposit": "true",
				"CourseSession": "748#992",
				"Number": "2",
				"ClassName": "Intro to Clay - Four Week Class",
				"Cost": "200",
				"Date":"2016-08-30T10:56:03+02:00",
				"EmailAddress": "chris.muenzer@gmail.com",
				"PaymentStatus": "Overdue",
				"Name": "Chris Muenzer",
				"Type": "Workshop"
			};

			var data = lib.registration.parseNewRegistration(newImage);

			expect(data.Template).toEqual(6);
		});
	});

	describe("Calculate due date for payment", function(){
		it("should return a date 30 days before class", function() {
		var baseTime = new Date(2016, 7, 1); //Set date to August 1st 2016 (date is 0 indexed)

		jasmine.clock().mockDate(baseTime);

		var classDate = new Date(2016, 9, 15); //Class date is October 15th 2016 (date is 0 indexed)

		expect(lib.registration.calcDueDate(classDate.getTime(), 30, 5)).toEqual(Date(2016, 8, 15).getTime());
	});
		it("should return a date 5 days from today", function() {
		var baseTime = new Date(2016, 7, 1); //Set date to August 1st 2016 (date is 0 indexed)

		jasmine.clock().mockDate(baseTime);

		var classDate = new Date(2016, 7, 15); //Class date is August 15th 2016 (date is 0 indexed)

		expect(lib.registration.calcDueDate(classDate.getTime(), 30, 5)).toEqual(Date(2016, 7, 6).getTime());
	});
		it("should return class date", function() {
		var baseTime = new Date(2016, 7, 1); //Set date to August 1st 2016 (date is 0 indexed)

		jasmine.clock().mockDate(baseTime);

		var classDate = new Date(2016, 7, 3); //Class date is August 3rd 2016 (date is 0 indexed)

		expect(lib.registration.calcDueDate(classDate.getTime(), 30, 5)).toEqual(Date(2016, 7, 3).getTime());
	});
		it("should return todays date", function() {
		var baseTime = new Date(2016, 7, 1); //Set date to August 1st 2016 (date is 0 indexed)

		jasmine.clock().mockDate(baseTime);

		var classDate = new Date(2016, 6, 1); //Class date is July 1st 2016 - in the past (date is 0 indexed)

		expect(lib.registration.calcDueDate(classDate.getTime(), 30, 5)).toEqual(Date(2016, 7, 1).getTime());
	});
	});
});
