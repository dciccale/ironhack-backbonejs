require([
  'models',
  'views',
  'router',
  'app'
], function (Models, Views, Router, App) {

  'use strict';

  // Init Router
  var router = Router.init()

  $(function () {
    App.init(router);
  });

  console.log('App started!');
});
