import { createClient } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import VoteButtons from "@/components/VoteButtons";
import OwnerActions from "@/components/OwnerActions";

export const revalidate = 0;

export default async function DealPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: deal } = await supabase.from("deals").select("*").eq("id", params.id).single();

  if (!deal) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <div className="bg-white border border-border rounded-2xl shadow-md2 overflow-hidden">
        {deal.image_url ? (
          <img src={deal.image_url} alt={deal.title} className="w-full h-72 object-cover" />
        ) : null}
        <div className="p-8">
          {deal.store_name ? (
            <div className="text-sm font-bold text-teal-600 mb-2">{deal.store_name}</div>
          ) : null}
          <h1 className="font-display text-3xl font-bold mb-4">{deal.title}</h1>
          {deal.description ? <p className="text-textmid mb-6">{deal.description}</p> : null}

          <div className="flex items-baseline gap-3 mb-6">
            <b className="font-mono text-3xl font-bold text-green-600">
              {Number(deal.new_price).toLocaleString()}
            </b>
            {deal.old_price ? (
              <s className="font-mono text-textlow">{Number(deal.old_price).toLocaleString()}</s>
            ) : null}
            {deal.discount_percent ? (
              <span className="bg-red-500 text-white font-mono font-bold text-sm px-3 py-1 rounded-full">
                -{deal.discount_percent}%
              </span>
            ) : null}
          </div>

          {deal.product_url ? (
            
              href={deal.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-100 text-teal-600 font-bold rounded-xl px-4 py-2 text-sm mb-6"
            >
              شوف المنتج بموقع المتجر
            </a>
          ) : null}

          <VoteButtons dealId={deal.id} initialVotes={deal.votes_count} />
          <OwnerActions dealId={deal.id} dealUserId={deal.user_id} />
        </div>
      </div>
    </main>
  );
}
