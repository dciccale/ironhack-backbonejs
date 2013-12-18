(function () {

  'use strict';

  var app = {
    Models: {},
    Collections: {}
  };

  // Define a user model
  var HeroModel = Backbone.Model.extend({
    defaults: {
      name: '',
      last: ''
    }
  });

  var HeroesCollection = Backbone.Collection.extend({
    model: HeroModel,

    initialize: function () {
      this.on('add', this.logName);
      this.on('remove', this.logRemoved);
      this.on('reset', this.logReset);
    },

    logName: function (model) {
      console.log(model.get('name'));
    },

    logRemoved: function (model) {
      console.log('Removed:', model.get('name'));
    },

    logReset: function () {
      console.log('Collection reset');
    }
  });

  var hero1 = new HeroModel({id: 1, name: 'Iron Man'});
  var hero2 = new HeroModel({id: 2, name: 'Capitán América'});
  var hero3 = new HeroModel({id: 3, name: 'Hulk'});

  var heroesCollection = new HeroesCollection();

  heroesCollection.add([hero1, hero2, hero3]);

  // This should log:
  // Iron Man
  // Capitán América
  // Hulk

  heroesCollection.on('change:name', function (model) {
    console.log('name changed to:', model.get('name'));
  });

  // Removes hero2
  heroesCollection.set([hero1, hero3]);
  console.log('Set', heroesCollection.length);

  // Reset the Collection
  heroesCollection.reset([hero2]);
  console.log('Reset', heroesCollection.models[0].get('name'));

  // Clear the Collection
  heroesCollection.reset();
  console.log('Reset empty', heroesCollection.length);

  // Expose constructors for demo
  app.Models.HeroModel = HeroModel;
  app.Collections.HeroesCollection = HeroesCollection;

  // Expose instances for demo
  app.heroesCollection = heroesCollection;
  app.hero1 = hero1;
  app.hero2 = hero2;
  app.hero3 = hero3;

  window.app = app;

}());
