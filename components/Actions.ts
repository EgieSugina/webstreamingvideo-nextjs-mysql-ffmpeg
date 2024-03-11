"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function navigate(link) {
  redirect(link);
}
export async function navigateRevalidatePath(link) {
  revalidatePath(link);
}
