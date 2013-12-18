(function () {

  'use strict';

  var app = {
    Models: {}
  };

  // Define a user model
  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      last: '',
      type: 'normal'
    },

    initialize: function () {
      // Listen when any attribute is changed
      this.listenTo(this, 'change', function () {
        console.log('Some value of the model has changed');
      });

      // Listen when the user name changes and log its full name
      this.listenTo(this, 'change:name', this.logFullName);
    },

    logFullName: function () {
      console.log('My fullname is', this.get('name') + ' ' + this.get('last'));
    }
  });

  // Create a new user model defining custom values
  var userModel1 = new UserModel({
    name: 'Denis',
    last: 'Ciccale'
  });
  console.log('userModel1', JSON.stringify(userModel1));

  // Make the user log its full name!
  userModel1.logFullName();

  // Change the last name
  userModel1.set('type', 'admin');

  // Change the name
  userModel1.set('name', 'Eugenio');

  // Stop listening
  userModel1.stopListening(userModel1, 'change:name', userModel1.logFullName);

  // Change the name
  userModel1.set('name', 'Peter');
  console.log(userModel1.get('name'));

  // Expose constructors for demo
  app.Models.UserModel = UserModel;

  // Expose instances for demo
  app.userModel1 = userModel1;

  window.app = app;

}());
