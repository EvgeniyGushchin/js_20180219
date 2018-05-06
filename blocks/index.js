import {AuthView} from '../views/auth/authview'
import {ChatView} from '../views/chat/chatview'
import {Router} from "../modules/router"
import "../style.scss"

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/messaging';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDF6wIln13Oss6t8vlazoVK_K2XWtG6D4E",
    authDomain: "simplechat-ed872.firebaseapp.com",
    databaseURL: "https://simplechat-ed872.firebaseio.com",
    projectId: "simplechat-ed872",
    storageBucket: "simplechat-ed872.appspot.com",
    messagingSenderId: "1059498701460"
};
firebase.initializeApp(config);


window.addEventListener('DOMContentLoaded', () => {

    let router = new Router();

    router.register('chat', new ChatView(document.body));
    router.register('auth', new AuthView(document.body));

    router.start();
});

