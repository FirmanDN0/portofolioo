"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState(false);
  async function submit(formData: FormData) {
    setStatus(null);
    setError(false);
    const response = await fetch("/api/contact", { method: "POST", body: formData });
    const result = await response.json();
    setStatus(result.message);
    setError(!response.ok);
    if (response.ok) (document.getElementById("contact-form") as HTMLFormElement).reset();
  }
  return <form id="contact-form" action={submit} className="space-y-5 rounded-2xl bg-white p-6 shadow-card sm:p-8">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold text-gray-900">Name<input required name="name" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-navy" /></label>
      <label className="text-sm font-semibold text-gray-900">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-navy" /></label>
    </div>
    <label className="block text-sm font-semibold text-gray-900">Message<textarea required minLength={10} name="message" rows={5} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-navy" /></label>
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <button className="rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-blue" type="submit">Send Message</button>
    {status && <p role="status" className={error ? "text-sm text-red-600" : "text-sm text-green-700"}>{status}</p>}
  </form>;
}
