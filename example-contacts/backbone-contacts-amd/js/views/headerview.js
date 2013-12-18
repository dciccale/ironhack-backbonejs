define([
  'marionette', 
  'data/contact', 
  'eventbus'
], function (Marionette, Contact, eventBus) {
  'use strict';

  return Backbone.Marionette.ItemView.extend({
    template: '#header-template',

    ui: {
      name: '#name',
      email: '#email',
      errors: '#errors',
      notification: '#notification',
    },

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function () {
      _.bindAll(this);

      eventBus.on('contact:deleted', this.onContactDeleted);          
    },

    onSubmit: function (e) {
      var errors, errorEl, contact, me;
      e.preventDefault();
      me = this;
      
      contact = new Contact();
      contact.set({
        name: this.ui.name.val().trim (),
        email: this.ui.email.val().trim()
      });

      errors = contact.validate(contact.attributes);
      if (errors) {
        errorEl = $('<li />').html(errors);
        this.ui.errors.append(errorEl).fadeIn(function () {
          setTimeout(function () {
            me.ui.errors.fadeOut();
          }, 3000);
        });
      } else {
        this.collection.create(contact.toJSON(), {
          error: function () {
            console.log('error', arguments);
          },
          success: function () {
            me.showNotification('Contact added'); 
          }
        });
        this.ui.name.val('');
        this.ui.email.val('');
      }
    },

    onContactDeleted: function (e) {
      this.showNotification('Contact deleted');      
    },

    showNotification: function (text) {
      this.ui.notification.html(text).fadeIn(function () {
        var el = $(this);
        setTimeout(function () {
          el.fadeOut(function () { el.html(''); });
        }, 2000);
      });                  
    }
  });
});
