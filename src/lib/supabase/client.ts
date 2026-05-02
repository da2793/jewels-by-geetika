import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // Return cached client
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During SSR/build, return null safely
  if (typeof window === "undefined") {
    if (!url || !key) return null;
  }

  // On client side, if vars are missing, log and return null
  if (!url || !key) {
    console.warn("Supabase env vars missing. URL:", !!url, "Key:", !!key);
    return null;
  }

  client = createBrowserClient(url, key);
  return client;
}
