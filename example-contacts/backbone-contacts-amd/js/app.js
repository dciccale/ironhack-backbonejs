define([
  'views'
], function (Views) {

  'use strict';

  var init = function (router) {

    var appView = new Views.AppView();

    if (window.location.hash) {
      router.handleRoute(window.location.hash);
    }
  };

  return {
    init: init
  };

});
