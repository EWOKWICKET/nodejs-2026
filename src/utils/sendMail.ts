import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  auth: {
    user: process.env.SMTP_AUTH_USER!,
    pass: process.env.SMTP_AUTH_PASS!,
  },
});

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL!,
    to,
    subject: 'Password Reset',
    text: `Use this token to reset your password (valid for 10 minutes):\n\n${token}\n\nPOST /api/auth/reset-password with { "token": "...", "password": "..." }`,
    html: `<p>Use this token to reset your password (valid for 10 minutes):</p><code>${token}</code><p>POST /api/auth/reset-password with body: <code>{ "token": "...", "password": "..." }</code></p>`,
  });
}
