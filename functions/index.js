/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);

    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long.",
      });
    }

    const userResponse = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false,
    });

    const user = await admin.auth().getUser(userResponse.uid);
    await admin.auth().generateEmailVerificationLink(user.email);

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({
        error: "Email is already in use.",
      });
    } else if (error.code === "auth/invalid-password") {
      return res.status(400).json({
        error: "Password is invalid or does not meet requirements.",
      });
    }

    res.status(500).json({
      error: "Internal Server Error. Please try again later.",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const userRecord = await admin.auth().getUserByEmail(email);

    if (!userRecord) {
      return res.status(400).json({
        error: "User not found. Please register first.",
      });
    }

    if (!userRecord.emailVerified) {
      return res.status(400).json({
        error: "Please verify your email before logging in.",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: userRecord,
    });
  } catch (error) {
    console.error("Error logging in user:", error);

    if (error.code === "auth/user-not-found") {
      return res.status(400).json({
        error: "User not found.",
      });
    }

    res.status(500).json({
      error: "Internal Server Error during login.",
    });
  }
});

app.post("/google-login", async (req, res) => {
  try {
    const {idToken} = req.body;

    if (!idToken) {
      return res.status(400).json({
        error: "ID token is required.",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const user = await admin.auth().getUser(uid);

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error during Google login:", error);

    if (error.code === "auth/argument-error") {
      return res.status(400).json({
        error: "Invalid ID token.",
      });
    }

    res.status(500).json({
      error: "Internal Server Error during Google login.",
    });
  }
});

app.post("/reset-password", async (req, res) => {
  const {email} = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required.",
    });
  }

  try {
    await admin.auth().sendPasswordResetEmail(email);
    res.status(200).json({
      message: "Password reset email sent.",
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({
      error: "Failed to send password reset email.",
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is working!");
});


exports.app = functions.https.onRequest(app);
