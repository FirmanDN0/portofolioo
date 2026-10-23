import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin, error } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (error || !admin) redirect("/admin/login");
  return { supabase, user };
}
