export class MessageBubble {

    constructor(el, message, isOwners = false) {

        this.el = document.createElement('div');

        this.message = message;
        this.isOwners = isOwners;

        this.render();
    }

    render() {
        let arrowClass = this.isOwners ? "messagebubble__arrow--left" : "messagebubble__arrow--right";
        this.el.innerHTML = `
                <div class="messagebubble">
                    <div class="${arrowClass}"></div>
                    <span class="messagebubble__title">title</span></br>
                    <span>${this.message}</span>
                </div>
        `;

    }

}