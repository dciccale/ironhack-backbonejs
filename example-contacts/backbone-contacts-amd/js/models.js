define([
  'underscore',
  'backbone',
  'backbonelocalstorage'
], function (_, Backbone) {

  'use strict';

  var Models = {};

  var ContactList;

  Models.Contact = Backbone.Model.extend({
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
    model: Models.Contact,

    comparator: 'firstName',

    sortFields: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email'
    },

    localStorage: new Store('contacts-app-001')
  });

  Models.Contacts = new ContactList();

  return Models;

});
