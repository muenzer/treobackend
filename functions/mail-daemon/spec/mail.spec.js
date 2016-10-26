var mail = require('../mail.js');

describe('Working with email', function() {
  describe('Create data for sending mail', function() {
    var object = {
  "ClassName": {
    "S": "Intro to Clay - Four Week Class"
  },
  "Cost": {
    "N": "200"
  },
  "CourseSession": {
    "S": "748#987"
  },
  "CreatedAt": {
    "N": "1470587446098"
  },
  "Date": {
    "N": "1472508000000"
  },
  "DueDate": {
    "N": "1470848432719"
  },
  "EmailAddress": {
    "S": "chris.muenzer@gmail.com"
  },
  "EmailFlag": {
    "BOOL": true
  },
  "id": {
    "S": "4adcf320-5cbc-11e6-b051-6d6d7ee11959"
  },
  "Message": {
    "S": "Yay, a space has opened up and you are now registered for"
  },
  "Name": {
    "S": "Test"
  },
  "Number": {
    "N": "4"
  },
  "Payment": {
    "N": "200"
  },
  "PaymentStatus": {
    "S": "Registered"
  },
  "SessionName": {
    "S": "Tuesday Mornings - 9:00am to 12:00pm - Begins August 30th"
  },
  "Template": {
    "N": "2"
  },
  "Type": {
    "S": "Class"
  },
  "UpdatedAt": {
    "N": "1470589233688"
  }
};

    xit('Should create mail input - template', function() {
      var data = mail.createMailData(object);

      expect(data.id).toBe(2);
      expect(data.to).toBe('chris.muenzer@gmail.com');
      expect(data.attr.DATE).toExist();
      expect(data.attr.NUMBER).toBe('3 spaces');
    });
    it('Should create mail input - registration', function() {
      var data = mail.createRegistrationMail(object);

      expect(data.to['meghan@designedbytro.com']).toContain('Meghan Howard');
      expect(data.html).toBeDefined();
    });
    it('Shound not fail', function() {
      object = null;
      var data = mail.createRegistrationMail(object);

      expect(data).toBeDefined();
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

        mail.sendMailTemplate(input, function(err, data) {
          response = data;
          done();
        });
      });
      xit("Returns a positive message", function(){
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

        mail.sendMailTemplate(input, function(err, data) {
          response = data;
          error = err;
          done();
        });
      });
      xit("Returns an error message", function(){
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

        mail.sendMail(input, function(err, data) {
          response = data;
          done();
        });
      });
      xit("Returns a positive message", function(){
        expect(response).toBe("Email sent successfully");
      }); 
  }); 
});




