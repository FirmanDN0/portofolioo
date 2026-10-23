import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Project = {
  slug: string;
  title: string;
  label: string;
  categories: string[];
  cover_url: string | null;
  summary: string | null;
  content?: string | null;
};

const fallbackProjects: Project[] = [
  { slug: "website-landing-page", title: "Website Landing Page Design & Service", label: "Design", categories: ["uiux", "web"], cover_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=640", summary: "A focused landing page concept built to explain a service clearly." },
  { slug: "analytics-dashboard", title: "Analytics Dashboard Experience", label: "Design", categories: ["uiux", "web", "app"], cover_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=640", summary: "A dashboard concept that turns complex metrics into an actionable overview." },
  { slug: "data-visualization", title: "Data Visualization System", label: "Design", categories: ["uiux", "graphic"], cover_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=640", summary: "A visual system for presenting data with consistent patterns and contrast." }
];

export async function getPublishedProjects(): Promise<Project[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase is not configured; rendering seeded preview projects.");
    return fallbackProjects;
  }
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("projects").select("slug,title,label,categories,cover_url,summary").eq("status", "published").order("sort_order");
  if (error) throw new Error(`Unable to load projects: ${error.message}`);
  return data ?? [];
}

export { fallbackProjects };
