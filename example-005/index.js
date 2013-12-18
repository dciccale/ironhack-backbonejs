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
    },

    initialize: function () {
      this.listenTo(this, 'invalid', function (model, error) {
        console.log(error);
      });
    },

    validate: function (attributes) {
      console.log(attributes);
      if (!attributes.name) {
        return 'You must provide a name for the user';
      }
    }
  });

  // Create a new user model defining custom values
  var userModel1 = new UserModel();
  userModel1.set({last: 'Parker'}, {validate: true});

  // The validationError property will be set to the returned value from the validate function
  var userModel2 = new UserModel(null, {validate: true});
  console.log(userModel1.validationError);

  // Expose constructors for demo
  app.Models.UserModel = UserModel;

  // Expose instances for demo
  app.userModel1 = userModel1;
  app.userModel2 = userModel2;

  window.app = app;

}());
