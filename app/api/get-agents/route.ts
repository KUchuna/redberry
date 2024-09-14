import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_TOKEN = process.env.API_TOKEN;

    const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`, // Correct authorization format
          'Content-Type': 'application/json'
        }
      });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const agents = await response.json();

    return NextResponse.json({ agents }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch Error:', error);

    return NextResponse.json(
      { message: 'Failed to fetch agents', error: error.message },
      { status: 500 }
    );
  }
}