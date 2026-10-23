import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fallbackProjects } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project = fallbackProjects.find((item) => item.slug === slug);
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("projects").select("title,label,summary,content,cover_url").eq("slug", slug).eq("status", "published").maybeSingle();
    if (error) throw new Error(`Unable to load project: ${error.message}`);
    if (!data) notFound();
    project = { ...project, ...data, slug, categories: [] };
  }
  if (!project) notFound();
  return <main className="mx-auto max-w-3xl px-6 py-16"><Link href="/#portfolio" className="font-semibold text-navy">← Back to portfolio</Link><p className="mt-12 text-xs font-bold uppercase tracking-widest text-amber-600">{project.label}</p><h1 className="mt-3 text-4xl font-extrabold">{project.title}</h1><p className="mt-5 text-lg leading-relaxed text-gray-500">{project.summary}</p>{project.cover_url && <Image src={project.cover_url} alt={project.title} width={1200} height={825} className="my-10 rounded-2xl" />}<h2 className="text-2xl font-bold">Approach</h2><p className="mt-3 leading-relaxed text-gray-600">{project.content || "The experience is structured around clear hierarchy, responsive spacing, and accessible interactions."}</p></main>;
}
