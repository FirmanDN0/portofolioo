export function AdminInput({ label, name, defaultValue, type = "text", required = true }: { label: string; name: string; defaultValue?: string | number | null; type?: string; required?: boolean }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<input name={name} type={type} defaultValue={defaultValue ?? ""} required={required} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-navy focus:ring-2 focus:ring-blue-100" /></label>;
}

export function AdminTextarea({ label, name, defaultValue, rows = 5 }: { label: string; name: string; defaultValue?: string | null; rows?: number }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<textarea name={name} defaultValue={defaultValue ?? ""} rows={rows} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-navy focus:ring-2 focus:ring-blue-100" /></label>;
}

export function SaveButton({ children = "Save changes" }: { children?: React.ReactNode }) {
  return <button type="submit" className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-btn hover:bg-blue">{children}</button>;
}
