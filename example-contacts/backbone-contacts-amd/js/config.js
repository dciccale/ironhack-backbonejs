require.config({
  deps: ['main'],

  paths: {
    text: '../../../_assets/text',
    jquery: '../../../_assets/jquery',
    underscore: '../../../_assets/underscore',
    backbone: '../../../_assets/backbone',
    backbonelocalstorage: '../../../_assets/backbone.localStorage'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});
