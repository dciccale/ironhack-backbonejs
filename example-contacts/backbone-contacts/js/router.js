var app = app || {};

(function () {

  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      '*route': 'handleRoute'
    },

    handleRoute: function () {
      var args;

      args = [].slice.call(arguments, 0).join('').replace(/#/g, '').split('/');
      args.unshift('route:changed');

      app.PubSub.trigger.apply(app.PubSub, args);
    }
  });

  app.Router = new Router();
  Backbone.history.start();

  if (window.location.hash) {
    app.Router.handleRoute(window.location.hash);
  }
}());
