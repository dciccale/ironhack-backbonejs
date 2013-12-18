(function () {

  'use strict';

  // Basic data structure
  var user_data = {
    name: 'Denis',
    last: 'Ciccale'
  };

  // Create a new backbone model
  var user = new Backbone.Model(user_data);

  window.App = {
    user: user
  };

}());
