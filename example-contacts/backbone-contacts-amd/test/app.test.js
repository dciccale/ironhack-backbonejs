define(['app', 'geppetto', 'localStorage'], function (app) {

  describe('app test suite', function () {

    it('dependencies should be available', function () {
      
      expect(jQuery).toBeDefined();
      expect($).toBeDefined();
      expect(jQuery).toEqual($);

      expect(_).toBeDefined();

      expect(Backbone).toBeDefined();
      expect(Backbone.Marionette).toBeDefined();
      expect(Backbone.Geppetto).toBeDefined();
      expect(Backbone.LocalStorage).toBeDefined();
      
      expect(app).toBeDefined();
    });
  });
});
