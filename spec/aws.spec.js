var lib = require('../functions/lib');
var AWS = require('../node_modules/aws-sdk');

describe('AWS functions', function() {
	describe("Adding an item to table", function() {
		describe("Calling function with correct information", function(){
			var response;

			beforeAll(function(done) {
				var params = { 
					Name: 'Delete Me', 
					EmailAddress: 'chris.muenzer@gmail.com', 
					Number: '1', 
					Course: '748', 
					PaymentStatus: 'Registered', 
					CourseSession: 'XXX#YYY', 
					Cost: '200', 
					ClassName: 'Intro to Clay - Four Week Class', 
					Type: 'Class', 
					Class: '1149', 
					Date: 1476748800000, 
					Template: 2, 
					Payment: '50', 
					DueDate: 1474156800000 };

					var dynamodb = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});    

					lib.aws.addItem(dynamodb, 'Participants', params, function(err, data) {
						if (err) {
							console.error("Unable to add", ". Error JSON:", JSON.stringify(err, null, 2));
						}
						response = data;
						done();
					});
				});
			it("Returns a positive message", function(){
				expect(response).toBe('Added item to Participants');
			});  
		}); 
describe("Calling function with correct information", function(){
			var response;

			beforeAll(function(done) {
				var params = { 
					Name: 'Delete Me', 
					EmailAddress: 'chris.muenzer@gmail.com', 
					Number: '1', 
					Course: '748', 
					PaymentStatus: 'Wait List', 
					CourseSession: 'XXX#YYY', 
					Cost: '200', 
					ClassName: 'Intro to Clay - Four Week Class', 
					Type: 'Class', 
					Class: '1149', 
					Date: 1476748800000, 
					Template: 2, 
					Payment: '50'};

					var dynamodb = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});    

					lib.aws.addItem(dynamodb, 'Participants', params, function(err, data) {
						if (err) {
							console.error("Unable to add", ". Error JSON:", JSON.stringify(err, null, 2));
						}
						response = data;
						done();
					});
				});
			it("Returns a positive message", function(){
				expect(response).toBe('Added item to Participants');
			});  
		}); 		
	});	
	describe("Getting items from table", function() {
		describe("Getting bad table", function() {
			var response = null;
			var error = null;

			beforeAll(function(done) {
				var params = {};

				var dynamodb = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});    

				lib.aws.getItems(dynamodb, 'No Table', params, function(err, data) {
					if (err) {
						error = err;
					}
					response = data;
					done();
				});
			});
			it("Returns an error message", function(){
				expect(error).not.toBeNull();
			});  

		});
		describe("Getting good table", function() {
			var response = null;
			var error = null;

			beforeAll(function(done) {
				var params = {};

				var dynamodb = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});    

				lib.aws.getItems(dynamodb, 'Participants', params, function(err, data) {
					if (err) {
						error = err;
					}
					response = data;
					done();
				});
			});
			it("Returns items", function(){
				expect(error).toBeNull();
				expect(response).not.toBeNull();
			});  

		});		
	});
	describe("Get item from table", function() {
		var participant = null;

		beforeAll(function(done) {
			var dynamodb = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});


			lib.aws.getParticipant(dynamodb, 'XXX#YYY', 'Delete Me', function(err, data) {
				participant = data;
				done();
			});
		});


		it("Returns a participant", function() {
			expect(participant).not.toBeNull();
		});
	});
});


