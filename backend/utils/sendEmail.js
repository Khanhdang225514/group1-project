// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  try {
    // Tạo transporter Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // Gmail dùng App Password
        pass: process.env.SMTP_PASS, // App Password
      },
    });

    // Tùy chỉnh gửi email
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'Nhóm 1 - Project'}" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      text: message,
      html: message.replace(/\n/g, '<br>'), // xuống dòng HTML
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId, info.response);
    return info;
  } catch (error) {
    console.error('❌ LỖI KHI GỬI EMAIL:', error);
    throw error;
  }
};

module.exports = sendEmail;
