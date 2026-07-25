"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import DeleteDealButton from "@/components/DeleteDealButton";

export default function OwnerActions({ dealId, dealUserId }: { dealId: string; dealUserId: string | null }) {
  const supabase = createClient();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user && dealUserId && data.user.id === dealUserId) {
        setIsOwner(true);
      }
    });
  }, [dealUserId]);

  if (!isOwner) return null;

  return (
    <div className="mt-4">
      <DeleteDealButton dealId={dealId} redirectAfter="/" />
    </div>
  );
}
