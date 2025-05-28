import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Validation schema
const bookingSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().refine((phone) => isValidPhoneNumber(phone, 'CA'), {
    message: 'Invalid phone number',
  }),
  date: z.string().refine((date) => {
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  }, {
    message: 'Booking date must be today or in the future',
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format',
  }),
  partySize: z.number().min(1).max(20),
  occasion: z.string().optional(),
  notes: z.string().max(500).optional(),
});

// Rate limiting configuration
const RATE_LIMIT = {
  WINDOW_MS: 24 * 60 * 60 * 1000, // 24 hours
  MAX_REQUESTS: 3, // Max 3 bookings per IP per day
};

export async function validateBooking(req: NextRequest) {
  try {
    // 1. Get client IP
    const ip = req.headers.get('x-forwarded-for') || req.nextUrl.hostname || 'unknown';
    
    // 2. Check rate limit
    const rateKey = `booking-rate:${ip}`;
    const currentRequests = await redis.incr(rateKey);
    
    if (currentRequests === 1) {
      await redis.expire(rateKey, Math.floor(RATE_LIMIT.WINDOW_MS / 1000));
    }
    
    if (currentRequests > RATE_LIMIT.MAX_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Too many booking attempts. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    // 3. Validate request body
    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    // 4. Check if email has been used for multiple bookings recently
    const emailKey = `booking-email:${validatedData.email}`;
    const emailBookings = await redis.incr(emailKey);
    
    if (emailBookings === 1) {
      await redis.expire(emailKey, Math.floor(RATE_LIMIT.WINDOW_MS / 1000));
    }
    
    if (emailBookings > RATE_LIMIT.MAX_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'This email has been used for too many bookings recently.' },
        { status: 429 }
      );
    }

    // 5. Check for suspicious patterns
    const suspiciousPatterns = [
      /^test/i,
      /^admin/i,
      /^[a-z]{1,2}$/i,
      /^[0-9]+$/,
    ];

    if (suspiciousPatterns.some(pattern => pattern.test(validatedData.name))) {
      return NextResponse.json(
        { success: false, error: 'Invalid name format.' },
        { status: 400 }
      );
    }

    // 6. Validate booking time
    const [hours, minutes] = validatedData.time.split(':').map(Number);
    const validTimeRanges = [
      // Lunch hours: 11:30 AM - 2:00 PM
      { start: { hours: 11, minutes: 30 }, end: { hours: 14, minutes: 0 } },
      // Dinner hours: 5:00 PM - 10:30 PM
      { start: { hours: 17, minutes: 0 }, end: { hours: 22, minutes: 30 } },
    ];

    const isValidTime = validTimeRanges.some(range => {
      const bookingTime = hours * 60 + minutes;
      const startTime = range.start.hours * 60 + range.start.minutes;
      const endTime = range.end.hours * 60 + range.end.minutes;
      return bookingTime >= startTime && bookingTime <= endTime;
    });

    if (!isValidTime) {
      return NextResponse.json(
        { success: false, error: 'Selected time is outside of our operating hours.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
} 