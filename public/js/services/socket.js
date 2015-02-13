var appProviders = angular.module('chatApp.services', [])

appProviders.factory('socket', function ($rootScope) {
  var socket = io.connect(window.location.origin);
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        console.log(args);
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

appProviders.constant('config', {
  appName: 'ChatApp'
});
