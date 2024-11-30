const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const dbPool = require('../config/database.js');
require('dotenv').config();

// OAuth
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `http://localhost:3000/auth/google/callback`
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
})

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

        const connection = await dbPool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length > 0) {
                res.json({
                    message: 'User already exists in database',
                    user: rows[0],
                });
            } else {
                const insertQuery = 'INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)';
                await connection.query(insertQuery, [email, name, null, 'user']);

                res.json({
                    message: 'New user added to database',
                    user: { email, name, picture },
                });
            }
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Error during Google callback:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});


module.exports = router;