import {Auth, defaultLogin} from './auth/auth';
import {Chat} from './chat/chat';
import {Message} from './message/message';
import {request} from '../modules/utils';

window.addEventListener('DOMContentLoaded', () => {

    let auth = new Auth(document.querySelector('.js-auth'), {});
    let chat = new Chat(document.querySelector('.js-chat'), {});
    let message = new Message(document.querySelector('.js-message'), {});

    window.chat = chat;
    // window.message = message;
    window.auth = auth;

    let list;

    request('get', '/data/data.json')
        .then(
            data => {
                let promise = Promise.all(getAll(data));
                promise.then(
                    result => {
                        for (let i = 0; i < result.length ; i++) {
                            console.log(result[i]);
                        }
                    }
                );
            },
            err => console.log(err)
        )
        .then();

    function getAll(data) {
        let promises = [];
        for (let i = 0; i < data.length; i++) {
            promises.push(request('get', `/data/${data[i].user}.json`));
        }
        return promises;
    }
    // consooe.log(ilia, elina); // оба были выведены
});


//
//       index
//   /     \       \
//  Auth    Chat   Message
//           \
//           Message