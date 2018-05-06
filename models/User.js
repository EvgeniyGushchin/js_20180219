import {signIn} from '../modules/authService'

export class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.name = '';
        this.surname = '';
        this.role = '';
    }

    signIn() {
        return signIn(this.email, this.password);
    }

    signUp() {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }
}