import { NextResponse } from 'next/server';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const REDBERRY_API_TOKEN = process.env.REDBERRY_API_TOKEN;

    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${REDBERRY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const listings = await response.json();

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';

    console.error('Fetch Error:', message);

    return NextResponse.json(
      { message: 'Failed to fetch listings', error: message },
      { status: 500 }
    );
  }
}
