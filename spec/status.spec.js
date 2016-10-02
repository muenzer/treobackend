var lib = require('../functions/lib');

describe('Working with status', function() {
	describe('Parsing path parms', function() {
		var event = {
			"body": {},
			"pathParams": "{status=registered}",
			"queryParams": "{}"
		};

		it('should return Registered', function() {
			expect(lib.status.parse(event)).toBe('Registered');
		});
		it('should return Wait List', function() {
			event.pathParams.status = 'waitlist';
			expect(lib.status.parse(event)).toBe('Wait List');
		});
		it('should return Paid', function() {
			event.pathParams.status = 'paid';
			expect(lib.status.parse(event)).toBe('Paid');
		});
		it('should return Over Due', function() {
			event.pathParams.status = 'overdue';
			expect(lib.status.parse(event)).toBe('Over Due');
		});			
	});
});