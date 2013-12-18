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
    model: HeroModel
  });

  var hero1 = new HeroModel({
    id: 1,
    name: 'Iron Man'
  });

  var hero2 = new HeroModel({
    id: 2,
    name: 'Capitán América'
  });

  var hero3 = new HeroModel({
    id: 3,
    name: 'Hulk'
  });

  var heroesCollection = new HeroesCollection([hero1, hero2]);
  console.log('Length:', heroesCollection.length); // Length: 2

  heroesCollection.add(hero3);
  console.log('Length:', heroesCollection.length); // Length: 3

  heroesCollection.remove([hero1, hero2]);
  console.log('Length:', heroesCollection.length); // Length: 1

  heroesCollection.remove(hero3);
  console.log('Length:', heroesCollection.length); // Length: 0

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
