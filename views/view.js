export class View {
    constructor(el){
        this.el = document.createElement('div');
        el.appendChild(this.el);
    }

    toggle(state) {
        this.el.hidden = !state;
    }
}