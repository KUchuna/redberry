import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const formData = await req.formData();


    const REDBERRY_API_TOKEN = process.env.REDBERRY_API_TOKEN;
    if (!REDBERRY_API_TOKEN) {
      throw new Error("Missing API token");
    }

    const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${REDBERRY_API_TOKEN}`,
      },
      body: formData,
    });

    const listing = await response.json();
    return NextResponse.json({ listing }, { status: 201 });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error creating listing:', message);
    return NextResponse.json(
      { message: 'Failed to create listing', error: message },
      { status: 500 }
    );
  }
}
