// backend/utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"No-Reply" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw new Error("Gửi email thất bại");
  }
};

module.exports = sendEmail;
