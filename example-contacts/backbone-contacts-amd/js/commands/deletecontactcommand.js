define(['views/contactview'], function (ContactView) {
  'use strict';

  var command;
  command = function () {};
  command.prototype.execute = function () {
    var me = this;
    this.context.model.destroy({
      success: function () {
        me.context.vent.trigger('contact:delete:after');
      }
    });
  };
  return command;
});
