import { createBrowserClient } from "@supabase/ssr";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local and restart npm run dev."
    );
  }

  if (!url.startsWith("https://") || !url.includes(".supabase.co")) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL ("${url}"). Use Project Settings → API → Project URL (https://<project-ref>.supabase.co).`
    );
  }

  return { url, anonKey };
}

export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
