import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `TenantFlow <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Welcome to TenantFlow!</h1>
      <p>Click the link below to verify your email address.</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `TenantFlow <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password.</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};

export const sendInvitationEmail = async (
  email: string,
  token: string,
  orgName: string,
) => {
  const inviteUrl = `${process.env.APP_URL}/invite?token=${token}`;
  const declineUrl = `${process.env.APP_URL}/decline?token=${token}`;

  await transporter.sendMail({
    from: `TenantFlow <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `You've been invited to join ${orgName}`,
    html: `
      <h1>You've been invited!</h1>
      <p>You have been invited to join <strong>${orgName}</strong> on TenantFlow.</p>
      <a href="${inviteUrl}" style="padding: 10px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 6px;">Accept Invitation</a>
      <br/><br/>
      <a href="${declineUrl}" style="color: #6b7280;">Decline Invitation</a>
      <p>This link expires in 7 days.</p>
      <p>If you didn't expect this, ignore this email.</p>
    `,
  });
};
