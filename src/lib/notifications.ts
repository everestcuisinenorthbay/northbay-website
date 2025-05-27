// Utilities for sending notifications (Pushover and Email)

// Pushover configuration with the provided token and key
const PUSHOVER_TOKEN = process.env.PUSHOVER_TOKEN;
const PUSHOVER_USER_KEY = process.env.PUSHOVER_USER_KEY;
const ADMIN_EMAIL = 'everestcuisineottawa@gmail.com'; // Admin email for notifications

/**
 * Send a Pushover notification
 */
export async function sendPushoverNotification(
  title: string, 
  message: string, 
  priority: number = 0
) {
  if (!PUSHOVER_TOKEN || !PUSHOVER_USER_KEY) {
    console.warn('Pushover token or user key is not configured. Skipping notification.');
    return false;
  }
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
    console.log('Pushover notification sent successfully.');
    return true;
  } catch (error) {
    console.error('Error sending Pushover notification:', error);
    return false;
  }
}

/**
 * Send an email notification using the API route
 */
export async function sendEmail(to: string, subject: string, html: string, from?: string) {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_WEBSITE_URL environment variable is not set!');
    }
    const response = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        from,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Email sending failed:', data);
      return false;
    }
    
    console.log(`Email sent successfully to ${to} with subject "${subject}"`);
    return true;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    return false;
  }
}

// Helper to parse YYYY-MM-DD as local date
function parseLocalDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
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
  const formattedDate = parseLocalDate(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format time for display (convert 24h to 12h format)
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight/noon
  const formattedTime = `${hour12}:${minutes} ${ampm}`;
  
  const subject = 'Your Reservation at Everest Cuisine is Confirmed';
  
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  if (!websiteUrl) {
    throw new Error('NEXT_PUBLIC_WEBSITE_URL environment variable is not set!');
  }
  const contactPhoneNumber = '613-963-4406'; // Or use an env variable

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0A2E1A; color: white; padding: 25px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Everest Cuisine</h1>
      </div>
      <div style="padding: 25px 30px; color: #333;">
        <h2 style="color: #0A2E1A; font-size: 22px; margin-top: 0;">Your Reservation is Confirmed!</h2>
        <p style="font-size: 16px; line-height: 1.6;">Dear ${name},</p>
        <p style="font-size: 16px; line-height: 1.6;">We're excited to confirm your reservation at Everest Cuisine:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #D4A373;">
          <p style="margin: 10px 0; font-size: 16px;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Time:</strong> ${formattedTime}</p>
          <p style="margin: 10px 0; font-size: 16px;"><strong>Party Size:</strong> ${partySize} ${partySize === 1 ? 'person' : 'people'}</p>
          ${occasion ? `<p style="margin: 10px 0; font-size: 16px;"><strong>Special Occasion:</strong> ${occasion}</p>` : ''}
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">If you need to make any changes to your reservation, or if you have any questions, please call us at <a href="tel:${contactPhoneNumber}" style="color: #D4A373; text-decoration: none; font-weight: bold;">${contactPhoneNumber}</a>.</p>
        
        <p style="font-size: 16px; line-height: 1.6;">We look forward to serving you!</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-top: 25px;">Warm regards,<br>The Everest Cuisine Team</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 20px 30px; font-size: 13px; color: #555; text-align: center;">
        <p style="margin: 5px 0;">Everest Cuisine<br>1846 Carling Ave, Ottawa, ON K2A 1E2</p>
        <p style="margin: 5px 0;">Phone: ${contactPhoneNumber} | Website: <a href="${websiteUrl}" style="color: #D4A373; text-decoration: none;">${websiteUrl}</a></p>
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
  const formattedDate = parseLocalDate(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format time for display
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight/noon
  const formattedTime = `${hour12}:${minutes} ${ampm}`;
  
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  if (!websiteUrl) {
    throw new Error('NEXT_PUBLIC_WEBSITE_URL environment variable is not set!');
  }
  const adminBookingLink = `${websiteUrl}/admin/bookings`; // Assuming an admin path

  // 1. Send pushover notification if configured
  if (PUSHOVER_TOKEN && PUSHOVER_USER_KEY) {
    sendPushoverNotification(
      'New Reservation',
      `${name} has made a reservation for ${partySize} on ${formattedDate} at ${formattedTime}. Notes: ${notes || 'N/A'}`
    );
  }
  
  // 2. Send email notification
  const subject = `New Reservation: ${name} - ${formattedDate} at ${formattedTime}`;
  
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #D4A373; color: #0A2E1A; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 26px; font-weight: bold;">New Table Reservation</h1>
      </div>
      <div style="padding: 25px 30px; color: #333;">
        <h2 style="color: #0A2E1A; font-size: 20px; margin-top: 0;">A new table reservation has been submitted:</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 25px 0; font-size: 15px;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555; width: 150px;">Booking ID:</td><td style="padding: 10px 0;">${_id}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 10px 0;">${name}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #D4A373; text-decoration: none;">${email}</a></td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #D4A373; text-decoration: none;">${phone}</a></td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Date:</td><td style="padding: 10px 0;">${formattedDate}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Time:</td><td style="padding: 10px 0;">${formattedTime}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Party Size:</td><td style="padding: 10px 0;">${partySize} ${partySize === 1 ? 'person' : 'people'}</td></tr>
          ${occasion ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Occasion:</td><td style="padding: 10px 0;">${occasion}</td></tr>` : ''}
          ${notes ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; color: #555;">Notes:</td><td style="padding: 10px 0;">${notes}</td></tr>` : ''}
        </table>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${adminBookingLink}" target="_blank" style="display: inline-block; background-color: #0A2E1A; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
            Manage Reservations
          </a>
        </div>
      </div>
       <div style="background-color: #f1f1f1; padding: 15px 30px; font-size: 12px; color: #555; text-align: center;">
        <p style="margin: 0;">This is an automated notification from ${websiteUrl}</p>
      </div>
    </div>
  `;
  
  return sendEmail(ADMIN_EMAIL, subject, html);
} 