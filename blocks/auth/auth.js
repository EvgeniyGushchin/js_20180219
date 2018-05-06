import template from './auth.pug';

export class Auth {

    constructor(el, data) {
        this.el = el;
        this.data = data;

        this.render();

        let form = this.el.querySelector('.auth');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const email = this.el.querySelector('.auth__name').value.slice();
            const password = this.el.querySelector('.auth__password').value.slice();

            this.onLogin(email, password);
        });

    }

    render() {
        this.el.innerHTML = template();
    }

    /**
     * @override
     */
    onLogin() {

    }

}

export const defaultLogin = 'user';
