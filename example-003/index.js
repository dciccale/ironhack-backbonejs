(function () {

  'use strict';

  // Basic data structure
  var user_data = {
    name: 'Denis',
    last: 'Ciccale'
  };

  // Define a user model
  var UserModel = Backbone.Model.extend({
    defaults: user_data,

    sayHi: function () {
      console.log('Hi, my name is', this.get('name'));
    }
  });

  // Create a new user
  // var user = new UserModel(user_data);

  // Make the user say hi!
  // user.sayHi();

  window.App = {
    UserModel: UserModel
  };

}());
