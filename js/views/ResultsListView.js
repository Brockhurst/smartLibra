define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/ResultsList.html'
], function($, _, Backbone, resultsListTemplate){
  var ResultsListView = Backbone.View.extend({
    el: $('.results'),

    render: function(collection){
      this.$el = $('.results');
      this.$el.empty();
      this.collection = collection;
      var compiledTemplate = _.template(resultsListTemplate );
      this.$el.append( compiledTemplate({results: collection.reverse()}));
      _.bindAll(this, 'saveResult');
      $('.result-save').click(this.saveResult);

    },

    events: {
      'click .result-save' : 'saveResult'
    },
    
    saveResult: function (e) {
      e.preventDefault();
      var id = $(e.target).attr('data-id');
      var coin;
      _.each(this.collection, function(result){
        if (result.get('id') == id) {
          coin = result;
        }
      });
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
            alert('success');
            $('button[data-id=' + id +']').addClass('saved');
            $('button[data-id=' + id +']').html('Added');
          });

    }

  });

  return ResultsListView;
});

