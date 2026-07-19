import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Handles email confirmation / OAuth redirects from Supabase.
 * Configure this URL in Supabase Auth → Redirect URLs:
 *   http://localhost:3000/auth/callback
 *   http://localhost:3001/auth/callback
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
