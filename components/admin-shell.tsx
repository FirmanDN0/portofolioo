import Link from "next/link";
import { logout } from "@/app/admin/actions";

const links = [
  ["Dashboard", "/admin"],
  ["Hero", "/admin/hero"],
  ["About & Skills", "/admin/about"],
  ["Services", "/admin/services"],
  ["Projects", "/admin/projects"],
  ["Messages", "/admin/messages"],
  ["Settings", "/admin/settings"]
];

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 lg:flex">
    <aside className="w-full border-b border-slate-200 bg-white px-5 py-5 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between lg:block"><Link href="/admin" className="text-xl font-extrabold text-navy">Portfolio<span className="text-orange-500">.</span></Link><span className="text-xs text-gray-500 lg:mt-2 lg:block">{email}</span></div>
      <nav className="mt-7 grid grid-cols-2 gap-1 text-sm sm:grid-cols-4 lg:grid-cols-1">{links.map(([label, href]) => <Link key={href} href={href} className="rounded-lg px-3 py-2.5 font-medium text-slate-600 hover:bg-blue-50 hover:text-navy">{label}</Link>)}</nav>
      <form action={logout} className="mt-6"><button className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-600 hover:border-red-200 hover:text-red-600">Sign out</button></form>
    </aside>
    <main className="flex-1 p-5 sm:p-8"><div className="mx-auto max-w-7xl">{children}</div></main>
  </div>;
}
