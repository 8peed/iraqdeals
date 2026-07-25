import { createBrowserClient } from "@supabase/ssr";

// ملاحظة: هذا المفتاح (anon key) مصمم من سوبابيس ليكون ظاهر بكود الموقع (Frontend)،
// الحماية الفعلية تصير عن طريق RLS Policies بقاعدة البيانات.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://selkgnypudllergjprbl.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbGtnbnlwdWRsbGVyZ2pwcmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5Njc4MjQsImV4cCI6MjEwMDU0MzgyNH0.c7euwWoFpXd6UEezhpZ_LAIKJQkO7Bh9xhajko7lIig";

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
