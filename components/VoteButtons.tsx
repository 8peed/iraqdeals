"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function VoteButtons({ dealId, initialVotes }: { dealId: string; initialVotes: number }) {
  const supabase = createClient();
  const router = useRouter();
  const [votes, setVotes] = useState(initialVotes);
  const [busy, setBusy] = useState(false);

  async function vote(value: 1 | -1) {
    setBusy(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      router.push("/login");
      setBusy(false);
      return;
    }
    await supabase
      .from("votes")
      .upsert({ deal_id: dealId, user_id: userData.user.id, value }, { onConflict: "deal_id,user_id" });

    const { data: updated } = await supabase.from("deals").select("votes_count").eq("id", dealId).single();
    if (updated) setVotes(updated.votes_count);
    setBusy(false);
  }

  return (
    <div className="flex items-center gap-3 border-t border-dashed border-borderStrong pt-6">
      <button
        onClick={() => vote(1)}
        disabled={busy}
        className="flex items-center gap-2 bg-green-100 text-green-600 font-bold rounded-xl px-4 py-2 hover:bg-green-600 hover:text-white transition disabled:opacity-50"
      >
        ▲ مفيد
      </button>
      <span className="font-mono font-bold text-lg">{votes}</span>
      <button
        onClick={() => vote(-1)}
        disabled={busy}
        className="flex items-center gap-2 bg-red-100 text-red-600 font-bold rounded-xl px-4 py-2 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
      >
        ▼ منتهي
      </button>
    </div>
  );
}
