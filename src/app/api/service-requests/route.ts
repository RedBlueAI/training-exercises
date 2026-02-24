import { NextRequest, NextResponse } from 'next/server';
import seedData from '@/data/seed.json';

// ⚠️ DELIBERATE VULNERABILITIES — Sessions 5 & 10 Security Exercises
// This file has intentional security issues for training purposes.

// ⚠️ VULNERABILITY: No authentication/authorization check
// Anyone can access all service requests

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const priority = searchParams.get('priority');
  const status = searchParams.get('status');

  let results = [...seedData.serviceRequests];

  // ⚠️ DELIBERATE VULNERABILITY — Session 10 Security Exercise
  // In a real app with SQL, this would be SQL injection.
  // Here we simulate the pattern for educational purposes.
  if (query) {
    // This is the pattern to identify — string concatenation for queries
    // In production with a real DB, this would be:
    // const sql = `SELECT * FROM requests WHERE title LIKE '%${query}%'`
    // Instead of parameterized: WHERE title LIKE ? with [%query%]
    results = results.filter(r =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category) {
    results = results.filter(r => r.category === category);
  }
  if (priority) {
    results = results.filter(r => r.priority === priority);
  }
  if (status) {
    results = results.filter(r => r.status === status);
  }

  return NextResponse.json({ success: true, data: results });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ⚠️ VULNERABILITY: No input sanitization
    // XSS could be stored in title, description, notes
    const newRequest = {
      id: `SR-${String(seedData.serviceRequests.length + 1).padStart(3, '0')}`,
      title: body.title,
      description: body.description,
      category: body.category || 'general',
      priority: body.priority || 'routine',
      status: 'open' as const,
      location: body.location,
      reportedBy: body.reportedBy || 'Anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // ⚠️ VULNERABILITY: No validation of required fields
    // Empty titles, descriptions, etc. would be accepted

    return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
  } catch (error: unknown) {
    // ⚠️ VULNERABILITY: Verbose error exposure
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create service request',
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}
