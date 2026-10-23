"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/content";

const filters = [
  ["all", "All"], ["uiux", "UI/UX"], ["web", "Website Design"], ["app", "App Design"], ["graphic", "Graphic Design"]
];

export function Portfolio({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter((project) => filter === "all" || project.categories.includes(filter));
  return (
    <section id="portfolio" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">My Portfolio</h2>
          <p className="text-sm leading-relaxed text-gray-500">Explore a collection of thoughtful, user-centered digital experiences.</p>
        </div>
        <div className="mb-14 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
          {filters.map(([value, label]) => (
            <button key={value} type="button" role="tab" aria-selected={filter === value} onClick={() => setFilter(value)}
              className={`rounded-full px-5 py-2 text-sm transition-all ${filter === value ? "bg-navy font-semibold text-white shadow-sm" : "bg-gray-50 font-medium text-gray-600 hover:bg-gray-100 hover:text-navy"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group rounded-2xl bg-card p-3.5 shadow-lg transition-all hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-gray-100">
                {project.cover_url && <Image src={project.cover_url} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
              </div>
              <div className="px-1 pb-2 pt-4"><span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-amber-500">{project.label}</span><h3 className="text-base font-bold leading-snug text-white group-hover:text-blue-300">{project.title}</h3></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
