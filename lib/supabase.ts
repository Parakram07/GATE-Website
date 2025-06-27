import { createClient } from "@supabase/supabase-js"

/**
 * NEXT_PUBLIC_… variables are automatically inlined at build-time.
 * As an extra guard we also add hard-coded fallbacks so preview
 * builds never crash if the env vars were not injected yet.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://bijgrhnlenixctswpwxb.supabase.co"

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpamdyaG5sZW5peGN0c3dwd3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTA0MDUsImV4cCI6MjA2NjUyNjQwNX0.nooRktuZuxCG1hlYh40GEZeaA0wzE0BgDIfUfI635LE"

// Validate that we have the required values
if (!supabaseUrl || supabaseUrl === "undefined") {
  console.warn("Supabase URL is missing. Some features may not work.")
}

if (!supabaseAnonKey || supabaseAnonKey === "undefined") {
  console.warn("Supabase Anon Key is missing. Some features may not work.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side admin client:
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpamdyaG5sZW5peGN0c3dwd3hiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDk1MDQwNSwiZXhwIjoyMDY2NTI2NDA1fQ.GqLQQTobawG94nieO3E0DlU2WAqV5aWWUHcCDdRBm80"

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
