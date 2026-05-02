import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  // During build/prerender, env vars may be empty strings
  // The client will be non-functional but won't crash
  if (!url || !key) {
    return null;
  }

  client = createBrowserClient(url, key);
  return client;
}
