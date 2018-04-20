import {MessageBubble} from '../bubble/messagebubble';
import template from './chat.pug';

export class Chat {

    constructor(el) {
        this.el = el;
        this.render();
    }

    render() {
        this.el.innerHTML = `
            <div class="chat"></div>`;
    }
    // render(text = '') {
    //     this.el.innerHTML += template({
    //         text
    //     });
    // }

    /**
     *
     * @param message - text of message
     * @param isOwner - true if message created by user and false if came from network
     */
    addMessage(message, isOwner) {
        let node = document.createElement('div');
        let bubble = new MessageBubble(message, isOwner);
        bubble.render();
        this.el.querySelector('.chat').appendChild(bubble.el);
    }

}

