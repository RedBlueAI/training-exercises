import { NextResponse } from 'next/server';
import seedData from '@/data/seed.json';

export async function GET() {
  return NextResponse.json({ success: true, data: seedData.technicians });
}
