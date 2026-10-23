import { requireAdmin } from "@/lib/admin";
import { saveHero } from "@/app/admin/actions";
import { AdminInput, AdminTextarea, SaveButton } from "@/components/admin-form";

export default async function HeroAdminPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("hero").select("*").eq("id", 1).maybeSingle();
  return <div><h1 className="text-3xl font-extrabold">Hero section</h1><p className="mt-2 text-sm text-slate-500">Control the first message visitors see.</p><form action={saveHero} className="mt-8 max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-card sm:p-8"><AdminInput label="Greeting" name="greeting" defaultValue={data?.greeting} /><AdminInput label="Title" name="title" defaultValue={data?.title} /><AdminTextarea label="Description" name="description" defaultValue={data?.description} rows={4} /><div className="grid gap-5 sm:grid-cols-2"><AdminInput label="Primary button label" name="primary_btn_label" defaultValue={data?.primary_btn_label} /><AdminInput label="Primary button link" name="primary_btn_href" defaultValue={data?.primary_btn_href} /><AdminInput label="Secondary button label" name="secondary_btn_label" defaultValue={data?.secondary_btn_label} /><AdminInput label="Secondary button link" name="secondary_btn_href" defaultValue={data?.secondary_btn_href} /></div><AdminInput label="Portrait image URL" name="image_url" defaultValue={data?.image_url} required={false} /><SaveButton /></form></div>;
}
