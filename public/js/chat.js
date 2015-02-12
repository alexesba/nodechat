var app = angular.module('chatApp', ['chatApp.controllers', 'chatApp.services']);


// var server = io.connect('http://localhost:8080');
// server.on('connect', function(data){
  // $('status').html('Conected to chat');
  // nickname = 'alexesba'; //prompt('What is your nickname?');
  // $('#messages').empty();
  // server.emit('join', nickname);
// });
// server.on('messages', function(data){
//   $('#messages').append("<li>"+data+"</li>");
// });
//
// server.on('add chatter', function(name){
//   var chatter = $('<li data-name="'+name+'">'+name+'</li>');
//   $('#chatters').append(chatter);
// });
//
// server.on('remove chatter', function(name){
//   $('#chatters  li[data-name="'+ name +'"]').remove();
// });

// $(document).ready(function(){
//   $('form#chat_form').submit(function(e){
//     e.preventDefault(e);
//     var message = $('#chat_input').val();
//     // server.emit('messages', message);
//   });
// });
