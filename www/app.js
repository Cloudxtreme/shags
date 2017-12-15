/**
 */
//
window.addEventListener('error', function(e) {
    alert(e.message);
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
(function() {
    const socket = io();

    function sendMessage(app, event, data) {
        socket.emit('shags_message', { app, event, data });
    }

    $(document).ready(function() {
        document.getElementById('login').style.display = "block";
        const msg_list = document.getElementById('messages');

        document.forms.send_nickname.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage('user', 'nickname', document.forms.send_nickname.nickname.value);
            document.getElementById('login').style.display = "none";
            document.getElementById('chat').style.display = "block";
        });
        document.forms.send_message.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage('chat', 'new_message', document.forms.send_message.msg_text.value);
            document.forms.send_message.msg_text.value = "";
        });
        socket.on('shags_message', function(message) {
            switch (message.app) {
                case 'user': {
                    switch (message.event) {
                        case 'join': {
                            msg_list.insertBefore(makeElement('tr', [['class','user-join']], [
                                makeElement('td', [], [
                                    makeElement('span', [['class','material-icons']], 'fast_forward')
                                ]),
                                makeElement('td', [], `${message.data} joined the group`)
                            ]), msg_list.firstChild);
                            break;
                        }
                        case 'leave': {
                            msg_list.insertBefore(makeElement('tr', [['class','user-leave']], [
                                makeElement('td', [], [
                                    makeElement('span', [['class','material-icons']], 'fast_rewind')
                                ]),
                                makeElement('td', [], `${message.data} left the group`)
                            ]), msg_list.firstChild);
                            break;
                        }
                    }
                    break;
                }
                case 'chat': {
                    switch (message.event) {
                        case 'new_message': {
                            msg_list.insertBefore(makeElement('tr', [], [
                                makeElement('td', [], message.data.from),
                                makeElement('td', [], message.data.message)
                            ]), msg_list.firstChild);
                            break;
                        }
                    }
                    break;
                }
            }
        });
    });
})();
