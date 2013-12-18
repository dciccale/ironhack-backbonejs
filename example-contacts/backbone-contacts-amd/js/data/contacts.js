define(['localStorage', 'data/contact'], function (localStorage, Contact) {
  var Contacts;

  Contacts = Backbone.Collection.extend({
    model: Contact,
    localStorage: new Backbone.LocalStorage('contacts'),

    initalize: function () {
      console.log('Contacts initialized');
    }
  });  

  return Contacts;
});
