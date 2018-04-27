import  {View} from '../view'
import {Message} from "../../blocks/message/message";
import {Chat} from "../../blocks/chat/chat";

export class ChatView extends View {

    constructor(el){
        super(el);

        this.chat = new Chat(document.createElement('div'), {});
        this.message = new Message(document.createElement('div'), {});

        this.el.appendChild(this.chat.el);
        this.el.appendChild(this.message.el);

        this.message.insertMessage = (text) => {
            this.chat.addMessage(text, true);
        };
    }
}