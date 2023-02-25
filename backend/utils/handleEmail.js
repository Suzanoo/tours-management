const nodemailer = require('nodemailer');

const handleEmail = async (options) => {
  // 1) Create a transporter
  const smtpConfig = {
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    port: process.env.EMAIL_PORT,
    secure: false,
  };

  // 2) Define the email options
  const mailOptions = {
    from: 'Leo de Ao <admin@hw12.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  if (process.env.NODE_ENV === 'development') {
    const transporter = nodemailer.createTransport(smtpConfig);
    await transporter.sendMail(mailOptions);
  }
  if (process.env.NODE_ENV === 'production') {
    console.log('Not yet email sending for production environment');
  }
};

module.exports = handleEmail;
