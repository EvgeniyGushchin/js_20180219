(function () {
    'use strict';

    class TextInput {

        constructor(el, placeholder) {
            this.el = el;
            this.placeholder = placeholder;

            this.render();
        }

        render() {

            this.el.innerHTML = `
                  
                      <form class="textinput">
                         <br>
                         <textarea class="textinput__textarea" placeholder="${this.placeholder}"></textarea>
                         <br>
                         <input type = "submit" value = "submit" />
                      </form>
                  
                  
        `;

        }

    }

    window.TextInput = TextInput;
})();