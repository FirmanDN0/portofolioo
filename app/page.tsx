import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Portfolio } from "@/components/portfolio";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { getPublishedProjects } from "@/lib/content";

const skills = [["UX", 92, "#C93B47"], ["Website Design", 96, "#D97706"], ["App Design", 85, "#4B5563"], ["Graphic Design", 88, "#1E2B8F"]] as const;
const services = [
  ["01", "UI/UX Design", "Research-led flows and interfaces that make products easy to use.", "◈"],
  ["02", "Web Design", "Responsive systems with strong hierarchy and accessible interactions.", "▣"],
  ["03", "App Design", "Mobile-first experiences that keep important tasks focused.", "◉"],
  ["04", "Graphic Design", "Visual assets that make products recognizable and consistent.", "✎"]
];

export default async function HomePage() {
  const projects = await getPublishedProjects();
  return <div className="selection-navy overflow-hidden">
    <SiteHeader />
    <main>
      <section id="hero" className="relative isolate overflow-hidden pb-24 pt-14 lg:pb-36 lg:pt-24">
        <div className="hero-grid absolute inset-0 -z-20" />
        <div className="absolute -right-32 top-16 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl hero-glow" />
        <div className="absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-orange-100/50 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <Reveal className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-navy shadow-sm backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Available for selected projects
            </div>
            <p className="text-lg font-bold tracking-tight text-slate-800">Hi, I&apos;m Firman</p>
            <h1 className="mt-4 max-w-2xl text-5xl font-extrabold leading-[1.03] tracking-[-.04em] text-navy sm:text-7xl">Designing digital<br /><span className="text-slate-900">experiences that matter.</span></h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-slate-500 lg:mx-0">I turn complex ideas into clear, useful, and memorable products through thoughtful UX strategy and expressive visual design.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"><Link href="#contact" className="group rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-btn transition hover:-translate-y-1 hover:bg-blue">Start a conversation <span className="ml-2 inline-block transition group-hover:translate-x-1">↗</span></Link><Link href="#portfolio" className="rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-1 hover:border-navy hover:text-navy">Explore my work</Link></div>
            <div className="mt-10 flex items-center justify-center gap-7 text-left lg:justify-start"><div><p className="text-2xl font-extrabold text-slate-900">3+</p><p className="text-xs text-slate-500">Selected projects</p></div><span className="h-8 w-px bg-slate-200" /><div><p className="text-2xl font-extrabold text-slate-900">4</p><p className="text-xs text-slate-500">Design disciplines</p></div></div>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-md">
            <div className="hero-orbit absolute -inset-7 rounded-full border border-dashed border-navy/15" /><div className="absolute -inset-3 rounded-full border border-navy/10" />
            <div className="hero-glow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-slate-100 shadow-2xl shadow-navy/15"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700" alt="Professional UI and UX designer portrait" width={700} height={850} priority className="relative aspect-[4/5] object-cover grayscale-[10%] transition duration-700 hover:scale-105" /></div>
            <div className="absolute -left-5 top-10 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-float backdrop-blur"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Focus</p><p className="mt-1 text-sm font-bold text-navy">Human-centered design</p></div>
            <div className="absolute -bottom-5 -right-4 rounded-2xl border border-white bg-navy px-4 py-3 text-white shadow-float"><p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Approach</p><p className="mt-1 text-sm font-bold">Simple. Useful. Distinct.</p></div>
          </Reveal>
        </div>
      </section>
      <Reveal><section id="about" className="border-y border-slate-100 bg-white py-24 sm:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div className="relative mx-auto w-full max-w-sm"><div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-3xl bg-orange-100" /><div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-blue-100" /><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" alt="Portrait for the about section" width={600} height={750} className="relative rounded-[2rem] shadow-card" /></div><div><p className="text-sm font-bold uppercase tracking-[.2em] text-blue">About me</p><h2 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Good design feels obvious.</h2><p className="mt-6 max-w-2xl leading-relaxed text-slate-500">I combine research, structure, and visual craft to help digital products feel clear and useful. Every screen is an opportunity to remove friction and create a moment of confidence.</p><div className="mt-9 max-w-xl space-y-5">{skills.map(([name, percent, color]) => <div key={name}><div className="mb-2 flex justify-between text-sm font-bold"><span>{name}</span><span className="text-xs font-normal text-slate-400">{percent}%</span></div><div className="h-2 overflow-visible rounded-full bg-slate-100"><div className="relative h-full rounded-full transition-all duration-1000" style={{ width: `${percent}%`, backgroundColor: color }}><span className="absolute -right-1.5 -top-1 h-4 w-4 rounded-full border-4 border-white bg-current shadow" style={{ color }} /></div></div></div>)}</div></div></div></section></Reveal>
      <section id="services" className="relative overflow-hidden bg-gradient-to-br from-[#f3f6ff] via-[#e8edff] to-[#dce4f5] py-24 sm:py-32"><div className="absolute -right-20 top-10 h-64 w-64 rounded-full border border-white/70" /><div className="absolute -right-10 top-20 h-44 w-44 rounded-full border border-white/70" /><div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Reveal className="mx-auto mb-14 max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[.2em] text-blue">What I do</p><h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Design with purpose.</h2><p className="mt-4 text-sm leading-relaxed text-slate-500">From the first rough idea to the final polished interaction, I help shape products people enjoy using.</p></Reveal><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(([number, title, description, icon], index) => <Reveal key={title} delay={index * 80}><article className={`group h-full rounded-3xl p-6 transition duration-500 hover:-translate-y-2 ${index === 1 ? "bg-white shadow-card" : "border border-white/70 bg-white/40 backdrop-blur-sm hover:bg-white hover:shadow-card"}`}><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100/70 text-2xl text-navy transition group-hover:rotate-6 group-hover:bg-navy group-hover:text-white">{icon}</div><span className="text-xs font-bold text-slate-300">{number}</span></div><h3 className="mt-7 font-bold text-slate-900">{title}</h3><p className="mt-3 text-xs leading-relaxed text-slate-600">{description}</p><span className="mt-6 inline-block text-xs font-bold text-navy transition group-hover:translate-x-1">Explore service <span aria-hidden="true">→</span></span></article></Reveal>)}</div></div></section>
      <Reveal><Portfolio projects={projects} /></Reveal>
      <Reveal><section id="contact" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" /><div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-blue-300">Let&apos;s connect</p><h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Have an idea?<br /><span className="text-blue-300">Let&apos;s make it real.</span></h2><p className="mt-6 max-w-md leading-relaxed text-slate-400">Tell me a little about what you&apos;re building. I&apos;ll reply with the next practical step.</p></div><ContactForm /></div></section></Reveal>
    </main>
    <footer className="bg-slate-950 px-4 pb-10 text-center text-sm text-slate-500"><div className="mx-auto max-w-7xl border-t border-white/10 pt-7"><p>© 2026 Firman Dwi Nugraha. Crafted with intention.</p></div></footer>
  </div>;
}
