(function () {

  'use strict';

  var app = {
    Views: {}
  };

  // View
  // -----

  // Define a user view
  var View = Backbone.View.extend({
    template: _.template($('#view-tpl').html()),

    render: function (text) {
      text = text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

      var data = {text: text};

      var compiledTemplate = this.template(data);

      this.$el.html(compiledTemplate);

      return this;
    }
  });

  var headerView = new View({
    el: 'header'
  });
  headerView.render();
  // headerView.render('Header');

  var footerView = new View({
    el: 'footer'
  });
  footerView.render();
  // footerView.render('Footer');

  // Expose constructors for demo
  app.Views.View = View;

  // Expose instances for demo
  app.headerView = headerView;
  app.footerView = footerView;

  window.app = app;
}());
