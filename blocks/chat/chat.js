(function () {
    'use strict';

    class Chat {

        constructor(el) {
            this.el = el;
            this.render();
        }

        render() {
            this.el.innerHTML = `
                <div class="chat">
                    <span class="chat_title"></span>
                    <span class="chat_name"></span>
                    <span class="chat_message"></span>
                </div>`;
        }

        /**
         *
         * @param message - text of message
         * @param isOwner - true if message created by user and false if came from network
         */
        addMessage(message, isOwner) {
            let node = document.createElement('div');
            let bubble = new MessageBubble(node, message, isOwner);
            bubble.render();
            this.el.querySelector('.chat').appendChild(node);
        }

    }
    window.Chat = Chat;
})();
