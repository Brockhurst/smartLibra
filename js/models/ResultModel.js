define([
  'jquery',
  'underscore',
  'backbone',
  'dispatcher'
], function($, _, Backbone, dispatcher){

  var Result  = Backbone.Model.extend({
    url: '',

    initialize: function() {

    }

  });

  return Result;
});

