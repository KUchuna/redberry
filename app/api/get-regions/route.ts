import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const regions = await response.json();

    return NextResponse.json({ regions }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Fetch Error:', error);

    return NextResponse.json(
      { message: 'Failed to fetch regions', error: message },
      { status: 500 }
    );
  }
}
