define([
  'jquery',
  'underscore',
  'backbone',
  'models/ResultModel',
  'dispatcher'
], function($, _, Backbone, ResultModel, dispatcher){

  var Results  = Backbone.Collection.extend({
    url: SERVER_URL + '/results',

    model: ResultModel,

    initialize: function() {
    }

  });

  return Results;
});

