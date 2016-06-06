var SERVER_URL = 'http://fast-fortress-60701.herokuapp.com';
// var SERVER_URL = 'http://192.168.0.87:3000';
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-1.12.3.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    dispatcher: 'dispatcher',
    bootstrap: 'utils/bootstrap.min'
  }

});

require([
  'app'
], function(App){
  App.initialize();
});
