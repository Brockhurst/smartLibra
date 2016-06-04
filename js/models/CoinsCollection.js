define([
  'jquery',
  'underscore',
  'backbone',
  'models/CoinModel',
  'dispatcher'
], function($, _, Backbone, CoinModel, dispatcher){

  var Coins  = Backbone.Collection.extend({
    url: SERVER_URL + '/coins',

    model: CoinModel,

    initialize: function() {
    }

  });

  return Coins;
});

