import { sendMail } from '../clients/email.client';

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  await sendMail({
    to,
    subject: 'Password Reset',
    text: `Use this token to reset your password (valid for 10 minutes):\n\n${token}\n\nPOST /api/auth/reset-password with { "token": "...", "password": "..." }`,
    html: `<p>Use this token to reset your password (valid for 10 minutes):</p><code>${token}</code><p>POST /api/auth/reset-password with body: <code>{ "token": "${token}", "password": "..." }</code></p>`,
  });
}
