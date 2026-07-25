"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl font-extrabold flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 text-white rounded-lg flex items-center justify-center -rotate-6">🏷️</div>
          عراق<span className="text-green-600">ديلز</span>
        </Link>
        <div className="hidden md:flex gap-8 text-[15px] font-medium text-textmid">
          <Link href="/" className="hover:text-green-600">العروض</Link>
          <Link href="/submit" className="hover:text-green-600">شارك عرض</Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/profile" className="text-sm text-textmid hidden sm:inline hover:text-green-600">حسابي</Link>
              <button onClick={handleLogout} className="border border-borderStrong rounded-xl px-4 py-2 text-sm font-bold hover:border-green-600 hover:text-green-600">
                خروج
              </button>
            </>
          ) : (
            <Link href="/login" className="border border-borderStrong rounded-xl px-4 py-2 text-sm font-bold hover:border-green-600 hover:text-green-600">
              تسجيل الدخول
            </Link>
          )}
          <Link href="/submit" className="bg-green-600 hover:bg-green-500 text-white rounded-xl px-5 py-2 text-sm font-bold">
            + شارك عرض
          </Link>
        </div>
      </nav>
    </header>
  );
}
