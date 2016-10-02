var lib = require('../functions/lib');

describe('Working with email', function() {
  describe('Create data for sending mail', function() {
    var object = { Name: 'Chris Muenzer',
    EmailAddress: 'chris.muenzer@gmail.com',
    Number: 3,
    Course: '748',
    PaymentStatus: 'Registered',
    CourseSession: '748#987',
    Cost: '200',
    ClassName: 'Intro to Clay - Four Week Class',
    Deposit: 'true',
    Class: '987',
    Date: 1467533868944,
    Type: 'Class',
    Template: 2,
    Payment: '50',
    DueDate: 1467533868944};

    it('Should create mail input - template', function() {
      var data = lib.mail.createMailData(object);

      expect(data.id).toBe(2);
      expect(data.to).toBe('chris.muenzer@gmail.com');
      expect(data.attr.DATE).toBe('July 3rd');
      expect(data.attr.NUMBER).toBe('3 spaces');
    });
    it('Should create mail input - registration', function() {
      var data = lib.mail.createRegistrationMail(object);

      expect(data.to).toContain('meghan@designedbytro.com');
      expect(data.html).toBeDefined();
    });    
  });
  describe("Sending Email with Template", function() {
    describe("Calling function with correct information", function(){
      var response;

      beforeEach(function(done) {
        var input = { 
          "id" : 2,
          "to" : "chris.muenzer@gmail.com",
          "attr" : {
            "CLASS":"Intro to Clay",
            "NAME":"Chris Muenzer",
            "COST":"200",
            "DATE":"August 12th",
            "DUEDATE":"July 1st",
            "NUMBER":"one place",
            "MESSAGE":"Thank you for registering for"
          }
        };    

        lib.mail.sendMailTemplate(input, function(err, data) {
          response = data;
          done();
        });
      });
      it("Returns a positive message", function(){
        expect(response).toBe("Email sent successfully");
      });  
    }); 
    describe("Calling function with a bad template information", function(){
      var response;
      var error;

      beforeEach(function(done) {
        var input = { 
          "id" : -1,
          "to" : "chris.muenzer@gmail.com",
          "attr" : {
            "CLASS":"Intro to Clay",
            "NAME":"Chris Muenzer",
            "COST":"200",
            "DATE":"August 12th",
            "DUE DATE":"July 1st"
          }
        };    

        lib.mail.sendMailTemplate(input, function(err, data) {
          response = data;
          error = err;
          done();
        });
      });
      it("Returns an error message", function(){
        expect(error).toBe("failure");
      });  
    }); 
  });
  describe("Sending Email without Template", function() {
      var response;

      beforeEach(function(done) {
        var input = { 
          to : {"chris.muenzer@gmail.com":"Chris Muenzer"},
          from: ["meghan@designedbytro.com","Meghan Howard"],
          subject: "Test email",
          html: "<h1>This is a test email</h1>"
        };    

        lib.mail.sendMail(input, function(err, data) {
          response = data;
          done();
        });
      });
      it("Returns a positive message", function(){
        expect(response).toBe("Email sent successfully");
      }); 
  }); 
});




