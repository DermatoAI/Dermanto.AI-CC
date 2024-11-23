const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification } = require("firebase/auth");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyIdToken = (idToken) => {
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log("UID:", uid);
    })
    .catch((error) => {
      console.log("Error verifying ID token:", error);
    });
};

const googleProvider = new GoogleAuthProvider();

module.exports = { googleProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification, verifyIdToken };
