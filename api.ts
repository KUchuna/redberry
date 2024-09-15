export async function addAgent(formData: FormData) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add-agent`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
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