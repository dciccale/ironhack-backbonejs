var app = app || {};

(function () {

  'use strict';

  var ContactList;

  app.PubSub = _.extend(Backbone.Events, {});

  app.Contact = Backbone.Model.extend({
    defaults: {
      firstName: '',
      lastName: '',
      email: ''
    },

    validate: function (attrs, options) {
      if (!attrs.firstName.trim()) {
        return 'firstName can\'t be empty';
      }

      if (!attrs.email.match(/@/g)) {
        return 'email seems to be invalid';
      }
    }
  });

  ContactList = Backbone.Collection.extend({
    model: app.Contact,

    comparator: 'firstName',

    sortFields: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email'
    },

    localStorage: new Store('contacts-app-001')
  });

  app.Contacts = new ContactList();

}());
