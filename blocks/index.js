import {Auth, defaultLogin} from './auth/auth';
import {Chat} from './chat/chat';
import {Message} from './message/message';
import {request} from '../modules/utils';

window.addEventListener('DOMContentLoaded', () => {
    console.log(Auth);

    let auth = new Auth(document.querySelector('.js-auth'), {});
    let chat = new Chat(document.querySelector('.js-chat'), {});
    let message = new Message(document.querySelector('.js-message'), {});

    window.chat = chat;
    window.message = message;
    window.auth = auth;

    console.log(`${1+1} test`);

    let list;

    request('get', '/data/data.json')
        .then(
            data => request('get', `/data/${data[0].user}.json`),
            err => console.log(err));

    // consooe.log(ilia, elina); // оба были выведены
});


//
//       index
//   /     \       \
//  Auth    Chat   Message
//           \
//           Message