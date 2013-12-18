'use strict';

require({
  baseUrl: '../js/',

  paths: {
    'jquery': '../../../assets/jquery.min',
    'underscore': '../../../assets/underscore-min',
    'backbone': '../../../assets/backbone-min',
    'marionette': '../../../assets/backbone.marionette.min',
    'geppetto': '../../../assets/backbone.geppetto',
    'localStorage': '../../../assets/backbone.localStorage-min',
    'dust': '../../../assets/dust-full-0.3.0.min'
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
  },
  
  deps: [
    '../test/app.test',
    '../test/data.contact.test',
    '../test/data.contacts.test'
  ],

  // start test run, once requirejs is done
  callback: function () {
    // debugger;
    //
    var jasmineEnv, htmlReporter;
    jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
    jasmineEnv.execute();
  }
});


