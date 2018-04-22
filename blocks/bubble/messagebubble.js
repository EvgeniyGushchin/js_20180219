import template from './messagebubble.pug';

export class MessageBubble {

    constructor(el, message, isOwner = false) {

        this.el = document.createElement('div');

        this.message = message;
        this.isOwner = isOwner;

        this.render();
    }

    render() {
        let arrowClass = this.isOwner ? "messagebubble__arrow--left" : "messagebubble__arrow--right";

        this.el.innerHTML = template({
            arrowclass: arrowClass,
            title: "title",
            message: this.message
        });
    }

}