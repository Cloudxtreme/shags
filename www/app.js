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

    $(document).ready(function() {
        document.getElementById('login').style.display = "block";
        const msg_list = document.getElementById('messages');

        document.forms.send_nickname.addEventListener('submit', function(e) {
            e.preventDefault();
            socket.emit('user nickname', document.forms.send_nickname.nickname.value);
            document.getElementById('login').style.display = "none";
            document.getElementById('chat').style.display = "block";
        });
        document.forms.send_message.addEventListener('submit', function(e) {
            e.preventDefault();
            socket.emit('chat message', document.forms.send_message.msg_text.value);
            document.forms.send_message.msg_text.value = "";
        });
        socket.on('user join', function(msg) {
            msg_list.insertBefore(makeElement('tr', [['class','user-join']], [
                makeElement('td', [], [
                    makeElement('span', [['class','material-icons']], 'fast_forward')
                ]),
                makeElement('td', [], `${msg} joined the group`)
            ]), msg_list.firstChild);
        });
        socket.on('user leave', function(msg) {
            console.log(`${msg} left the group`);
            msg_list.insertBefore(makeElement('tr', [['class','user-leave']], [
                makeElement('td', [], [
                    makeElement('span', [['class','material-icons']], 'fast_rewind')
                ]),
                makeElement('td', [], `${msg} left the group`)
            ]), msg_list.firstChild);
        });
        socket.on('chat message', function(msg) {
            msg_list.insertBefore(makeElement('tr', [], [
                makeElement('td', [], msg.from),
                makeElement('td', [], msg.message)
            ]), msg_list.firstChild);
        })
    });
})();
