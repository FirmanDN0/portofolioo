import { saveProject } from "@/app/admin/actions";
import { AdminInput, AdminTextarea, SaveButton } from "@/components/admin-form";
import { requireAdmin } from "@/lib/admin";

export default async function NewProjectPage() {
  await requireAdmin();
  return <div><h1 className="text-3xl font-extrabold">New project</h1><p className="mt-2 text-sm text-slate-500">Add a portfolio project or save it as a draft.</p><ProjectForm action={saveProject} /></div>;
}

export function ProjectForm({ action, project }: { action: (formData: FormData) => void; project?: Record<string, unknown> }) {
  return <form action={action} className="mt-8 max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-card sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><AdminInput label="Title" name="title" defaultValue={project?.title as string} /><AdminInput label="Slug" name="slug" defaultValue={project?.slug as string} /><AdminInput label="Label" name="label" defaultValue={(project?.label as string) || "Design"} /><AdminInput label="Categories (comma separated)" name="categories" defaultValue={Array.isArray(project?.categories) ? project?.categories.join(", ") : ""} /></div><AdminInput label="Cover image URL" name="cover_url" defaultValue={project?.cover_url as string} required={false} /><AdminTextarea label="Summary" name="summary" defaultValue={project?.summary as string} rows={3} /><AdminTextarea label="Case study content" name="content" defaultValue={project?.content as string} rows={8} /><div className="grid gap-5 sm:grid-cols-2"><AdminInput label="External URL" name="external_url" defaultValue={project?.external_url as string} required={false} /><AdminInput label="Sort order" name="sort_order" type="number" defaultValue={(project?.sort_order as number) || 0} /></div><label className="block text-sm font-semibold text-slate-700">Status<select name="status" defaultValue={(project?.status as string) || "draft"} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal"><option value="draft">Draft</option><option value="published">Published</option></select></label><SaveButton>Save project</SaveButton></form>;
}
