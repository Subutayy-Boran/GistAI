const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

if (!resend) {
    console.warn('⚠️ RESEND_API_KEY is not set. Email functionality will be disabled.');
}

// Use the standard testing domain if no custom domain is configured
// In production, this should be 'onboarding@yourdomain.com'
const FROM_EMAIL = 'onboarding@resend.dev';

/**
 * Send a welcome email to a new user
 * @param {string} email - User's email address
 * @param {string} name - User's name (optional)
 * @returns {Promise<Object>} Resend API response
 */
async function sendWelcomeEmail(email, name = '') {
    try {
        if (!resend) {
            console.warn('⚠️ Cannot send email: Resend client not initialized (missing API key).');
            return null;
        }

        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: email, // Note: In Resend Test Mode, you can only send to the email you signed up with
            subject: 'Welcome to GistAI! 🚀',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #6366f1;">Welcome to GistAI!</h1>
                    <p>Hello! We're excited to have you on board.</p>
                    <p>GistAI helps you filter the noise on Twitter using advanced AI, delivering only the news that matters to you.</p>
                    
                    <h3>Here's what you can do next:</h3>
                    <ul>
                        <li><strong>Add Accounts:</strong> Tell us which Twitter accounts to monitor.</li>
                        <li><strong>Connect Telegram:</strong> Link your Telegram account to get instant notifications.</li>
                        <li><strong>Relax:</strong> We'll handle the reading and summarizing for you.</li>
                    </ul>

                    <p style="margin-top: 30px;">
                        <a href="${process.env.WEB_BASE_URL || 'http://localhost:3000'}/dashboard" 
                           style="background-color: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                           Go to Dashboard
                        </a>
                    </p>
                    
                    <p style="color: #666; font-size: 12px; margin-top: 40px;">
                        To deliver news without the noise.<br>
                        - The GistAI Team
                    </p>
                </div>
            `
        });

        console.log(`📧 Welcome email sent to ${email}:`, data);
        return data;
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
        // Don't throw, just log. We don't want to block registration if email fails.
        return null;
    }
}

/**
 * Send a notification email (future use)
 */
async function sendNotificationEmail(email, summary) {
    // TOD: Implement email notifications logic
}

/**
 * Send password reset email
 * For MVP, since we don't have a real reset flow token logic yet, 
 * we will send a simple message or simulate it.
 * But ideally this sends a link with a token.
 */
async function sendPasswordResetEmail(email, resetToken) {
    try {
        if (!resend) {
            console.warn('⚠️ Cannot send email: Resend client not initialized.');
            return null;
        }

        const resetLink = `${process.env.WEB_BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Reset your GistAI Password 🔒',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">Reset Password</h2>
                    <p>You requested a password reset for your GistAI account.</p>
                    <p>Click the button below to reset your password:</p>
                    
                    <p style="margin-top: 30px;">
                        <a href="${resetLink}" 
                           style="background-color: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                           Reset Password
                        </a>
                    </p>
                    
                    <p style="color: #666; font-size: 12px; margin-top: 40px;">
                        If you didn't request this, please ignore this email.<br>
                        - GistAI Security
                    </p>
                </div>
            `
        });

        console.log(`📧 Password reset email sent to ${email}:`, data);
        return data;
    } catch (error) {
        console.error('❌ Error sending password reset email:', error);
        return null;
    }
}

module.exports = {
    sendWelcomeEmail,
    sendNotificationEmail,
    sendPasswordResetEmail
};
