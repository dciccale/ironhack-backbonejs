(function () {

  'use strict';

  var app = {};

  // Basic data structure
  var userData = {
    name: 'Denis',
    last: 'Ciccale'
  };

  // Create a new Backbone Model
  var userModel = new Backbone.Model(userData);

  var usersCollection = new Backbone.Collection([userModel]);

  // Expose instances for demo
  app.userModel = userModel;
  app.usersCollection = usersCollection;

  window.app = app;

}());
