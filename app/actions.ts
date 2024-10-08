"use server"

import { addAgent, addListing, deleteListing } from "@/api"
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
    revalidatePath("/listings")
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/")
    redirect("/")
  }
}

export async function deleteListingAction(id: number){
  try {
    await deleteListing(id)
  } catch (error) {
    console.log(error)
  } finally {
    revalidatePath('/listings')
    redirect('/')
  }
}
