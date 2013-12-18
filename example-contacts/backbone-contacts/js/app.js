var app = app || {};

$(function () {

  'use strict';

  var view = new app.AppView();

  if (window.location.hash) {
    view.onRouteChanged(window.location.hash.replace(/#/, ''));
  }
});

