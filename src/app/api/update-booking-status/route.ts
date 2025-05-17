import { NextRequest, NextResponse } from 'next/server';
import { updateBookingStatus } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const { bookingId, status } = await request.json();
    const updated = await updateBookingStatus(bookingId, status);
    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 