(function () {

  'use strict';

  var app = {
    Models: {}
  };

  // Define a user model
  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      last: ''
    }
  });

  // Create a new user model defining custom values
  var userModel1 = new UserModel({
    name: 'Denis',
    last: 'Ciccale'
  });

  // Get model attributes
  console.log(userModel1.get('name')); // Denis
  console.log(userModel1.get('last')); // Ciccale

  // Set model attributes
  userModel1.set('name', 'Eugenio');
  console.log(userModel1.get('name')); // Eugenio

  // Set map attributes
  userModel1.set({
    name: 'Peter',
    last: 'Parker'
  });
  console.log(userModel1.get('name')); // Peter
  console.log(userModel1.get('last')); // Parker

  // Get a copy of the model attributes
  var modelAttrs = userModel1.toJSON();
  console.log(modelAttrs);

  // Expose constructors for demo
  app.Models.UserModel = UserModel;

  // Expose instances for demo
  app.userModel1 = userModel1;

  window.app = app;

}());
