define([
  'marionette', 
  'views/contactview'
], function (Marionette, ContactView) {
  'use strict';

  return Backbone.Marionette.CollectionView.extend({
    itemView: ContactView
  });
});
