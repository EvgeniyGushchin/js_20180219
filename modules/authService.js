import * as firebase from 'firebase/app';
import  'firebase/auth'

export function signIn(email, password) {

    return firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
}