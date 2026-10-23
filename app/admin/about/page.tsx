import { requireAdmin } from "@/lib/admin";
import { saveAbout } from "@/app/admin/actions";
import { AdminInput, AdminTextarea, SaveButton } from "@/components/admin-form";

export default async function AboutAdminPage() {
  const { supabase } = await requireAdmin();
  const [{ data: about }, { data: skills }] = await Promise.all([supabase.from("about").select("*").eq("id", 1).maybeSingle(), supabase.from("skills").select("*").order("sort_order")]);
  return <div><h1 className="text-3xl font-extrabold">About & skills</h1><p className="mt-2 text-sm text-slate-500">Edit your story and capability bars.</p><form action={saveAbout} className="mt-8 max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-card sm:p-8"><AdminInput label="Heading" name="heading" defaultValue={about?.heading} /><AdminTextarea label="About text" name="body" defaultValue={about?.body} rows={6} /><AdminInput label="About image URL" name="image_url" defaultValue={about?.image_url} required={false} /><SaveButton /></form><section className="mt-6 max-w-3xl rounded-2xl bg-white p-6 shadow-card"><h2 className="font-bold">Current skills</h2><div className="mt-4 space-y-3">{skills?.length ? skills.map((skill) => <div key={skill.id} className="flex justify-between rounded-xl border border-slate-100 px-4 py-3 text-sm"><span>{skill.name}</span><span className="font-semibold text-navy">{skill.percent}%</span></div>) : <p className="text-sm text-slate-500">No skills yet. Add them through Supabase or the skills CRUD screen.</p>}</div></section></div>;
}
