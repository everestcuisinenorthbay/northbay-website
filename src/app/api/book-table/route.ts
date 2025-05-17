import { NextRequest, NextResponse } from 'next/server';
import { submitTableBooking } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const booking = await submitTableBooking(data);
    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 