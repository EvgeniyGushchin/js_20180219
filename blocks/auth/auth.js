import template from './auth.pug';

export class Auth {

    constructor(el, data) {
        this.el = el;
        this.data = data;

        this.render();

        let form = this.el.querySelector('.auth');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const name = this.el.querySelector('.auth__name').value.slice();
            const password = this.el.querySelector('.auth__password').value.slice();

            const authenticated = name && password;

            if (authenticated) {
                console.log(`Hi, ${name}`);
                localStorage.setItem('authenticated', true);

                // тапорненько перерисовываем.
                window.chat.render();
                window.message.render();
                this.render();

                // запишем в виндоу юзера тоже думаю временно
                localStorage.setItem('user', name);
            }
            else {
                console.log('Authorization failed');
            }
        });

    }

    render() {
        this.el.innerHTML = template();
    }

}

export const defaultLogin = 'user';
