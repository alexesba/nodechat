angular.module('chatApp.controllers', []).
controller('chatCtrl',['$scope','socket','config', function($scope, socket, config){

  $scope.currentMessage = '';
  $scope.username = '';
  $scope.logedin = false;
  $scope.settings = config;

  socket.on('connect', function(){
    console.log('connection stablish!');
  });


  socket.on('messages', function(data){
    $('#messages').append("<li>"+data+"</li>");
  });

  socket.on('add chatter', function(){
    var name = $scope.username;
    var chatter = $('<li data-name="'+name+'">'+name+'</li>');
    $('#chatters').append(chatter);
  });

  socket.on('remove chatter', function(name){
    $('#chatters  li[data-name="'+ name +'"]').remove();
  });

  $scope.sendMessage = function(e){
    socket.emit('messages', $scope.currentMessage);
  }

  $scope.setUsername = function(){
    socket.emit('join', $scope.username);
    $scope.logedin = $scope.username != ''
  }


}]);

