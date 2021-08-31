// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const config = {
    apiKey: "AIzaSyAsS0OrzLTxLE4YztDZ4ZnhmoxUEmR8MKk",
    authDomain: "commerce-c1439.firebaseapp.com",
    projectId: "commerce-c1439",
    storageBucket: "commerce-c1439.appspot.com",
    messagingSenderId: "764187713244",
    appId: "1:764187713244:web:c088e7b290143afa891e19"
};
// initialize firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();