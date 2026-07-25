"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DeleteDealButton({
  dealId,
  redirectAfter,
}: {
  dealId: string;
  redirectAfter?: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    const sure = window.confirm("متأكد تريد تحذف هذا العرض؟ ما يرجع بعد الحذف.");
    if (!sure) return;
    setBusy(true);
    const { error } = await supabase.from("deals").delete().eq("id", dealId);
    setBusy(false);
    if (error) {
      alert("صار خطأ: " + error.message);
      return;
    }
    if (redirectAfter) {
      router.push(redirectAfter);
    } else {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-lg px-3 py-1.5 text-xs font-bold transition disabled:opacity-50"
    >
      {busy ? "جاري الحذف..." : "🗑 حذف"}
    </button>
  );
}
