// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport'); // <-- THÊM DÒNG NÀY

const sendEmail = async ({ email, subject, message }) => {
  try {
    // -----------------------------------------------------------------
    // TẠO TRANSPORTER SENDGRID (THAY VÌ GMAIL)
    // -----------------------------------------------------------------
    const options = {
      auth: {
        // Lấy API Key bạn vừa tạo từ SendGrid
        api_key: process.env.SENDGRID_API_KEY 
      }
    }
    const transporter = nodemailer.createTransport(sgTransport(options));
    // -----------------------------------------------------------------

    // Tùy chỉnh gửi email
    const mailOptions = {
      // TÔI ĐÃ SỬA SMTP_USER THÀNH EMAIL_FORM
      // để khớp với biến môi trường 'grillchill.team@gmail.com'
      // mà bạn đã đặt trên Render (trong ảnh image_da5a05.png)
      from: `"${process.env.FROM_NAME || 'Nhóm 1 - Project'}" <${process.env.EMAIL_FORM}>`,
      to: email,
      subject,
      text: message,
      html: message.replace(/\n/g, '<br>'), // xuống dòng HTML
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent via SendGrid:', info.messageId, info.response); // Sửa log
    return info;
  } catch (error) {
    // In ra lỗi chi tiết từ SendGrid (nếu có)
    console.error('❌ LỖI KHI GỬI EMAIL (SendGrid):', error);
    if (error.response) {
      console.error(error.response.body)
    }
    throw error;
  }
};

module.exports = sendEmail;
