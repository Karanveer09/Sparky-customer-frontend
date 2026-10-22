import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase.storage
    .from("invoices")
    .upload("test.txt", "HELLO");

  return Response.json({ data, error });
}
