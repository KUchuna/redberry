import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/cities");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const cities = await response.json();

    return NextResponse.json({ cities }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Fetch Error:', error);

    return NextResponse.json(
      { message: 'Failed to fetch agents', error: message },
      { status: 500 }
    );
  }
}
