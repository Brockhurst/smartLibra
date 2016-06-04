define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/CoinsList.html'
], function($, _, Backbone, coinsListTemplate){
  var CoinsListView = Backbone.View.extend({
    el: $('.coins-section'),
    render: function(collection){
      this.$el = $('.coins-section');
      var compiledTemplate = _.template(coinsListTemplate);
      this.$el.innerHTML = '';
      this.$el.append(compiledTemplate({coins: collection}));
    }
  });

  return CoinsListView;
});


