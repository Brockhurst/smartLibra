define([
  'jquery',
  'underscore',
  'backbone',
  'dispatcher'
], function($, _, Backbone, dispatcher){

  var Device  = Backbone.Model.extend({
    url: SERVER_URL + '/devices',
    
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
