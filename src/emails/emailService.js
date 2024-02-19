import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASSWORD || '',
  },
});

export default transporter;