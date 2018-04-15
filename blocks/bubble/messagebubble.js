(function () {
    'use strict';

    class MessageBubble {

        constructor(el, message, isOwners = false) {
            this.el = el;
            this.message = message;
            this.isOwners = isOwners;

            this.render();
        }

        render() {
            let arrowClass = this.isOwners ? "message__arrow--left" : "message__arrow--right";
            this.el.innerHTML = `
                <div class="message__bubble">
                    <div class="${arrowClass}"></div>
                    ${this.message}
                </div>
        `;

        }

    }

    window.MessageBubble = MessageBubble;
})();