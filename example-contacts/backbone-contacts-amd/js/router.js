define([
  'underscore',
  'backbone',
  'pubsub'
], function (_, Backbone, PubSub) {

  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      '*route': 'handleRoute'
    },

    handleRoute: function () {
      var args;

      args = [].slice.call(arguments, 0).join('').replace(/#/g, '').split('/');
      args.unshift('route:changed');

      PubSub.trigger.apply(PubSub, args);
    }
  });

  var init = function () {
    var router = new Router();

    Backbone.history.start();

    if (window.location.hash) {
      router.handleRoute(window.location.hash);
    }

    return router;
  };

  return {
    init: init
  };
});
