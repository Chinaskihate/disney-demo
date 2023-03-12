// Import the functions you need from the SDKs you need
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import firebase from "firebase/compat";
// https://firebase.google.com/docs/web/setup#available-libraries

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp({
        apiKey: "AIzaSyCayaEVbEVM_aQVAYxZgBdAtPztu1SBNlM",
        authDomain: "disneydemo-f35a7.firebaseapp.com",
        projectId: "disneydemo-f35a7",
        storageBucket: "disneydemo-f35a7.appspot.com",
        messagingSenderId: "847132612637",
        appId: "1:847132612637:web:7f9787e16a5ea72b140ef4",
        measurementId: "G-F5FQFRK9ZT"
    })
} else {
    app = firebase.app()
}

const auth = firebase.auth();
const db = firebase.firestore()

export {app, auth, db, getFirestore, doc, setDoc, getDoc};