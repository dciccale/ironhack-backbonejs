define([
  'geppetto',
  'commands/deletecontactcommand', 
], function (Geppetto, DeleteContactCommand) {
  'use strict'; 

  return Backbone.Geppetto.Context.extend({
    initialize: function () {
      this.mapCommand('contact:delete:confirm', DeleteContactCommand);
    }
  });

});
