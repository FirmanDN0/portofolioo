import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function ProjectsAdminPage() {
  const { supabase } = await requireAdmin();
  const { data: projects } = await supabase.from("projects").select("id,slug,title,label,status,categories,updated_at").order("sort_order");
  return <div><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-extrabold">Projects</h1><p className="mt-2 text-sm text-slate-500">Manage published work and draft case studies.</p></div><Link href="/admin/projects/new" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-btn">＋ New project</Link></div><div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-card"><div className="divide-y divide-slate-100">{projects?.length ? projects.map((project) => <div key={project.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-5"><div><p className="font-bold">{project.title}</p><p className="mt-1 text-xs text-slate-500">/{project.slug} · {project.categories?.join(", ")}</p></div><div className="flex items-center gap-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${project.status === "published" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{project.status}</span><Link href={`/admin/projects/${project.slug}`} className="text-sm font-semibold text-navy">Edit</Link></div></div>) : <p className="p-6 text-sm text-slate-500">No projects yet.</p>}</div></div></div>;
}
