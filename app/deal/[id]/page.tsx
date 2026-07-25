import { createClient } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import VoteButtons from "@/components/VoteButtons";

export const revalidate = 0;

export default async function DealPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: deal } = await supabase.from("deals").select("*").eq("id", params.id).single();

  if (!deal) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <div className="bg-white border border-border rounded-2xl shadow-md2 overflow-hidden">
        {deal.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={deal.image_url} alt={deal.title} className="w-full h-72 object-cover" />
        )}
        <div className="p-8">
          {deal.store_name && <div className="text-sm font-bold text-teal-600 mb-2">{deal.store_name}</div>}
          <h1 className="font-display text-3xl font-bold mb-4">{deal.title}</h1>
          {deal.description && <p className="text-textmid mb-6">{deal.description}</p>}

          <div className="flex items-baseline gap-3 mb-6">
            <b className="font-mono text-3xl font-bold text-green-600">
              {Number(deal.new_price).toLocaleString()}
            </b>
            {deal.old_price && (
              <s className="font-mono text-textlow">{Number(deal.old_price).toLocaleString()}</s>
            )}
            {deal.discount_percent ? (
              <span className="bg-red-500 text-white font-mono font-bold text-sm px-3 py-1 rounded-full">
                -{deal.discount_percent}%
              </span>
            ) : null}
          </div>

          <VoteButtons dealId={deal.id} initialVotes={deal.votes_count} />
        </div>
      </div>
    </main>
  );
}
