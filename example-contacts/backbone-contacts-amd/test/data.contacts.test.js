define(['data/contact', 'data/contacts'], function (Contact, ContactList) {
  describe('contacts test suite', function () {
    var obj, contactList;

    contactList = new ContactList();

    beforeEach(function () {
      obj = {
        onContactAdded: function (contact) {
          return contact;
        }
      };
      spyOn(obj, 'onContactAdded');
      contactList.on('add', obj.onContactAdded);
    });

    it ('should be an instance of Backbone.Collection', function () {
      expect(contactList instanceof Backbone.Collection).toBeTruthy();
    });

    it('should dispatch "add" event', function () {
      var added;

      runs(function () {
        contactList.on('add', function (contact) { added = true; });
        contactList.add(new Contact({name: 'admin', email: 'admin@localhost'}));
      });

      waitsFor(function () {
        return added;
      }, 'should have dispatched an "add" event', 500);
      
      runs(function () {
        expect(added).toBeTruthy();
      });
    });

    it('should dispatch "remove" event', function () {
      var removed,
        contact = contactList.models[0];

      runs(function () {
        contactList.on('remove', function (contact) {
          removed = true;
        });
        contactList.remove(contact);
      });
      
      waitsFor(function () {
        return removed;
      }, 'should have dispatched a "remove" event', 800);

      runs(function () {
        expect(removed).toBeTruthy();
      });
    });

    it('should dispatch a "refresh" event', function () {
      var reset;
            
      runs(function () {
        contactList.on('reset', function () { reset = true; });
        contactList.reset();
      });
      
      waitsFor(function () {
        return reset;
      }, 'should have dispatched a "reset" event', 500);

      runs(function () {
        expect(reset).toBeTruthy();
      });
    });
    

    it('should call methods if events are dispatched', function () {
      var contact = new Contact({name: 'admin', email: 'admin@localhost'});
      contactList.add(contact);

      expect(obj.onContactAdded).toHaveBeenCalled();   
      expect(obj.onContactAdded.calls.length).toEqual(1);
      expect(obj.onContactAdded.mostRecentCall.args[0]).toEqual(contact);
    });

  });
});
