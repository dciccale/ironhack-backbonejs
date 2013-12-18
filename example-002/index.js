(function () {

  'use strict';

  var app = {
    Models: {}
  };

  // Define a user model
  var UserModel = Backbone.Model.extend({
    defaults: {
      name: 'defaultName',
      last: 'defaultLast'
    }
  });

  // Create a new user model using defaults
  var userModel1 = new UserModel();
  console.log('userModel1', JSON.stringify(userModel1));

  // Create a new user model defining custom values
  var userModel2 = new UserModel({
    name: 'Denis',
    last: 'Ciccale'
  });
  console.log('userModel2', JSON.stringify(userModel2));

  // Expose constructors for demo
  app.Models.UserModel = UserModel;

  // Expose instances for demo
  app.userModel1 = userModel1;
  app.userModel2 = userModel2;

  window.app = app;

}());
