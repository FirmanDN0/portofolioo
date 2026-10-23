import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Portfolio } from "@/components/portfolio";
import { getPublishedProjects } from "@/lib/content";

export default async function HomePage() {
  const projects = await getPublishedProjects();
  return <>
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#hero" className="text-xl font-extrabold text-navy">FD<span className="text-orange-500">.</span></Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <Link href="#hero">Home</Link><Link href="#services">Services</Link><Link href="#portfolio">Portfolio</Link><Link href="#about">About Us</Link><Link href="#contact">Contact Us</Link>
        </nav>
        <Link href="#contact" className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white shadow-btn hover:bg-blue">Let&apos;s Talk</Link>
      </div>
    </header>
    <main>
      <section id="hero" className="overflow-hidden pb-20 pt-16 lg:pb-32 lg:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6 text-center lg:text-left"><p className="text-xl font-bold">Hi I am</p><h1 className="text-5xl font-extrabold leading-tight tracking-tight text-navy sm:text-6xl">UI &amp; UX<br />Designer</h1><p className="mx-auto max-w-lg leading-relaxed text-gray-500 lg:mx-0">With a passion for clean, intuitive, and effective design, I create digital products that enhance everyday experiences.</p><div className="flex justify-center gap-4 pt-4 lg:justify-start"><Link href="#contact" className="rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white shadow-btn hover:bg-blue">Contact Us</Link><Link href="#portfolio" className="rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 hover:border-navy hover:text-navy">Portfolio</Link></div></div>
          <div className="relative mx-auto w-full max-w-md"><div className="absolute inset-0 m-auto h-[110%] w-[110%] rounded-full border border-gray-200" /><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700" alt="Professional UI and UX designer portrait" width={700} height={850} priority className="relative rounded-3xl object-cover" /></div>
        </div>
      </section>
      <section id="about" className="py-20 sm:py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:px-8"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" alt="Portrait for the about section" width={600} height={750} className="mx-auto rounded-3xl shadow-card" /><div className="space-y-6"><h2 className="text-4xl font-extrabold tracking-tight">About Me</h2><p className="leading-relaxed text-gray-500">Passionate UI/UX Designer with a creative approach to crafting intuitive and engaging user experiences. I combine research, structure, and visual craft to help digital products feel clear and useful.</p><div className="space-y-5">{[["UX",92,"#C93B47"],["Website Design",96,"#D97706"],["App Design",85,"#4B5563"],["Graphic Design",88,"#1E2B8F"]].map(([name, percent, color]) => <div key={name as string}><div className="mb-2 flex justify-between text-sm font-bold"><span>{name}</span><span className="text-xs font-normal text-gray-400">{percent}%</span></div><div className="h-2 rounded-full bg-gray-200"><div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color as string }} /></div></div>)}</div></div></div></section>
      <section id="services" className="bg-gradient-to-b from-[#EFF3FC] to-[#DCE4F5] py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-14 max-w-2xl text-center"><h2 className="text-4xl font-extrabold">My Design Services</h2><p className="mt-3 text-sm leading-relaxed text-gray-500">Crafting visually engaging interfaces that are intuitive, useful, and user-centered.</p></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[["UI/UX Design","Research-led flows and interfaces that make products easy to use."],["Web Design","Responsive systems with strong hierarchy and accessible interactions."],["App Design","Mobile-first experiences that keep important tasks focused."],["Graphic Design","Visual assets that make products recognizable and consistent."]].map(([title, description], index) => <article key={title} className={`rounded-2xl p-6 ${index === 1 ? "bg-white shadow-card" : "border border-white/50 bg-white/40"}`}><div className="mb-5 text-3xl text-navy">{["◈","▣","◉","✎"][index]}</div><h3 className="mb-2 font-bold">{title}</h3><p className="text-xs leading-relaxed text-gray-600">{description}</p></article>)}</div></div></section>
      <Portfolio projects={projects} />
      <section id="contact" className="bg-gray-50 py-20 sm:py-24"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><h2 className="text-4xl font-extrabold">Let&apos;s Work Together</h2><p className="mt-3 text-sm text-gray-500">Have a project in mind? Share a few details and I will get back to you soon.</p></div><ContactForm /></div></section>
    </main>
    <footer className="bg-gray-900 py-10 text-center text-sm text-gray-400"><p>© 2026 UI &amp; UX Designer Portfolio. All rights reserved.</p></footer>
  </>;
}
