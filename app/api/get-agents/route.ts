import { NextResponse } from 'next/server';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const REDBERRY_API_TOKEN = process.env.REDBERRY_API_TOKEN;

    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
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

    const agents = await response.json();

    return NextResponse.json({ agents }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';

    console.error('Fetch Error:', message);

    return NextResponse.json(
      { message: 'Failed to fetch agents', error: message },
      { status: 500 }
    );
  }
}
