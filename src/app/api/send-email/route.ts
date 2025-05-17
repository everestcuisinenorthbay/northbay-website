import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure email transporter 
// For production, use a real email service provider like SendGrid, AWS SES, etc.
// For development, you could use services like Mailtrap or Ethereal
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    // Validate required fields
    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields (to, subject, html)' },
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Everest Cuisine <noreply@everestcuisine.com>',
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 