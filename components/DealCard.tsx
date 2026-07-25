import Link from "next/link";

export type Deal = {
  id: string;
  title: string;
  old_price: number | null;
  new_price: number;
  discount_percent: number | null;
  image_url: string | null;
  store_name: string | null;
  city: string | null;
  votes_count: number;
};

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/deal/${deal.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-md2 hover:shadow-lift hover:-translate-y-1 transition block"
    >
      <div className="h-36 bg-gradient-to-br from-surface2 to-[#e2e6ee] relative">
        {deal.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={deal.image_url} alt={deal.title} className="w-full h-full object-cover" />
        )}
        {deal.discount_percent ? (
          <span className="absolute top-2 left-2 bg-red-500 text-white font-mono font-bold text-xs px-3 py-1 rounded-full">
            -{deal.discount_percent}%
          </span>
        ) : null}
      </div>
      <div className="p-4">
        {deal.store_name && (
          <div className="text-xs font-bold text-teal-600 mb-1">{deal.store_name}</div>
        )}
        <div className="text-[15px] font-medium mb-3 min-h-[38px]">{deal.title}</div>
        <div className="flex items-baseline gap-2 mb-3">
          <b className="font-mono text-xl font-bold text-green-600">
            {Number(deal.new_price).toLocaleString()}
          </b>
          {deal.old_price && (
            <s className="font-mono text-xs text-textlow">
              {Number(deal.old_price).toLocaleString()}
            </s>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-borderStrong pt-3 text-xs text-textlow">
          <span>{deal.city || "عبر الإنترنت"}</span>
          <span className="flex items-center gap-1 text-textmid">▲ {deal.votes_count}</span>
        </div>
      </div>
    </Link>
  );
}
