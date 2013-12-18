define([
  'marionette',
  'data/contacts',
  'views/headerview',
  'views/contactsview',
  'eventbus'
], function (Marionette, Contacts, HeaderView, ContactsView, eventBus) {
  'use strict';

  var app = new Backbone.Marionette.Application(), 
    contactList = new Contacts();

  app.addRegions({
    header: '#header',
    content: '#content'
  });

  app.addInitializer(function () {
    var viewOptions = {
      collection: contactList
    };

    app.header.show(new HeaderView(viewOptions));
    app.content.show(new ContactsView(viewOptions));

    contactList.fetch();
  });

  // eventBus.on('contact:delete', function (id) {
  //  var contact = contactList.get(id);
  //  if (contact) {
  //    contact.destroy();
  //  }
  // });

  return app;
});
