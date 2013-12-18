define(['localStorage'], function (localStorage) {

  return Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('contacts'),

    validate: function (attrs) {
      if (!attrs) return;
      if (!attrs.name) {
        return 'A name is required';
      }
      if (!attrs.email || !attrs.email.match(/@/g)) {
        return 'An email is required';
      }
      return;
    }
  });

});
