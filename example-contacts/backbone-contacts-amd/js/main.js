'use strict';

require.config({
  baseUrl: 'js/',

  paths: {
    'jquery': '../../../assets/jquery.min',
    'underscore': '../../../assets/underscore-min',
    'backbone': '../../../assets/backbone-min',
    'marionette': '../../../assets/backbone.marionette.min',
    'geppetto': '../../../assets/backbone.geppetto',
    'dust': '../../../assets/dust-full-0.3.0-min',
    'localStorage': '../../../assets/backbone.localStorage-min'
  },

  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'marionette': {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },
    'localStorage': {
      deps: ['backbone'],
      exports: 'Backbone.LocalStorage'
    },
    'geppetto': {
      'deps': ['backbone'],
      'exports': 'Backbone.Geppetto'
    }
  }
});

require([
  'geppetto', 
  'app', 
  'router', 
  'controller'
], function (Geppetto, app, Router, controller) {
  
  var router;

  router = new Router({
    controller: controller
  });
  app.start();
  Backbone.history.start();
  Geppetto.setDebug(true);
});

