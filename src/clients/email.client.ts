import nodemailer from 'nodemailer';

type SendMailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  auth: {
    user: process.env.SMTP_AUTH_USER!,
    pass: process.env.SMTP_AUTH_PASS!,
  },
});

export async function sendMail(sendMailParams: SendMailParams): Promise<void> {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL!,
    ...sendMailParams,
  });
}
