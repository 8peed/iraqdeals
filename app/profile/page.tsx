"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import DeleteDealButton from "@/components/DeleteDealButton";

type MyDeal = {
  id: string;
  title: string;
  new_price: number;
  votes_count: number;
  created_at: string;
};

function achievementFor(count: number) {
  if (count >= 20) return { label: "مساهم موثوق", icon: "💎" };
  if (count >= 5) return { label: "مساهم نشط", icon: "🥈" };
  if (count >= 1) return { label: "مساهم جديد", icon: "🌱" };
  return { label: "لسه ما نشرت شي", icon: "👋" };
}

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [myDeals, setMyDeals] = useState<MyDeal[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setLoading(false);
      return;
    }
    setUser(userData.user);

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("id", userData.user.id)
      .single();

    if (profile) {
      setDisplayName(profile.display_name || "");
      setAvatarUrl(profile.avatar_url || "");
    }

    const { data: deals } = await supabase
      .from("deals")
      .select("id, title, new_price, votes_count, created_at")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    setMyDeals(deals || []);
    setLoading(false);
  }

  async function saveProfile() {
    if (!user) return;
    setSaving(true);
    await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: displayName, avatar_url: avatarUrl });
    setSaving(false);
    setEditing(false);
  }

  if (loading) return null;

  if (!user) {
    return (
      <main className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="text-textmid mb-4">لازم تسجل دخولك أول عشان تشوف ملفك الشخصي.</p>
        <a href="/login" className="bg-green-600 text-white font-bold rounded-xl px-6 py-3 inline-block">
          تسجيل الدخول
        </a>
      </main>
    );
  }

  const achievement = achievementFor(myDeals.length);

  return (
    <main className="max-w-2xl mx-auto px-6 py-14">
      <div className="bg-white border border-border rounded-2xl shadow-md2 p-8 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-600 flex items-center justify-center overflow-hidden shrink-0">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="font-display text-2xl font-bold text-green-600">
                {(displayName || user.email || "؟").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="font-display text-xl font-bold">{displayName || "مستخدم بدون اسم"}</div>
            <div className="text-sm text-textlow">{user.email}</div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 rounded-full px-3 py-1 mt-2">
              {achievement.icon} {achievement.label}
            </div>
          </div>
        </div>

        {editing ? (
          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <input
              placeholder="اسمك"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
            />
            <input
              placeholder="رابط صورة شخصية (اختياري)"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600"
            />
            <div className="flex gap-3">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl px-5 py-2 text-sm disabled:opacity-60"
              >
                {saving ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="border border-borderStrong rounded-xl px-5 py-2 text-sm font-bold"
              >
                إلغاء
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="mt-6 border border-borderStrong rounded-xl px-5 py-2 text-sm font-bold hover:border-green-600 hover:text-green-600"
          >
            تعديل الملف الشخصي
          </button>
        )}
      </div>

      <h2 className="font-display text-xl font-bold mb-4">صفقاتي ({myDeals.length})</h2>

      {myDeals.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-8 text-center text-textmid">
          لسه ما نشرت أي صفقة.
        </div>
      ) : (
        <div className="space-y-3">
          {myDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white border border-border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <Link href={`/deal/${deal.id}`} className="flex-1 min-w-0">
                <div className="font-medium truncate">{deal.title}</div>
                <div className="text-xs text-textlow mt-1">
                  {Number(deal.new_price).toLocaleString()} د.ع · ▲ {deal.votes_count}
                </div>
              </Link>
              <DeleteDealButton dealId={deal.id} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
