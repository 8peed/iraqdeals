import { createClient } from "@/lib/supabaseClient";
import DealCard, { Deal } from "@/components/DealCard";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();
  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(24);

  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-green-600 uppercase tracking-wider mb-4">
          <span className="w-4 h-0.5 bg-green-600 inline-block" /> مجتمع الصفقات الأول في العراق
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          الصفقة الحقيقية <span className="text-green-600">يلقاها الناس</span>، مو الخوارزمية
        </h1>
        <p className="text-lg text-textmid max-w-xl mx-auto">
          آلاف العراقيين يشاركون أرخص الأسعار كل يوم. صوّت، علّق، ووفّر فلوسك.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-2xl font-bold">أحدث الصفقات</h2>
        </div>

        {!deals || deals.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-12 text-center text-textmid">
            ماكو صفقات لسه. كن أول شخص ينشر عرض!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(deals as Deal[]).map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
