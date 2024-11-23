const { firebaseAuth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification } = require("../config/firebase-config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Joi = require("joi");

const JWT_SECRET = process.env.JWT_SECRET;

const loginWithGoogle = async (req, res) => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const user = result.user;

    let existingUser = await User.findOne({ where: { email: user.email } });
    
    if (!existingUser) {
      return res.status(400).json({ message: "Akun Google ditemukan, silakan lengkapi profil Anda dengan username dan birthdate." });
    }

    const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    res.status(200).json({
      message: "Login berhasil",
      token,
      user: { id: existingUser.id, email: existingUser.email, username: existingUser.username }
    });

  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

const signupWithGoogle = async (req, res) => {
  const { username, birthdate } = req.body;
  const user = req.user;

  const signupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    birthdate: Joi.date().required(),
  });

  const { error } = signupSchema.validate({ username, birthdate });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newUser = await User.create({
      email: user.email,
      username,
      birthdate,
      isVerified: false,
    });

    const verificationToken = jwt.sign({ id: newUser.id }, JWT_SECRET, {
      expiresIn: process.env.VERIFY_TOKEN_EXPIRATION,
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(user.email, verificationLink);

    res.status(201).json({
      message: "Pendaftaran berhasil, cek email untuk verifikasi akun Anda",
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

const sendVerificationEmail = async (email, verificationLink) => {
  const transporter = require("../config/emailVerif");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verifikasi Akun Anda",
    html: `<p>Terima kasih telah mendaftar! Klik link berikut untuk verifikasi akun Anda:</p><a href="${verificationLink}">${verificationLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Gagal mengirim email verifikasi:", error);
    throw new Error("Terjadi kesalahan saat mengirim email verifikasi.");
  }
};

module.exports = { loginWithGoogle, signupWithGoogle };