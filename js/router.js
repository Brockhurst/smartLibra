define([
  'jquery',
  'underscore',
  'backbone',
  'views/ResultsListView',
  'views/CoinsListView',
  'views/LoginView',
  'views/DeviceView',
  'views/MenuView',
  'models/ResultCollection',
  'models/CoinsCollection',
  'models/CoinModel',
  'models/ResultModel',
  'models/DeviceModel',
  'text!../../templates/Menu.html',
  'dispatcher'
], function($, _, Backbone, ResultsListView, CoinsListView, LoginView, DeviceView, MenuView, ResultCollection, CoinsCollection, CoinModel, ResultModel, Device, MenuTemplate, dispatcher){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'showHistory',
      'coins': 'showCoins',
      'login': 'login',
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;

    var container = $('.container');
    
    var results = new ResultCollection();
    var coins = new CoinsCollection();

    var device = new Device();
    var deviceView = new DeviceView();
    var coinsListView = new CoinsListView();
    var resultsListView = new ResultsListView();
    var login = new LoginView();
    var menuView = new MenuView();
    menuView.render();

    app_router.listener = {};

    _.extend(app_router.listener, Backbone.Events);

    app_router.listener.listenTo(dispatcher, 'LoginSuccess', function () {
      menuView.render();
      app_router.navigate('', {trigger: true});
    });

    app_router.listener.listenTo(dispatcher, 'DeviceAdded', function (device) {
      deviceView.render(device);
    });
    
    app_router.listener.listenTo(dispatcher, 'SaveCoin', function (coin) {
      var newCoin  = new CoinModel();
      newCoin.addNew(coin);
    });

    app_router.listener.listenTo(dispatcher, 'CoinSaved', function (id) {
      resultsListView.markSaved(id);
    });

    app_router.listener.listenTo(dispatcher, 'AddDevice', function () {
      var device  = new DeviceModel();
      device.addNew();
    });

    app_router.listener.listenTo(dispatcher, 'Refresh', function (device) {
      results.fetch({
        data: {user_id: localStorage.getItem('id')},
        success: function (collection, response) {
          resultsListView.render(collection.models);
        }
      });
    });

    app_router.listener.listenTo(dispatcher, 'TabChanged', function (tab) {
      if (tab === 'Sign out') {
        app_router.navigate('login', {trigger: true});
        return;
      }
      app_router.navigate(tab.toLowerCase(), {trigger: true});
    });

    app_router.on('route:showHistory', function(){
      menuView.setActive('history');
      $(container).empty();
      $(container).append(_.template('<section class="device"></section><section class="results"></section>', {}));
      device.fetch({
        data: {user_id: localStorage.getItem('id')},
        success: function (collection, response) {
          if (response === null) {
            deviceView.render(device, true);
          } else {
            deviceView.render(device);
            results.fetch({
              data: {user_id: localStorage.getItem('id')},
              success: function (collection, response) {
                resultsListView.render(collection.models);
              }
            });
          }
        },
        error: function(e, er){
          if (er.status == '401') {
            app_router.navigate('login', {trigger: true});
          }
        }
      });
    });
    
    app_router.on('route:showCoins', function(){
      menuView.setActive('coins');
      $(container).empty();
      $(container).append(_.template('<section class="coins-section"></section>', {}));
      coins.fetch({
        data: {user_id: localStorage.getItem('id')},
        success: function (collection, response) {
          coinsListView.render(collection.models);
        }
      });
    });

    app_router.on('route:login', function(){
      $('header.main').empty();
      login.render();
    });
    
    app_router.on('route:defaultAction', function(actions){
      console.log('No route:', actions);
    });
    
    Backbone.history.start({});
  };
  return {initialize: initialize};
});
