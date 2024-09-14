import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name')?.toString();
    const surname = formData.get('surname')?.toString();
    const email = formData.get('email')?.toString();
    const phone = formData.get('phone')?.toString();
    const avatar = formData.get('avatar') as File; // Assuming avatar is a file

    if (!name || !surname || !email || !phone || !avatar) {
      return NextResponse.json(
        { message: 'Missing required fields: name, surname, email, phone, or avatar' },
        { status: 400 }
      );
    }

    const form = new FormData();
    form.append('name', name);
    form.append('surname', surname);
    form.append('email', email);
    form.append('phone', phone);
    form.append('avatar', avatar); // Attach the file directly

    const API_TOKEN = process.env.API_TOKEN;

    if (!API_TOKEN) {
      throw new Error("Missing API token");
    }

    const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`, // Don't manually set Content-Type
      },
      body: form, // Send FormData directly
    });

    const rawResponse = await response.text();
    console.log('Raw Response:', rawResponse);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${rawResponse}`);
    }

    const agent = JSON.parse(rawResponse);
    return NextResponse.json({ agent }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating agent:', error.message);
    return NextResponse.json(
      { message: 'Failed to create agent', error: error.message },
      { status: 500 }
    );
  }
}
