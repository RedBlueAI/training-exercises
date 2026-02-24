import { NextRequest, NextResponse } from 'next/server';
import { triageServiceRequest } from '@/lib/groq';

// ⚠️ DELIBERATE VULNERABILITY — Session 10 Security Exercise
// No rate limiting on this endpoint. An attacker could exhaust
// the Groq API quota with rapid requests.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description } = body;

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Description is required' },
        { status: 400 }
      );
    }

    if (description.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Description too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    const result = await triageServiceRequest(description);

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    // ⚠️ DELIBERATE VULNERABILITY — Session 10 Security Exercise
    // Verbose error messages expose internal details (stack traces, API keys in errors)
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;
    
    console.error('Triage error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: message,
        // ⚠️ Exposing stack trace to client
        debug: process.env.NODE_ENV === 'development' ? stack : undefined,
      },
      { status: 500 }
    );
  }
}
