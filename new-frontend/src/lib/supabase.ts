import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function optimizeImg(url: string | null | undefined, width: number = 800) {
  if (!url || typeof url !== "string") return url || "";
  let normalized = url;

  if (!url.startsWith("http") && !url.startsWith("//")) {
    normalized = `${supabaseUrl}/storage/v1/object/public/${url}`;
  } else if (url.startsWith("//")) {
    normalized = "https:" + url;
  }

  if (normalized.toLowerCase().endsWith(".svg") || !normalized.includes("supabase.co")) {
    return normalized;
  }

  return `https://wsrv.nl/?url=${encodeURIComponent(normalized)}&w=${width}&q=80&output=webp`;
}
