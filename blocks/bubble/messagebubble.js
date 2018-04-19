(function () {
    'use strict';

    class MessageBubble {

        constructor(message, isOwners = false) {

            this.el = document.createElement('div');
            this.message = message;
            this.isOwners = isOwners;

            this.render();
        }

        render() {
            let arrowClass = this.isOwners ? "message__arrow--left" : "message__arrow--right";
            this.el.innerHTML = `
                <div class="message__bubble">
                    <div class="${arrowClass}"></div>
                    <span class="mesage__title">title</span></br>
                    <span>${this.message}</span>
                </div>
        `;

        }

    }

    window.MessageBubble = MessageBubble;
})();