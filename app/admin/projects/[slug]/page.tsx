import { notFound } from "next/navigation";
import { saveProject } from "@/app/admin/actions";
import { ProjectForm } from "@/app/admin/projects/new/page";
import { requireAdmin } from "@/lib/admin";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { supabase } = await requireAdmin();
  const { data: project } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
  if (!project) notFound();
  return <div><h1 className="text-3xl font-extrabold">Edit project</h1><p className="mt-2 text-sm text-slate-500">Update content and publication status.</p><ProjectForm action={saveProject} project={project} /></div>;
}
