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

  var hero1 = new HeroModel({id: 1, name: 'Iron Man'});
  var hero2 = new HeroModel({id: 2, name: 'Capitán América'});
  var hero3 = new HeroModel({id: 3, name: 'Hulk'});

  var heroesCollection = new HeroesCollection([hero1, hero2, hero3]);

  // By id
  console.log(heroesCollection.get(1).get('name')); // Iron Man

  // By cid
  console.log(heroesCollection.get(hero2.cid).get('name')); // Capitán América

  // 28 underscore helpful methods for working with Collections
  console.log(heroesCollection.findWhere({name: 'Hulk'}).get('name')); // Hulk
  console.log(heroesCollection.pluck('name'));

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
