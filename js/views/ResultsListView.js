define([
  'jquery',
  'underscore',
  'backbone',
  'dispatcher',
  'text!../../templates/ResultsList.html'
], function($, _, Backbone, dispacther, resultsListTemplate){
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

      if (!($(e.target).hasClass('saved'))) {
        var id = $(e.target).attr('data-id');
        var coin;
        _.each(this.collection, function(result){
          if (result.get('id') == id) {
            coin = result;
          }
        });

        dispacther.trigger('SaveCoin', coin);
      }

    },

    markSaved: function (id) {
      alert('success');
      $('button[data-id=' + id +']').addClass('saved');
      $('button[data-id=' + id +']').html('Added');
    }

  });

  return ResultsListView;
});

