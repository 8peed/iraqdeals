"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function SubmitPage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setChecking(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setLoading(true);

    const oldP = oldPrice ? Number(oldPrice) : null;
    const newP = Number(newPrice);
    const discount = oldP && oldP > 0 ? Math.round(((oldP - newP) / oldP) * 100) : null;

    const { data, error } = await supabase
      .from("deals")
      .insert({
        user_id: user.id,
        title,
        description,
        old_price: oldP,
        new_price: newP,
        discount_percent: discount,
        store_name: storeName,
        city,
        image_url: imageUrl || null,
        product_url: productUrl || null,
      })
      .select()
      .single();

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(`/deal/${data.id}`);
  }

  if (checking) return null;

  if (!user) {
    return (
      <main className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="text-textmid mb-4">لازم تسجل دخولك أول عشان تنشر عرض.</p>
        <a href="/login" className="bg-green-600 text-white font-bold rounded-xl px-6 py-3 inline-block">
          تسجيل الدخول
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-14">
      <h1 className="font-display text-2xl font-bold mb-6">شارك عرض جديد</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl shadow-md2 p-8 space-y-4">
        <input required placeholder="عنوان العرض" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" />
        <textarea placeholder="وصف مختصر (اختياري)" value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" rows={3} />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="السعر القديم" type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}
            className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" />
          <input required placeholder="السعر الجديد" type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)}
            className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" />
        </div>
        <input placeholder="اسم المتجر" value={storeName} onChange={(e) => setStoreName(e.target.value)}
          className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" />
        <input placeholder="المدينة" value={city} onChange={(e) => setCity(e.target.value)}
          className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" />
        <input placeholder="رابط صورة (اختياري)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" />
        <input placeholder="رابط المنتج / صفحة العرض الأصلية (اختياري)" value={productUrl} onChange={(e) => setProductUrl(e.target.value)}
          className="w-full border border-borderStrong rounded-xl px-4 py-3 text-sm outline-none focus:border-green-600" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl py-3 disabled:opacity-60">
          {loading ? "جاري النشر..." : "نشر العرض"}
        </button>
      </form>
    </main>
  );
}
