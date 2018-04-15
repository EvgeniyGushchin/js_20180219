(function () {
    'use strict';
    class Chat {

        constructor(el) {
            this.el = el;
            this.render();
        }

        render() {
            this.el.innerHTML = `
            <div class = chat></div>
            `;
        }

        addMessage() {
            
        }

    }
    window.Chat = Chat;
})();