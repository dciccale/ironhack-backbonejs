var app = app || {};

$(function () {

  'use strict';

  var view = new app.AppView();

  if (window.location.hash) {
    app.Router.handleRoute(window.location.hash);
  }
});
