import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }: { email: string, emailType: 'VERIFY' | 'RESET', userId: string }) => {
    try {
        if (!email || !userId) {
            throw new Error("❌ Missing email or userId.");
        }

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // Token expires in 1 hour
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // Token expires in 1 hour
            });
        } else {
            throw new Error("❌ Invalid emailType. Expected 'VERIFY' or 'RESET'.");
        }

        if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
            throw new Error("❌ SMTP credentials are missing in environment variables.");
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.mailosaur.net",
            port: 2525,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });

        if (!process.env.DOMAIN) {
            throw new Error("❌ DOMAIN is not set in environment variables.");
        }

        const verificationLink = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

        const mailOptions = {
            from: 'kushvardhan@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password",
            html: `
                <p>Hello,</p>
                <p>Please click the link below to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}:</p>
                <p><a href="${verificationLink}">${verificationLink}</a></p>
                <p>If the above link doesn't work, copy and paste it into your browser.</p>
                <p>Regards,<br/>Kush Vardhan</p>
            `
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (err: any) {
        console.error("❌ Email sending error:", err.message);
        throw new Error(err.message);
    }
};
