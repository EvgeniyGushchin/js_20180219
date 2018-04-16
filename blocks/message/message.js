(function () {
    'use strict';

    class Message {

        constructor(el, data) {
            this.el = el;
            this.data = data;
            this.render();

        }

        render() {

            this.el.innerHTML = `
                <form class="message pure-form">
                    <fieldset class="pure-group">
                        <input type="text" class="message__title pure-input-1-2" placeholder="Title">
                        <textarea class="message__input pure-input-1-2" placeholder="Add your message here..."></textarea>
                    </fieldset>
                    <button type="submit" class="button__message button-success pure-button">Publish</button>
                </form>
        `;

        }

    }

    window.Message = Message;
})();

