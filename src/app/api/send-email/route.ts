import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  ...(process.env.EMAIL_PORT === '587' && process.env.EMAIL_SECURE !== 'true' && { 
    tls: { ciphers: 'SSLv3', rejectUnauthorized: false } 
  })
});

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, from } = await request.json();

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: from || process.env.EMAIL_FROM || `"Everest Cuisine" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // Wrap sendMail in a Promise for async/await
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Nodemailer error:', err);
          reject(err);
        } else {
          console.log('Nodemailer success:', info);
          resolve(info);
        }
      });
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 