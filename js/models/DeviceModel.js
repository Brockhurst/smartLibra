define([
  'jquery',
  'underscore',
  'backbone',
  'dispatcher'
], function($, _, Backbone, dispatcher){

  var Device  = Backbone.Model.extend({
    url: SERVER_URL + '/devices',
    
    addNew: function () {
      var self = this;
      $.ajax({
            method: "POST",
            url: SERVER_URL + "/devices",
            data: {user_id: localStorage.getItem('id')}
          })
          .done(function(device) {
            if (device) {
              self.set(device);
              dispatcher.trigger('DeviceAdded', self);
            }
          });
    },
    
    initialize: function() {
      // this.fetch({
      //   success: this.fetchSuccess
      // });
    },

    fetchSuccess: function (collection, response) {

    }

  });

  return Device;
});
