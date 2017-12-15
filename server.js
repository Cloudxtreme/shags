/**
 */
//
var express = require('express'),
    app     = express(),
    http    = require('http').Server(app),
    io      = require('socket.io')(http),
    fs      = require('fs'),
    path    = require('path'),
    toml    = require('toml'),
    Player  = require('./lib/Player');
//
const config = toml.parse(fs.readFileSync(`${__dirname}/settings.toml`, 'utf-8'));
const players = new Map();
const web_path = `${__dirname}/www`;

//
app.get('/', function(req, res){ res.sendFile(web_path + '/index.html'); });
app.get('/app.min.css', function(req, res){ res.sendFile(web_path + '/app.min.css'); });
app.get('/app.js', function(req, res){ res.sendFile(web_path + '/app.js'); });

//
io.on('connection', function(socket) {
    players.set(socket, new Player(socket));
    console.log(`-> There are now ${players.size} players`);

    socket.on('disconnect', function() {
        const pl = players.get(socket);
        players.delete(socket);
        if (pl.nickname === "") {
            sendMessage('user', 'leave', pl.nickname);
            console.log(`<- There are now ${players.size} players`);
        }
    });
    socket.on('user nickname', function(data) {
        players.get(socket).nickname = data;
        io.emit('user join', data);
    });
    socket.on('chat message', function(data) {
        io.emit('chat message', { from:players.get(socket).nickname, message:data });
    })
});

//
http.listen(config.server.port, function() {
    console.log(`Started server on *:${config.server.port}`);
});
