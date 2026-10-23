import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const schema = z.object({ name: z.string().trim().min(1).max(100), email: z.email(), message: z.string().trim().min(10).max(5000), website: z.string().optional() });

export async function POST(request: Request) {
  const body = await request.formData();
  const input = schema.safeParse(Object.fromEntries(body.entries()));
  if (!input.success) return NextResponse.json({ message: "Please check your name, email, and message." }, { status: 400 });
  if (input.data.website) return NextResponse.json({ message: "Message rejected." }, { status: 400 });
  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("messages").insert({ name: input.data.name, email: input.data.email, body: input.data.message });
    if (error) throw new Error(error.message);
    return NextResponse.json({ message: "Thanks! Your message has been sent." });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ message: "Unable to send your message right now." }, { status: 500 });
  }
}
