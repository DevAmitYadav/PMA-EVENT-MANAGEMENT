// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendConfirmationEmail = async (recipientEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  // Optional transporter verification
  transporter.verify((error, success) => {
    if (error) {
      console.error('Transporter verification failed:', error);
    } else {
      console.log('Transporter is ready to send messages.');
    }
  });

  const mailOptions = {
    from: `"Elevate Events" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: 'Thanks for Subscribing to Elevate Events!',
    text: `
Hello,

Thank you for subscribing to our newsletter!
Stay tuned for the latest event trends, exclusive offers, and event inspiration!

Best regards,
Elevate Events
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Elevate Events - Subscription Confirmation</title>
    <style>
      body { 
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container { 
        max-width: 600px;
        margin: 20px auto;
        background: #fff;
        border: 1px solid #e0e0e0;
      }
      .header { 
        background-color: #0B2545;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .header h1 { 
        margin: 0;
        font-size: 26px;
      }
      .content { 
        padding: 20px;
        text-align: center;
        color: #333;
      }
      .content h2 { 
        color: #0B2545;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .content p { 
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .button { 
        background-color: #F97316;
        color: #fff;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: bold;
        margin-top: 20px;
      }
      .footer { 
        background-color: #f0f0f0;
        color: #777;
        padding: 15px;
        text-align: center;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Elevate Events</h1>
      </div>
      <div class="content">
        <h2>Subscription Confirmed!</h2>
        <p>
          Thank you for subscribing to our newsletter. We bring you the latest event updates, exclusive offers, and inspirational tips to create unforgettable experiences!
        </p>
        <a href="https://www.youreventwebsite.com" class="button">Visit Our Website</a>
      </div>
      <div class="footer">
        <p>You received this email because you subscribed to our newsletter.</p>
        <p>&copy; 2025 Elevate Events. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
    `,
  };

  await transporter.sendMail(mailOptions);
};
