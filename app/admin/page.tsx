import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/admin/login");
  const { count } = await supabase.from("messages").select("*", { count: "exact", head: true });
  return <main className="min-h-screen bg-gray-50 p-8"><div className="mx-auto max-w-5xl"><h1 className="text-4xl font-extrabold text-navy">Portfolio Admin</h1><p className="mt-2 text-gray-500">Signed in as {user.email}</p><div className="mt-8 rounded-2xl bg-white p-6 shadow-card"><p className="text-sm text-gray-500">Inbox messages</p><p className="mt-2 text-4xl font-extrabold">{count ?? 0}</p></div></div></main>;
}
