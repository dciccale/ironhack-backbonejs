define(['data/contact'], function (Contact) {

  describe('contact model test suite', function () {
    var contact;

    beforeEach(function () {
      contact = new Contact();
    });

    it('contact model should exist', function () {
      expect(contact).toBeDefined();
    });

    it('contact should not validate without name or email', function () {
      var errors;
      errors = contact.validate(contact.attributes);
      expect(errors).toEqual('A name is required');

      contact.set({'name': 'A name'});

      errors = contact.validate(contact.attributes);
      expect(errors).toEqual('An email is required');
    });

    it('contact should be saved using localStorage', function () {
      var save, saved;
      save = function () {
        contact.save({
          name: 'admin',
          email: 'admin@localhost'
        }, {
          sucess: function () {
            saved = true;        
            expect(saved).toBeTruthy();
          }
        });
      };
      waitsFor(save);
      
      // waitsFor...
      //
    });
  });
});
