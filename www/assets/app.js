/**
 */
//
window.addEventListener('error', function(e) {
    alert(e.message);
});

//
class ShagsGame {
    constructor() {
    }
    on(event) {
    }
}

//
const shags_games = new Map();

//
const socket = io();
socket.on('shags_message', function(message) {
    switch (message.app) {
        case 'user': return (() => {
            shags_games.get(location.hash.substring(2)).on(message.event);
        })();
        case 'chat': (function() {
            shags_games.get(message.app).on(message.event, message.data);
        })();
    }
});

//
function makeElement(tag, attrs=[], text) {
    var el = document.createElement(tag);
    attrs.forEach(v => el.setAttribute(v[0], v[1]));
    if (typeof text === 'string') el.innerHTML = text;
    if (typeof text === 'object') text.forEach(v => el.appendChild(v));
    return el;    
}

//
function shags_send_message(app, event, data) {
    socket.emit('shags_message', { app, event, data });
}

//
function shags_init_page(sid) {
    switch (sid) {
        case 'select_nickname': return (function() {
            document.forms.send_nickname.addEventListener('submit', function(e) {
                e.preventDefault();
                shags_send_message('user', 'set_nickname', document.forms.send_nickname.nickname.value);
                location.assign('#/select_game');
            });
        });
        case 'select_game': return (function() {
            document.forms.game_select.elements.game.addEventListener('change', function(e) {
                location.assign(`#/${e.target.value}`);
            });
        });
        case 'chat': return (function() {
            shags_send_message('user', 'goto_room', 'chat');
            document.forms.send_message.addEventListener('submit', function(e) {
                e.preventDefault();
                shags_send_message('chat', 'new_message', document.forms.send_message.msg_text.value);
                document.forms.send_message.msg_text.value = "";
            });
        });
    }
}

//
(function() {
    $(document).ready(function() {
        const router = new (class extends Router {
            constructor() {
                super('assets', {extension:'.corgi'});
            }
            processFile(src) {
                return corgi.compile(src);
            }
            setPageContent(con, op) {
                super.setPageContent(con, op);
                shags_init_page(document.querySelectorAll('section')[0].getAttribute('id'))();
            }
        })();
        router.start(document.querySelector('main'));
    });
})();
