import {Auth, defaultLogin} from './auth/auth';
import {Chat} from './chat/chat';
import {Message} from './message/message';

window.addEventListener('DOMContentLoaded', () => {
    console.log(Auth);

    let auth = new Auth(document.querySelector('.js-auth'), {});
    let chat = new Chat(document.querySelector('.js-chat'), {});
    let message = new Message(document.querySelector('.js-message'), {});

    window.chat = chat;
    window.message = message;
    window.auth = auth;
});


//
//       index
//   /     \       \
//  Auth    Chat   Message
//           \
//           Message