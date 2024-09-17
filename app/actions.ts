"use server"

import { addAgent, addListing } from "@/api"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addAgentAction(formData: FormData) {
  try {
    await addAgent(formData);
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/")
  }
}

export async function addListingAction(formData: FormData) {
  try {
    await addListing(formData);
    revalidatePath("/")
  } catch (error) {
    console.log(error);
  } finally {
    redirect("/")
  }
}



