"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="max-w-md mx-auto px-6 py-20">
      <div className="bg-white border border-border rounded-2xl shadow-md2 p-8">
        <h1 className="font-display text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="الإيميل"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl py-3 disabled:opacity-60"
          >
            {loading ? "جاري..." : mode === "login" ? "دخول" : "إنشاء حساب"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-center text-sm text-green-600 font-bold mt-5"
        >
          {mode === "login" ? "ماكو حساب؟ سوّي وحدة جديدة" : "عندك حساب؟ سجل دخولك"}
        </button>
      </div>
    </main>
  );
}
