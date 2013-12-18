(function () {

  'use strict';

  var app = {
    Models: {},
    Views: {}
  };

  // Model
  // -----

  // Define a user model
  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      last: ''
    }
  });

  // View
  // -----

  // Define a user view
  var UserView = Backbone.View.extend({
    // Cache the compiled template
    template: _.template($('#user-tpl').html()),

    render: function () {
      var data = this.model.toJSON();

      var compiledTemplate = this.template(data);

      this.$el.html(compiledTemplate);

      return this;
    }
  });

  // Create a new instance of the view passing a user model
  var userModel = new UserModel({name: 'Test', last: 'True'});
  var userView = new UserView({
   model: userModel
  });

  // Render the view
  userView.render();

  // Insert the view into the body to make its DOM visible
  $('body').append(userView.el);

  // Expose constructors for demo
  app.Models.UserModel = UserModel;
  app.Views.UserView = UserView;

  // Expose instances for demo
  app.userModel = userModel;
  app.userView = userView;

  window.app = app;
}());
