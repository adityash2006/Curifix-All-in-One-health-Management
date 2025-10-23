import nodemailer from 'nodemailer';

const createTransporter = () => {
  
  return nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS 
    }
  });
};

export const sendContactEmail = async (contactData) => {
  try {
    const { name, email, subject, message } = contactData;
    
    const transporter = createTransporter();

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #303030; margin: 0; font-size: 28px;">Curifix Contact Form</h1>
              <p style="color: #666; margin: 10px 0 0 0;">New message received</p>
            </div>
            
            <div style="background-color: #f5f5eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #303030; margin: 0 0 15px 0; font-size: 20px;">Contact Details</h2>
              <p style="margin: 8px 0; color: #333;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #E9FF5D; border-radius: 4px;">
              <h3 style="color: #303030; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                This message was sent from the Curifix contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `
    };
    
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Curifix - We\'ll be in touch soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #303030; margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
              <p style="color: #666; margin: 10px 0 0 0;">We've received your message</p>
            </div>
            
            <div style="background-color: #f5f5eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #333; line-height: 1.6; margin: 0;">
                Thank you for reaching out to Curifix! We've received your message regarding <strong>${subject}</strong> and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #E9FF5D; border-radius: 4px; margin-bottom: 20px;">
              <h3 style="color: #303030; margin: 0 0 15px 0; font-size: 18px;">Your Message</h3>
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="background-color: #E9FF5D; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #303030; margin: 0 0 10px 0; font-size: 18px;">Need immediate assistance?</h3>
              <p style="color: #333; margin: 0 0 15px 0;">Try our AI health assistant for instant help!</p>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/chat" 
                 style="display: inline-block; background-color: #303030; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Chat with AI Assistant
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                Best regards,<br>
                The Curifix Team
              </p>
            </div>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    
    return { success: true, message: 'Emails sent successfully' };
    
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send email', error: error.message };
  }
};

export const sendNotificationEmail = async (to, subject, message) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #303030; text-align: center; margin-bottom: 20px;">Curifix Notification</h1>
            <div style="color: #333; line-height: 1.6;">
              ${message}
            </div>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Notification email sent successfully' };
    
  } catch (error) {
    console.error('Notification email error:', error);
    return { success: false, message: 'Failed to send notification email', error: error.message };
  }
};

export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('Email config test error:', error);
    return { success: false, message: 'Email configuration is invalid', error: error.message };
  }
};
