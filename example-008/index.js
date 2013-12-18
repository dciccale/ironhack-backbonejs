(function () {

  'use strict';

  var app = {
    Views: {}
  };

  // View
  // -----

  // which could easily be containers or something else
  var viewContainer1 = $('#viewContainer1');
  var viewContainer2 = $('#viewContainer2');

  // Define a new view
  var View = Backbone.View.extend({
    events: {
      'click button': function(e) {
        console.log(e.currentTarget.parentNode.id);
      }
    }
  });

  // Create a new instance of the view applying it to viewContainer1
  var view = new View({el: viewContainer1});

  $('#setElement').click(function () {
    // Apply the view to viewContainer2 using setElement
    view.setElement(viewContainer2);
  });

  // Expose constructors for demo
  app.Views.View = View;

  // Expose instances for demo
  app.view = view;

  window.app = app;
}());
