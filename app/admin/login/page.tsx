import { login } from "./actions";

export default function AdminLoginPage() {
  return <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4"><form action={login} className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-card"><h1 className="text-3xl font-extrabold text-navy">Admin login</h1><p className="text-sm text-gray-500">Sign in to manage your portfolio content.</p><label className="block text-sm font-semibold">Email<input required name="email" type="email" className="mt-2 w-full rounded-xl border p-3 font-normal" /></label><label className="block text-sm font-semibold">Password<input required name="password" type="password" className="mt-2 w-full rounded-xl border p-3 font-normal" /></label><button className="w-full rounded-full bg-navy px-5 py-3 font-semibold text-white" type="submit">Sign in</button></form></main>;
}
