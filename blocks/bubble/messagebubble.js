import template from './messagebubble.pug';

export class MessageBubble {

    constructor(messageInfo) {

        this.el = document.createElement('div');

        this.message = messageInfo.message;
        this.isOwner = messageInfo.isOwner;
        this.title = this.titleFromInfo(messageInfo);

        this.render();
    }

    render() {
        let arrowClass = this.isOwner ? "messagebubble__arrow--left" : "messagebubble__arrow--right";

        this.el.innerHTML = template({
            arrowclass: arrowClass,
            title: this.title,
            message: this.message
        });
    }

    titleFromInfo(info) {

        if (!info.messageDate) {
            return info.userName;
        }
        
        let options = {
            hour: '2-digit',
            minute: '2-digit'
        };

        let time = new Date(info.messageDate).toLocaleString('ru-ru', options);

        return `${info.userName} at ${time}`;
    }

}