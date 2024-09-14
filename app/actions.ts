"use server"

import { addAgent } from "@/api"

export async function addAgentAction(formData: FormData) {
  try {
    await addAgent(formData);
  } catch (error) {
    console.log(error);
  } finally {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}
