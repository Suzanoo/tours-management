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
    html: `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Forgot Password</title>
          </head>
          <body>
            <p>Hi,</p>
            <p>
              We have received a request to reset the password for your account.
              To continue, please click on the button below to create a new
              password:
            </p>
            <a href=${options.URL}>
              <button style="background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer;">
                Create New Password
              </button>
            </a>
            <p>
              If you did not request this, please ignore this email and your
              password will remain unchanged.
            </p>
            <p>Best regards,</p>
            <p>The MyApp Team</p>
          </body>
        </html>`,
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
