/**
 */
//
(function() {
    shags_games.set('chat', new (class extends ShagsGame {
        constructor() {
            super();
        }
        add_message_raw(el1, el2) {
            const msg_list = document.getElementById('messages');
            msg_list.insertBefore(makeElement('div', [['tr','']], [el1, el2]), msg_list.firstChild);
        }
        add_message(name, message) {
            this.add_message_raw(
                makeElement('div', [['td','']], name),
                makeElement('div', [['td','']], message)
            );
        }
        on(event, data) {
            switch (event) {
                case 'user_join': return (() => {
                    this.add_message_raw(
                        makeElement('div', [['td',''],['class','user-join']], [
                            makeElement('span', [['class','material-icons']], 'fast_forward')
                        ]),
                        makeElement('div', [['td','']], `${data} joined the group`)
                    );
                })();
                case 'user_leave': return (() => {
                    this.add_message_raw(
                        makeElement('div', [['td',''],['class','user-leave']], [
                            makeElement('span', [['class','material-icons']], 'fast_rewind')
                        ]),
                        makeElement('div', [['td','']], `${data} left the group`)
                    )
                })();
                case 'new_message': return (() => {
                    this.add_message(data.from, data.message);
                })();
            }
        }
    })())
})();
