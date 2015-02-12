var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();
var storeMessages = function(name, data){
  var message = JSON.stringify({ name: name, data: data });
  redisClient.lpush('messages', message, function(err, response){
    redisClient.ltrim('messages', 0, 9);
  });
}

io.on('connection', function(client){

  client.on('join', function(name){
    client.nickname = name;
    client.emit('add chatter', name);
    client.broadcast.emit('add chatter', name);

    redisClient.sadd('chatters', name);
    redisClient.smembers('names',  function(err, names){
      names.forEach(function(name){
        client.emit('add chatter', name);
      });
    });

    redisClient.lrange('messages', 0, -1, function(err, messages){
      messages = messages.reverse();
      messages.forEach(function(message){
        message = JSON.parse(message);
        client.emit('messages', message.name + ':' + message.data);
      });
    });
  });

  client.on('disconnect', function(name){
    client.broadcast.emit('remove chatter', client.nickname);
    redisClient.srem('chatters', client.nickname);
  });

  client.on('messages', function(message){
    var nickname = client.nickname;
    client.broadcast.emit('messages', nickname + ': ' + message);
    client.emit('messages', nickname + ': ' + message);
    storeMessages(nickname, message);
  });
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
console.log('Listen on the port: 8080');
