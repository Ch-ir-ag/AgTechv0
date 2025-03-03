import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from the API!',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: 'Data received successfully!',
      data: body,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error parsing request body:', err);
    
    return NextResponse.json(
      { error: 'Failed to parse request body' },
      { status: 400 }
    );
  }
} 