import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAKyR9mJkLJMNo7mfHmaeF0DVmymC1cXqc",
    authDomain: "react-train-b92ad.firebaseapp.com",
    databaseURL: "https://react-train-b92ad.firebaseio.com",
    projectId: "react-train-b92ad",
    storageBucket: "react-train-b92ad.appspot.com",
    messagingSenderId: "867707212993",
    appId: "1:867707212993:web:a88724499c8935498d3040",
    measurementId: "G-PG33ZPM3V0"

};
firebase.initializeApp(config);

export default firebase;