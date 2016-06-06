define([
  'jquery',
  'underscore',
  'backbone',
  'models/DeviceModel',
  'text!../../templates/Device.html',
  'text!../../templates/AddDevice.html',
  'dispatcher'
], function($, _, Backbone, DeviceModel, deviceTemplate, addTemplate, dispatcher){
  var DeviceView = Backbone.View.extend({
    el: $('.device'),

    render: function(device, add){
      this.$el = $('.device');
      this.$el.empty();
      var compiledTemplate;
      if (add) {
        compiledTemplate = _.template(addTemplate);
        this.$el.append(compiledTemplate({}));
        $('#add-device').click(this.addDevice);
      } else {
        compiledTemplate = _.template(deviceTemplate);
        this.$el.append(compiledTemplate({device: device}));
        $('#refresh').click(this.refresh);
      }

    },

    events: {
      'click #add-device' : 'addDevice',
      'click #refresh' : 'refresh'
    },

    addDevice: function (e) {
      e.preventDefault();
      dispatcher.trigger('AddDevice');
    },
    
    refresh: function (e) {
      e.preventDefault();
      dispatcher.trigger('Refresh');
    }
    
  });

  return DeviceView;
});
