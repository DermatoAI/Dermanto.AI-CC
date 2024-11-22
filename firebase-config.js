 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_JS-PUmCKjawROr3OQooQBhoV4BGLurg",
    authDomain: "dermato-ai-18fb4.firebaseapp.com",
    databaseURL: "https://dermato-ai-18fb4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dermato-ai-18fb4",
    storageBucket: "dermato-ai-18fb4.firebasestorage.app",
    messagingSenderId: "499984592323",
    appId: "1:499984592323:web:13f2cc34a2d162513a2176",
    measurementId: "G-DZLZPR8K9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
