(function () {
    'use strict';

    class TextInput {

        constructor(el, message) {
            this.el = el;
            this.message = message;

            this.render();
        }

        render() {

            this.el.innerHTML = `
                  
                      <form class="textinput">
                         <br>
                         <textarea class="textinput__textarea">${this.message}</textarea>
                         <br>
                         <input type = "submit" value = "submit" />
                      </form>
                  
                  
        `;

        }

    }

    window.TextInput = TextInput;
})();