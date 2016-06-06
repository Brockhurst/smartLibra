define([
  'jquery',
  'underscore',
  'backbone',
  'dispatcher'
], function($, _, Backbone, dispatcher){

  var Coin  = Backbone.Model.extend({
    url: '',

    initialize: function() {
    
    }, 
    
    addNew: function (coin) {
      $.ajax({
            method: "POST",
            url: SERVER_URL + "/coins",
            data: {user_id: localStorage.getItem('id'), coin: {
              name: coin.get('name'),
              release_year: coin.get('release_year'),
              weight: coin.get('weight'),
              radius: coin.get('radius'),
              result_id: coin.get('id')
            }}
          })
          .done(function( msg ) {
            dispatcher.trigger('CoinSaved', coin.get('id'));
          });

    }

  });

  return Coin;
});
