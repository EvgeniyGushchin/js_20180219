import {Auth, defaultLogin} from './auth/auth';
import {Chat} from './chat/chat';
import {Message} from './message/message';
import {request} from '../modules/utils';

window.addEventListener('DOMContentLoaded', () => {

    let auth = new Auth(document.querySelector('.js-auth'), {});
    let chat = new Chat(document.querySelector('.js-chat'), {});
    let message = new Message(document.querySelector('.js-message'), {});

    window.chat = chat;
    window.message = message;
    window.auth = auth;

    request('get', '/data/data.json')
        .then(
            data => {
                return Promise.all(getAllUsersFromList(data));
            },
            err => console.log(err)
        )
        .then(
            result => result.map(user => console.log(user))
        );

    function getAllUsersFromList(list) {
        return list.map(user => {
            return request('get', `/data/${user.user}.json`);
        });
    }
    // consooe.log(ilia, elina); // оба были выведены
});


//
//       index
//   /     \       \
//  Auth    Chat   Message
//           \
//           Message