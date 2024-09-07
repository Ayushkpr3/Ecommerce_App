import nodemailer from 'nodemailer';

// Function to send an email using nodemailer
const sendEmail = async ({ email, subject, message }) => {
  // Configure the transporter for sending emails
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: process.env.SMTP_PORT === '465', // Use secure connection for port 465 (typically for SMTP over SSL)
  });

  // Define the email options
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    text: message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
