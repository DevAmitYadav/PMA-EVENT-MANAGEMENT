import express from 'express';
import { sendConfirmationEmail } from '../utils/sendEmail.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await sendConfirmationEmail(email);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error while sending email:', err); // Detailed log
    return res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});

export default router;
