define([
  'jquery',
  'underscore',
  'backbone',
  'models',
  'pubsub'
], function ($, _, Backbone, Models, PubSub) {

  'use strict';

  var Views = {};

  var _guid = 1;

  Views.ContactFormView = Backbone.View.extend({
    template: _.template($('#tpl-contact-form').html()),

    events: {
      'click button[data-action="cancel"]': 'onCancel',
      'submit form': 'onSubmit'
    },

    initialize: function () {
      this.model = this.model || new Models.Contact();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    onCancel: function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.trigger('remove');
      this.remove();
      Backbone.history.navigate('');
    },

    onSubmit: function (e) {
      var me, firstName, lastName, email, it, model;

      e.preventDefault();

      me = this;
      firstName = this.$('#firstName').val();
      lastName = this.$('#lastName').val();
      email = this.$('#email').val();

      this.model.set({
        id: _guid++,
        firstName: firstName,
        lastName: lastName,
        email: email
      });

      it = Models.Contacts.models.length;
      while ((it = it - 1) >= 0) {
        model = Models.Contacts.models[it];

        // Prevent adding same email
        if (model.get('email') === email) {
          return;
        }
      }

      Models.Contacts.add(this.model, { unique: true });
      this.model.save({}, {
        error: function () {
          PubSub.trigger('add:error', [].slice.call(arguments, 0));
        },
        success: function () {
          me.onCancel();
          PubSub.trigger('add:success');
        }
      });
    }
  });

  // the view that displays and edits the contact
  Views.ContactListItemView = Backbone.View.extend({
    tagName: 'li',

    className: 'list-group-item',

    templates: {
      view: _.template($('#tpl-contact-view').html()),
      edit: _.template($('#tpl-contact-edit').html())
    },

    events: {
      'click [data-action="delete"]': 'onDelete',
      'submit form': 'onSubmit'
    },

    initialize: function () {
      this.template = this.templates['view'];
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    toggleMode: function () {
      (this.template === this.templates['view']) ?
        this.template = this.templates['edit'] :
        this.template = this.templates['view'];

      this.render();
    },

    onDelete: function (e) {
      this.model.destroy();
      PubSub.trigger('delete:success');
    },

    onSubmit: function (e) {
      var me, firstName, lastName, email;

      e.preventDefault();

      me = this;
      firstName = this.$('input[name="firstname"]').val();
      lastName = this.$('input[name="lastname"]').val();
      email = this.$('input[name="email"]').val();

      this.model.save({
        firstName: firstName,
        lastName: lastName,
        email: email
      }, {
        error: function () {
          me.toggleMode();
        },
        success: function () {
          PubSub.trigger('edit:success', me.model);
          me.toggleMode();
        }
      });
    }
  });

  // a view containing the list of contacts
  Views.ContactListView = Backbone.View.extend({
    tagName: 'ul',

    className: 'list-group',

    views: [],

    render: function () {
      return this;
    },

    addView: function (view) {
      this.views.push(view);
      this.$el.append(view.render().el);
    },

    removeAll: function () {
      this.views = [];
      this.$el.html('');
    }
  });


  // main application view
  Views.AppView = Backbone.View.extend({
    el: '#app',

    events: {
      'click #clear': 'clearSearch',
      'keyup #q': 'onKeyUp',
      'submit #searchForm': 'onSubmitSearchForm'
    },

    initialize: function () {
      this.notifications = this.$('#notifications');
      this.views = this.$('#views');
      this.count = this.$('#count');

      this.contactList = new Views.ContactListView();
      this.views.append(this.contactList.render().el);

      this.listenTo(Models.Contacts, 'add', this.addOne);
      this.listenTo(Models.Contacts, 'reset', this.addAll);
      this.listenTo(Models.Contacts, 'all', this.render);

      this.listenTo(PubSub, 'add:success', this.onAddSuccess);
      this.listenTo(PubSub, 'edit:success', this.onEditSuccess);
      this.listenTo(PubSub, 'delete:success', this.onDeleteSuccess);

      // Handle route change
      this.listenTo(PubSub, 'route:changed', this.onRouteChanged);

      Models.Contacts.fetch({reset: true});
    },

    onSubmitSearchForm: function (ev) {
      var q;

      ev.preventDefault();

      q = $(ev.currentTarget).find('#q').val().toLowerCase();

      if (!q) {
        return;
      }

      q = q.replace(' ', '+');

      Backbone.history.navigate('#search/' + q);
    },

    clearSearch: function (ev) {
      $(ev.currentTarget).hide();
      $('#q').val('');
      Backbone.history.navigate('');
      this.addAll();
    },

    onKeyUp: function (ev) {
      var q;

      q = ev.currentTarget.value.toLowerCase();

      if (!q) {
        $('#clear').hide();
        this.addAll();
        return;
      }

      this.searchContact(q);
    },

    searchContact: function (q) {
      var that = this;

      if (!q) {
        Backbone.history.navigate('');
        return;
      }

      // No contacts to filter
      if (!Models.Contacts.length) {
        return;
      }

      q = q.replace('+', ' ');

      $('#q').val(q);
      $('#clear').show();

      var res = Models.Contacts.filter(function (contact) {
        var fullName = contact.get('firstName') + ' ' + contact.get('lastName');
        fullName = fullName.toLowerCase();

        return fullName.indexOf(q) !== -1;
      });

      // Render filtered results

      // Remove all previous contacts
      this.contactList.removeAll();

      // Render each result that matched the filter
      res.forEach(function (contact) {
        that.addOne(contact);
      });

      // If no search term render all
      if (!q) {
        this.addAll();
      }

    },

    addContactForm: function () {
      var firstChild;
      if (!this.contactForm) {
        this.contactForm = new Views.ContactFormView({model: new Models.Contact()});
        this.contactForm.listenTo(this.contactForm, 'remove', _.bind(function () {
          this.contactForm = null;
        }, this));
        this.views[0].insertBefore(this.contactForm.render().el, this.views.children()[0]);
      }
    },

    editContact: function (id) {
      id = parseInt(id, 10);

      this.contactList.views.filter(function(view) {
        if (view.template === view.templates['edit']) {
          view.toggleMode();
        }
      });

      var contactToEdit = this.contactList.views.filter(function(view) {
        return view.model.get('id') === id;
      });

      if (contactToEdit.length) {
        contactToEdit[0].toggleMode();
      }
    },

    addOne: function (contact) {
      var listItemView = new Views.ContactListItemView({model: contact});
      this.contactList.addView(listItemView);
    },

    addAll: function (contacts) {
      this.contactList.removeAll();
      Models.Contacts.each(this.addOne, this);
    },

    render: function () {
      // console.log('render', arguments);
      this.count.text(Models.Contacts.length);
    },

    displayNotification: function (msg) {
      var notification = $('<div>')
        .addClass('alert alert-success')
        .html(msg)
        .delay(500)
        .fadeOut(2000);
      this.notifications.append(notification);
    },

    onAddSuccess: function () {
      this.contactForm = null;
      this.displayNotification('The contact was added!');
    },

    onEditSuccess: function (contact) {
      this.displayNotification('The contact was updated!');
      Backbone.history.navigate('');
    },

    onDeleteSuccess: function () {
      this.displayNotification('The contact was deleted.');
    },

    onRouteChanged: function (route, args) {
      if (route === 'contact') {
        this.addContactForm();
      } else if (route === 'edit') {
        this.editContact(args);
      } else if (route === 'search') {
        this.searchContact(args);
      } else {
        this.addAll();
        $('#q').val('');
        if (this.contactForm) {
          this.contactForm.remove();
          this.contactForm = null;
        }
      }
    }
  });

  return Views;
});
