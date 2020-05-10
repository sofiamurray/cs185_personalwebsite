import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCLS11cS3qn6tUoujpBYgoXdof5PDl24e0",
    authDomain: "cs185-guestbook.firebaseapp.com",
    databaseURL: "https://cs185-guestbook.firebaseio.com",
};
firebase.initializeApp(config);
export default firebase;