// Utilities for sending notifications (Pushover and Email)

// Pushover configuration with the provided token and key
const PUSHOVER_TOKEN = 'avs15sc1u3abr7h5dtcjfygj16ry1k';
const PUSHOVER_USER_KEY = 'uzt9y1ret78bb85crgzr3n2gerky1n';
const ADMIN_EMAIL = 'winggindsa@gmail.com';

/**
 * Send a Pushover notification
 */
export async function sendPushoverNotification(
  title: string, 
  message: string, 
  priority: number = 0
) {
  try {
    const response = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: PUSHOVER_TOKEN,
        user: PUSHOVER_USER_KEY,
        title,
        message,
        priority,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Pushover notification failed:', data);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending Pushover notification:', error);
    return false;
  }
}

/**
 * Send an email notification
 * Note: This requires a server-side email service like SendGrid, AWS SES, etc.
 * For demonstration, we'll log the email and call an external API
 */
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    // In production, you would integrate with an email service API here
    // For demonstration purposes, we'll use a serverless function or API route
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    });
    
    if (!response.ok) {
      console.error('Email notification failed');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}

/**
 * Send a booking confirmation email to the user
 */
export function sendBookingConfirmationEmail(
  userEmail: string,
  bookingDetails: {
    name: string;
    date: string;
    time: string;
    partySize: number;
    occasion?: string;
  }
) {
  const { name, date, time, partySize, occasion } = bookingDetails;
  
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format time for display (convert 24h to 12h format)
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const formattedTime = `${hour12}:${minutes} ${ampm}`;
  
  const subject = 'Your Reservation at Everest Cuisine is Confirmed';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2D5034;">Your Reservation is Confirmed!</h2>
      <p>Dear ${name},</p>
      <p>We're excited to confirm your reservation at Everest Cuisine:</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Party Size:</strong> ${partySize} ${partySize === 1 ? 'person' : 'people'}</p>
        ${occasion ? `<p><strong>Special Occasion:</strong> ${occasion}</p>` : ''}
      </div>
      
      <p>If you need to make any changes to your reservation, please call us at (123) 456-7890.</p>
      
      <p>We look forward to serving you!</p>
      
      <p>Warm regards,<br>The Everest Cuisine Team</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        <p>Everest Cuisine<br>123 Main Street, Toronto, ON M4B 1B3<br>Phone: (123) 456-7890</p>
      </div>
    </div>
  `;
  
  return sendEmail(userEmail, subject, html);
}

/**
 * Send a booking notification to the admin
 */
export function sendBookingNotificationToAdmin(
  bookingDetails: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    partySize: number;
    occasion?: string;
    notes?: string;
  }
) {
  const { _id, name, email, phone, date, time, partySize, occasion, notes } = bookingDetails;
  
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format time for display
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const formattedTime = `${hour12}:${minutes} ${ampm}`;
  
  // 1. Send pushover notification
  sendPushoverNotification(
    'New Reservation',
    `${name} has made a reservation for ${partySize} on ${formattedDate} at ${formattedTime}.`
  );
  
  // 2. Send email notification
  const subject = `New Reservation: ${name} - ${formattedDate}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2D5034;">New Reservation</h2>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Booking ID:</strong> ${_id}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Party Size:</strong> ${partySize} ${partySize === 1 ? 'person' : 'people'}</p>
        ${occasion ? `<p><strong>Special Occasion:</strong> ${occasion}</p>` : ''}
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      </div>
      
      <p>
        <a href="https://everest-cuisine.com/admin/bookings" style="display: inline-block; background-color: #2D5034; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
          Manage Reservations
        </a>
      </p>
    </div>
  `;
  
  return sendEmail(ADMIN_EMAIL, subject, html);
} 