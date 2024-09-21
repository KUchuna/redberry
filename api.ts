import { revalidatePath } from "next/cache";

export async function addAgent(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add-agent`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    revalidatePath('/newlisting')
    revalidatePath('/listing')
  }
}


export async function addListing(formData: FormData) {
  try {
    const REDBERRY_API_TOKEN = process.env.REDBERRY_API_TOKEN;
    if (!REDBERRY_API_TOKEN) {
      throw new Error("Missing API token");
    }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add-listing`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${REDBERRY_API_TOKEN}`,
          },
          body: formData,
      });

      if (!response.ok) {
          let errorMessage = 'An unexpected error occurred.';
          try {
              const errorData = await response.json();
              errorMessage = errorData.message || 'An error occurred while processing your request.';
          } catch (parseError) {
              errorMessage = 'Failed to parse error response.';
          }
          console.error('HTTP error! Status:', response.status, 'Response:', errorMessage);
          throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Success:', data);
      return data;
  } catch (error) {
      console.error('Error:', error || error);
      throw error;
  } finally {
    revalidatePath("/listings")
    revalidatePath("/")
  }
}

export async function getRegions() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-regions`)
  return response.json()
}

export async function getCities() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-cities`)
  return response.json()
}

export async function getAgents() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-agents`, { cache: 'no-store' })
  return response.json()
}

export async function getListings() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-listings`, { cache: 'no-store' })
  return response.json()
}

export async function getListing(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-listing/${id}`, { cache: 'no-store' })
  return response.json()
}

export async function deleteListing(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/delete-listing/${id}`,
    {
      method: "DELETE",
    }
  );
}