"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../../utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error: authError } = await supabase.auth.signInWithPassword(data);

  if (authError) {
    return { error: authError.message };
  }
  revalidatePath("/admin", "layout");
  redirect("/admin");
}
