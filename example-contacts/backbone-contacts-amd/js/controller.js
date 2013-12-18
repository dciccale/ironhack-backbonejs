define(['marionette'], function (Marionette) {

  var Ctrl = Backbone.Marionette.Controller.extend({
    onRouteChanged: function (route) {
      console.log('route changed', route);
    }
  });
  return new Ctrl();
});