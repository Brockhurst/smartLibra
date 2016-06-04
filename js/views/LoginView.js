define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/Login.html',
  'dispatcher'
], function($, _, Backbone, LoginTemplate, dispatcher){
  var LoginView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click #login-form-link' : 'swapLogin',
      'click #register-form-link' : 'swapRegister',
      'click #register-submit': 'registerSubmit',
      'click #login-submit': 'loginSubmit'
    },

    render: function(){
      var data = {};
      var compiledTemplate = _.template( LoginTemplate, data );
      this.$el.append( compiledTemplate );
    },

    swapLogin: function (e) {
      $("#login-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    },
    
    swapRegister: function (e) {
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    },
    
    registerSubmit: function (e) {
      e.preventDefault();
      $.ajax({
            method: "POST",
            url: SERVER_URL + "/auth",
            data: {password_confirmation: $('#confirm-password').val(), password: $('#reg-password').val(), email: $('#reg-email').val() }
          })
          .done(function( msg ) {
            if (msg.status === 'success') {
              dispatcher.trigger('RegistrationSuccess');
              alert('Registration success')
            }
          });
    },

    loginSubmit: function (e) {
      e.preventDefault();
      $.ajax({
            method: "POST",
            url: SERVER_URL + "/auth/sign_in",
            data: {password: $('#password').val(), email: $('#username').val() }
          })
          .done(function( msg ) {
            if (msg.data) {
              localStorage.setItem('id', msg.data.id);
              dispatcher.trigger('LoginSuccess');
            }
          });
    }

  });

  return LoginView;
});

