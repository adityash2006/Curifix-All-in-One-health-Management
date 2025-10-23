import express from 'express';
import { sendContactEmail, testEmailConfig } from '../utils/email.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long'
      });
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email configuration not found. Please set EMAIL_USER and EMAIL_PASS environment variables.');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact support directly.'
      });
    }
    // Send email
    const emailResult = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });
    if (emailResult.success) {
      res.status(200).json({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
      });
    } else {
      console.error('Email sending failed:', emailResult.error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later or contact us directly.'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});
router.get('/test-email', async (req, res) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: 'Email configuration not found. Please set EMAIL_USER and EMAIL_PASS environment variables.'
      });
    }

    const testResult = await testEmailConfig();
    
    if (testResult.success) {
      res.status(200).json({
        success: true,
        message: 'Email configuration is working correctly'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Email configuration test failed',
        error: testResult.error
      });
    }
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test email configuration',
      error: error.message
    });
  }
});

export default router;
