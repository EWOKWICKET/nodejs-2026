import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to,
    subject: 'Password Reset',
    text: `POST /api/auth/reset-password with { "token": "${token}", "password": "..." }`,
    html: `<p>POST /api/auth/reset-password with body: <code>{ "token": "${token}", "password": "..." }</code></p>`,
  });
}
