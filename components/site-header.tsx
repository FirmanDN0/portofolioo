"use client";

import Link from "next/link";
import { useState } from "react";

const links = [["Services", "#services"], ["Portfolio", "#portfolio"], ["About", "#about"], ["Contact", "#contact"]];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="#hero" onClick={() => setOpen(false)} className="group flex items-center gap-2 text-xl font-extrabold tracking-tight text-navy">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-sm text-white shadow-btn transition duration-300 group-hover:rotate-6 group-hover:bg-blue">FD</span>
        <span>Firman<span className="text-orange-500">.</span></span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex" aria-label="Main navigation">
        <Link href="#hero" className="nav-link">Home</Link>
        {links.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <Link href="#contact" className="hidden rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white shadow-btn transition hover:-translate-y-0.5 hover:bg-blue sm:inline-flex">Let&apos;s Talk <span aria-hidden="true" className="ml-2">↗</span></Link>
        <button type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-navy md:hidden">
          <span className={`hamburger ${open ? "hamburger-open" : ""}`}><i /><i /></span>
        </button>
      </div>
    </div>
    <div className={`mobile-menu md:hidden ${open ? "mobile-menu-open" : ""}`}>
      <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-5 sm:px-6" aria-label="Mobile navigation">
        <Link href="#hero" onClick={() => setOpen(false)} className="mobile-link">Home</Link>
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="mobile-link">{label}</Link>)}
        <Link href="#contact" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-navy px-5 py-3 text-center text-sm font-semibold text-white">Let&apos;s Talk <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>
  </header>;
}
