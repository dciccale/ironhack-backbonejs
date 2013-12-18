define([
  'underscore',
  'backbone'
], function (_, Backbone) {

  var PubSub = _.extend(Backbone.Events, {});

  return PubSub;
});
