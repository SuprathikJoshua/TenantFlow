import { log } from "console";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Send Verification Email
 * @param email
 * @param token
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "TenantFlow <onboarding@resend.dev>",
    to:
      process.env.NODE_ENV === "production"
        ? email
        : "iiitlcollegeworkspace@gmail.com",
    subject: "Verify your email",
    html: `
      <h1>Welcome to TenantFlow!</h1>
      <p>Click the link below to verify your email address.</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });

  console.log("Resend Response: ", data);
  console.log("Resend Error: ", error);
};
/**
 * Send Password Reset Email
 * @param email
 * @param token
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "TenantFlow <onboarding@resend.dev>",
    to:
      process.env.NODE_ENV === "production"
        ? email
        : "iiitlcollegeworkspace@gmail.com",
    subject: "Reset your password",
    html: `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password.</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });

  console.log("Resend response:", data);
  console.log("Resend error:", error);
};

/**
 * Send Invitation Email
 * @param email
 * @param token
 * @param orgName
 */
export const sendInvitationEmail = async (
  email: string,
  token: string,
  orgName: string,
) => {
  const inviteUrl = `${process.env.APP_URL}/invitations?token=${token}`;

  await resend.emails.send({
    from: "TenantFlow <onboarding@resend.dev>",
    to:
      process.env.NODE_ENV === "production"
        ? email
        : "iiitlcollegeworkspace@gmail.com",
    subject: `You've been invited to join ${orgName}`,
    html: `
      <h1>You've been invited!</h1>
      <p>You have been invited to join <strong>${orgName}</strong> on TenantFlow.</p>
      <a href="${inviteUrl}">Accept Invitation</a>
      <p>This link expires in 7 days.</p>
      <p>If you didn't expect this, ignore this email.</p>
    `,
  });
};
