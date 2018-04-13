(function () {
    'use strict';

    class MessageBubble {

        constructor(el, message) {
            this.el = el;
            this.message = message;

            this.render();
        }

        render() {

            this.el.innerHTML = `
                <div class="message__bubble">
                    <div class="message__arrow--right"></div>
                    ${this.message}
                </div>
        `;

        }

    }

    window.MessageBubble = MessageBubble;
})();