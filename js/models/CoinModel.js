define([
  'jquery',
  'underscore',
  'backbone',
  'dispatcher'
], function($, _, Backbone, dispatcher){

  var Coin  = Backbone.Model.extend({
    url: '',

    initialize: function() {

    }

  });

  return Coin;
});
