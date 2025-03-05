// backend/utils/email.js
const nodemailer = require('nodemailer');

const EMAIL_SERVICE_USER = process.env.EMAIL_SERVICE_USER;
const EMAIL_SERVICE_PASS = process.env.EMAIL_SERVICE_PASS;

const sendEmail = async (to, analysis) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_SERVICE_USER,
      pass: EMAIL_SERVICE_PASS
    }
  });

  let mailOptions = {
    from: EMAIL_SERVICE_USER,
    to: to,
    subject: 'Token Analysis Report',
    text: analysis
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
