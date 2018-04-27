import {AuthView} from '../views/auth/authview'
import {ChatView} from '../views/chat/chatview'
import {Router} from "../modules/router";
import '../style.scss'

window.addEventListener('DOMContentLoaded', () => {

    let router = new Router();

    router.register('chat', new ChatView(document.body));
    router.register('auth', new AuthView(document.body));

    router.start();
});

