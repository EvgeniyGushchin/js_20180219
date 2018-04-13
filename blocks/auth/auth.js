(function () {
    'use strict';

    class Auth {

        constructor(el, data) {
            this.el = el;
            this.data = data;

            this.render();

            let form = this.el.querySelector('form');

            form.addEventListener('submit', event => {
                event.preventDefault();
                console.log('login');
            });

        }

        render() {

            this.el.innerHTML = `
                <form class="auth">
                    <input class="auth__name" name="login"/>Login
                    <button class="auth__submit">Login</button>
                </form>
        `;

        }

    }

    window.Auth = Auth;
})();