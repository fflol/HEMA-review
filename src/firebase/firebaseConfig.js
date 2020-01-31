import * as fb from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyDk7aOpjxLcbEnJjhU-VvbZ4FA5_5x_VGk",
    authDomain: "hema-gear-review.firebaseapp.com",
    databaseURL: "https://hema-gear-review.firebaseio.com",
    projectId: "hema-gear-review",
    storageBucket: "hema-gear-review.appspot.com",
    messagingSenderId: "832768302338",
    appId: "1:832768302338:web:ab9edfb3b284446e37f61b",
    measurementId: "G-HSG8ZGX11E"
};

export const firebase = !fb.apps.length
    ? fb.initializeApp(firebaseConfig)
    : fb.app();
