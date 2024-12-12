const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const axios = require('axios');
const db = require('../config/firestore-config');
const { Timestamp } = require('firebase-admin/firestore');
require('dotenv').config();

// OAuth
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `http://localhost:3000/auth/google/callback`
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
});

const verifyGoogleToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Access denied. No token provided.',
        });
    }

    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
        const data = response.data;

        const email = data.email;
        const username = email.split('@')[0];
        try {
            const userSnapshot = await db.collection('users').where('username', '==', username).get();
            if (!userSnapshot.empty) {
                next();
            } else {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found in the database.',
                });
            }
        } catch (error) {
            console.error('Error interacting with Firestore:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }

    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid or expired token.',
        });
    }
};

// Google login
router.get('/', (req, res) => {
    res.redirect(authorizationUrl);
});

// Google callback login

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(401).json({
            status: 'fail',
            message: 'Authorization code is missing'
        });
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        
        if (!tokens) {
            return res.status(400).json({ message: 'Failed to get tokens from Google' });
        }
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const { data } = await oauth2.userinfo.get();
        
        if (!data) {
            return res.status(400).json({ message: 'Failed to fetch user data' });
        }

        const { email, name, picture } = data;
        const username = email.split('@')[0];

        try {
            const userSnapshot = await db.collection('users').where('username', '==', username).get();
            
            if (userSnapshot.empty) {
                const userRef = db.collection('users').doc(username);
                await userRef.set({
                    username: username,
                    name: name,
                    email: email,
                    birth_date: null,
                    picture: picture,
                    password: null,
                    create_at: Timestamp.now(),
                    updated_at: null,
                    access_token: tokens.access_token || null,
                    refresh_token: tokens.refresh_token || null
                });

                res.json({
                    message: 'New user added to database',
                    user: { username, email, name, picture },
                });
            } else {
                const userDoc = userSnapshot.docs[0];
                const userRef = db.collection('users').doc(userDoc.id);
                await userRef.update({
                    username: username,
                    name: name,
                    email: email,
                    birth_date: null,
                    picture: picture,
                    password: null,
                    updated_at: Timestamp.now(),
                    access_token: tokens.access_token || null,
                    refresh_token: tokens.refresh_token || null
                });

                res.json({
                    message: 'User already exists, tokens updated',
                    user: userDoc.data(),
                });
            }
        }catch(error) {
            console.error('Error interacting with Firestore:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }

    }catch(error) {
        console.error('Error during Google callback:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.get('/protected', verifyGoogleToken, (req, res) => {
    res.json({
        message: 'Access granted to protected resource',
        user: req.user
    });
});

module.exports = router;