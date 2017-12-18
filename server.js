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
app.use('/assets', express.static('www/assets', { dotfiles: 'allow' }))

//
function sendMessage(app, event, data) {
    io.to(app).emit('shags_message', { app, event, data });
}

//
io.on('connection', function(socket) {
    players.set(socket, new Player(socket));
    console.log(`-> There are now ${players.size} players`);

    socket.on('disconnect', function() {
        const pl = players.get(socket);
        players.delete(socket);
        sendMessage(pl.game, 'user_leave', pl.nickname);
        console.log(`<- There are now ${players.size} players`);
    });
    socket.on('shags_message', function(message) {
        switch (message.app) {
            case 'user': return (() => {
                switch (message.event) {
                    case 'set_nickname': return (() => {
                        players.get(socket).nickname = message.data;
                    })();
                    case 'goto_room': return (() => {
                        socket.join(message.data);
                        const pl = players.get(socket);
                        pl.game = message.data;
                        sendMessage(message.data, 'user_join', pl.nickname);
                    })();
                }
            })();
            case 'chat': return (() => {
                switch (message.event) {
                    case 'new_message': return (() => {
                        sendMessage('chat', 'new_message', { from:players.get(socket).nickname, message:message.data });
                    })();
                }
            })();
        }
    })
});

//
http.listen(config.server.port, function() {
    console.log(`Started server on *:${config.server.port}`);
});
