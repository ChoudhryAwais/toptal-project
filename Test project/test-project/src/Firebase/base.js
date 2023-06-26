import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1ldlkX97T_8nWPAmNQNa2yydexPwdIA4",
    authDomain: "test-project-ad2fd.firebaseapp.com",
    projectId: "test-project-ad2fd",
    storageBucket: "test-project-ad2fd.appspot.com",
    messagingSenderId: "970002421552",
    appId: "1:970002421552:web:f65ee90b7d9d5375cedaf5",
    measurementId: "G-RNWZ73L1WP"
};
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
