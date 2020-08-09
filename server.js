let http = require('http').Server();
let io = require('socket.io')(http);
let Redis = require('ioredis');
const { functionsIn } = require('lodash');

let redis = new Redis();
redis.psubscribe('chat.*');
redis.on('pmessage', function(pattern, channel, message){
    console.log('Message Received: ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});

const users = [];
redis.subscribe('login');
redis.on('message', function(channel, data){
    console.log('User subsribe ' + data);
    data = JSON.parse(data);
    users.push({"user": data.data});
    io.emit(channel + ':' + data.event, data.data.user);
})

http.listen(3000, function(){
    console.log('Listening posrt: 3000');
});