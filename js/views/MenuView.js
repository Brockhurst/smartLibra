define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/Menu.html',
  'dispatcher'
], function($, _, Backbone, menuTemplate, dispatcher){
  var MenuView = Backbone.View.extend({
    el: $('header.main'),
    render: function(){
      var data = {};
      var compiledTemplate = _.template(menuTemplate, data );
      this.$el.append( compiledTemplate);
    },

    events: {
      'click .navbar a' : 'changeTab'
    },

    changeTab: function (e) {
      e.preventDefault();
      dispatcher.trigger('TabChanged', $(e.target).html());
    },
    
    setActive: function (tab) {
      $('.navbar li').removeClass('active');
      $('.navbar li.' + tab).addClass('active');
    }
    
  });

  return MenuView;
});


