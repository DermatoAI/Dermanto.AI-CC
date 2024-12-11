const admin = require('firebase-admin');
const credentials = require('../../firebase-key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: process.env.BUCKET_STORAGE
});

const db = admin.firestore();

module.exports = db;