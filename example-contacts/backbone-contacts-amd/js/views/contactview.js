define([
  'marionette', 
  'eventbus',
  'geppetto',
  'views/contactviewcontext'
], function (Marionette, eventBus, Geppetto, ContactViewCtx) {
  'use strict';

  var ContactView;

  ContactView = Backbone.Marionette.ItemView.extend({
    template: '#contact-template',

    events: {
      'click a[data-action="delete"]': 'onDeleteClick'
    },

    onRender: function () {
      Geppetto.bindContext({
        view: this,
        context: ContactViewCtx
      });

      this.context.model = this.model;
      this.context.listen(this, 'contact:delete:before', this.onBeforeDelete);
      this.context.vent.on('contact:delete:after', this.onAfterDelete);
    },

    onDeleteClick: function (e) {
      this.context.dispatch('contact:delete:before');
    },

    onBeforeDelete: function (e) {
      var txt = 'Are you sure you want to delete this contact?';
      if (confirm(txt)) {
        this.context.dispatch('contact:delete:confirm', this.model.id);
      } else {
        this.context.dispatch('contact:delete:cancel');
      }
    },

    onAfterDelete: function (e) {
      eventBus.trigger('contact:deleted');
    }
  });

  return ContactView;
});
