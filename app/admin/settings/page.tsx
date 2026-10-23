import { saveSettings } from "@/app/admin/actions";
import { AdminInput, AdminTextarea, SaveButton } from "@/components/admin-form";
import { requireAdmin } from "@/lib/admin";

export default async function SettingsAdminPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return <div><h1 className="text-3xl font-extrabold">Site settings</h1><p className="mt-2 text-sm text-slate-500">Manage SEO, CTA, contact information, and footer content.</p><form action={saveSettings} className="mt-8 max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-card sm:p-8"><AdminInput label="Site title" name="site_title" defaultValue={data?.site_title} /><AdminTextarea label="Meta description" name="meta_description" defaultValue={data?.meta_description} rows={3} /><div className="grid gap-5 sm:grid-cols-2"><AdminInput label="CTA label" name="cta_label" defaultValue={data?.cta_label} /><AdminInput label="CTA link" name="cta_href" defaultValue={data?.cta_href} /><AdminInput label="Contact email" name="contact_email" type="email" defaultValue={data?.contact_email} required={false} /><AdminInput label="Contact phone / WhatsApp" name="contact_phone" defaultValue={data?.contact_phone} required={false} /></div><AdminInput label="Footer copyright" name="footer_copyright" defaultValue={data?.footer_copyright} required={false} /><SaveButton /></form></div>;
}
