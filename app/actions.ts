"use server"

import { addAgent } from "@/api"
import { revalidatePath } from "next/cache";

export async function addAgentAction(formData: FormData) {
  try {
    await addAgent(formData);
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/")
  }
}
