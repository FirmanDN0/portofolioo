"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";

const text = z.string().trim().max(5000);

export async function logout() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveHero(formData: FormData) {
  const { supabase } = await requireAdmin();
  const values = {
    greeting: text.parse(formData.get("greeting")),
    title: text.parse(formData.get("title")),
    description: text.parse(formData.get("description")),
    primary_btn_label: text.parse(formData.get("primary_btn_label")),
    primary_btn_href: text.parse(formData.get("primary_btn_href")),
    secondary_btn_label: text.parse(formData.get("secondary_btn_label")),
    secondary_btn_href: text.parse(formData.get("secondary_btn_href")),
    image_url: text.parse(formData.get("image_url"))
  };
  const { error } = await supabase.from("hero").upsert({ id: 1, ...values, updated_at: new Date().toISOString() });
  if (error) throw new Error(`Unable to save hero: ${error.message}`);
  revalidatePath("/");
}

export async function saveAbout(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("about").upsert({
    id: 1,
    heading: text.parse(formData.get("heading")),
    body: text.parse(formData.get("body")),
    image_url: text.parse(formData.get("image_url")),
    updated_at: new Date().toISOString()
  });
  if (error) throw new Error(`Unable to save about: ${error.message}`);
  revalidatePath("/");
}

export async function saveProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const categories = String(formData.get("categories") || "").split(",").map((value) => value.trim()).filter(Boolean);
  const { error } = await supabase.from("projects").upsert({
    slug: text.parse(formData.get("slug")),
    title: text.parse(formData.get("title")),
    label: text.parse(formData.get("label")),
    categories,
    cover_url: text.parse(formData.get("cover_url")),
    summary: text.parse(formData.get("summary")),
    content: text.parse(formData.get("content")),
    external_url: text.parse(formData.get("external_url")),
    status: formData.get("status") === "published" ? "published" : "draft",
    sort_order: Number(formData.get("sort_order") || 0),
    updated_at: new Date().toISOString()
  }, { onConflict: "slug" });
  if (error) throw new Error(`Unable to save project: ${error.message}`);
  revalidatePath("/");
  revalidatePath("/projects/[slug]", "page");
}

export async function saveService(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").upsert({
    id: String(formData.get("id") || crypto.randomUUID()),
    title: text.parse(formData.get("title")),
    description: text.parse(formData.get("description")),
    icon: text.parse(formData.get("icon")),
    link_url: text.parse(formData.get("link_url")),
    is_highlighted: formData.get("is_highlighted") === "on",
    is_visible: formData.get("is_visible") === "on",
    sort_order: Number(formData.get("sort_order") || 0)
  });
  if (error) throw new Error(`Unable to save service: ${error.message}`);
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").delete().eq("id", String(formData.get("id")));
  if (error) throw new Error(`Unable to delete service: ${error.message}`);
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function markMessageRead(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("messages").update({ is_read: true }).eq("id", String(formData.get("id")));
  if (error) throw new Error(`Unable to update message: ${error.message}`);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("messages").delete().eq("id", String(formData.get("id")));
  if (error) throw new Error(`Unable to delete message: ${error.message}`);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function saveSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    site_title: text.parse(formData.get("site_title")),
    meta_description: text.parse(formData.get("meta_description")),
    cta_label: text.parse(formData.get("cta_label")),
    cta_href: text.parse(formData.get("cta_href")),
    contact_email: text.parse(formData.get("contact_email")),
    contact_phone: text.parse(formData.get("contact_phone")),
    footer_copyright: text.parse(formData.get("footer_copyright")),
    updated_at: new Date().toISOString()
  });
  if (error) throw new Error(`Unable to save settings: ${error.message}`);
  revalidatePath("/");
}
