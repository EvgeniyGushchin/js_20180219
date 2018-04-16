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
                            <form class="auth pure-form">
                                    <input class="auth__name" type="text" placeholder="Login">
                                    <input class="auth__pass" type="password" placeholder="Password">
                            
                                    <button type="submit" class=" auth__submit pure-button pure-button-primary">Sign in</button>
                            </form> `;

        }

    }

    window.Auth = Auth;
})();

