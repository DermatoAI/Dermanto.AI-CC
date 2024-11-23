const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verifikasi Akun Anda",
    html: `<p>Terima kasih telah mendaftar! Klik link berikut untuk verifikasi akun Anda:</p><a href="${verificationLink}">${verificationLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email verifikasi dikirim ke ${email}`);
  } catch (error) {
    console.error("Gagal mengirim email verifikasi:", error);
    throw new Error("Terjadi kesalahan saat mengirim email verifikasi.");
  }
};

module.exports = sendVerificationEmail;
