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

    it('contact should be saved or retreived using local storage', function () {
      var saved;
      runs(function () {
        saved = false;
        contact.save({
          name: 'admin',
          email: 'admin@localhost'
        }, {
          success: function () { saved = true; }
        });
      });

      waitsFor(function () {
        return saved;
      }, 'The model should have been saved', 500);
      
      runs(function () {
        expect(saved).toBeTruthy();
      });

      runs(function () {
        contact.fetch({
          success: function (model, response, options) {
            saved = model;
          }
        });
      });

      waitsFor(function () {
        return saved;
      }, 'The model should have been fetched from the server', 500);
      
      runs(function () {
        expect(saved.get('name')).toEqual('admin');
        expect(saved.get('email')).toEqual('admin@localhost');
      })
    });
  });
});
