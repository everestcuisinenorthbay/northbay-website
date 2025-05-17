import { NextRequest, NextResponse } from 'next/server';

// Pushover configuration with the provided token and key
const PUSHOVER_TOKEN = 'avs15sc1u3abr7h5dtcjfygj16ry1k';
const PUSHOVER_USER_KEY = 'uzt9y1ret78bb85crgzr3n2gerky1n';

export async function POST(request: NextRequest) {
  try {
    const { title, message, priority = 0 } = await request.json();

    // Validate required fields
    if (!title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (title, message)' },
        { status: 400 }
      );
    }

    // Send notification to Pushover
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
      return NextResponse.json(
        { error: 'Failed to send Pushover notification', details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending Pushover notification:', error);
    return NextResponse.json(
      { error: 'Failed to send Pushover notification' },
      { status: 500 }
    );
  }
} 