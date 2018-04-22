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

    /**
     *
     * @param message - text of message
     * @param isOwner - true if message created by user and false if came from network
     */
    addMessage(message, isOwner) {
        let messageInfo = {
            message: message,
            userName: 'Ivan Ivanov',
            isOwner: isOwner,
            messageDate: Date.now()
        };
        let bubble = new MessageBubble(messageInfo);
        bubble.render();
        this.el.querySelector('.chat').appendChild(bubble.el);
    }

}

