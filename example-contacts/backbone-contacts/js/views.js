var app = app || {};

$(function () {

  var _guid = 1;

  'use strict';

  app.ContactFormView = Backbone.View.extend({
    template: _.template($('#tpl-contact-form').html()),

    events: {
      'click button[data-action="cancel"]': 'onCancel',
      'submit form': 'onSubmit'
    },

    initialize: function () {
      this.model = this.model || new app.Contact();
      this.listenTo(this.model, 'invalid', this.onInvalid);
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

      it = app.Contacts.models.length;
      while ((it = it - 1) >= 0) {
        model = app.Contacts.models[it];

        // Prevent adding same email
        if (model.get('email') === email) {
          return;
        }
      }

      app.Contacts.add(this.model, { unique: true });
      this.model.save({}, {
        error: function () {
          app.PubSub.trigger('add:error', [].slice.call(arguments, 0));
        },
        success: function () {
          me.onCancel();
          app.PubSub.trigger('add:success');
        }
      });
    },

    onInvalid: function (model, error) {
      alert(error);
    }
  });

  // the view that displays and edits the contact
  app.ContactListItemView = Backbone.View.extend({
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
      app.PubSub.trigger('delete:success');
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
          app.PubSub.trigger('edit:success', me.model);
          me.toggleMode();
        }
      });
    }
  });

  // a view containing the list of contacts
  app.ContactListView = Backbone.View.extend({
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
  app.AppView = Backbone.View.extend({
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

      this.contactList = new app.ContactListView();
      this.views.append(this.contactList.render().el);

      this.listenTo(app.Contacts, 'add', this.addOne);
      this.listenTo(app.Contacts, 'reset', this.addAll);
      this.listenTo(app.Contacts, 'all', this.render);

      this.listenTo(app.PubSub, 'add:success', this.onAddSuccess);
      this.listenTo(app.PubSub, 'edit:success', this.onEditSuccess);
      this.listenTo(app.PubSub, 'delete:success', this.onDeleteSuccess);

      // Handle route change
      this.listenTo(app.PubSub, 'route:changed', this.onRouteChanged);

      app.Contacts.fetch({reset: true});
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

      if (!q || !app.Contacts.length) {
        Backbone.history.navigate('');
        return;
      }

      q = q.replace('+', ' ');

      $('#q').val(q);
      $('#clear').show();

      var res = app.Contacts.filter(function (contact) {
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
        this.contactForm = new app.ContactFormView({model: new app.Contact()});
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
      var listItemView = new app.ContactListItemView({model: contact});
      this.contactList.addView(listItemView);
    },

    addAll: function (contacts) {
      this.contactList.removeAll();
      // app.Contacts.sort();
      app.Contacts.each(this.addOne, this);
    },

    render: function () {
      // console.log('render', arguments);
      this.count.text(app.Contacts.length);
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

});
