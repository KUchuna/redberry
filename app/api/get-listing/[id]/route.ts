import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const id = request.nextUrl.pathname.replace('/api/get-listing/', '');
    
    console.log('Fetching listing with ID:', id);
  try {
    const REDBERRY_API_TOKEN = process.env.REDBERRY_API_TOKEN;

    const response = await fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          'Authorization': `Bearer ${REDBERRY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const listing = await response.json();

    return NextResponse.json({ listing }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';

    console.error('Fetch Error:', message);

    return NextResponse.json(
      { message: 'Failed to fetch listings', error: message },
      { status: 500 }
    );
  }
}
