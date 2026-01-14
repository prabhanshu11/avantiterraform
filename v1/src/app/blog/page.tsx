import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

const articles = [
  {
    title: "Why Your Waterproofing Failed: The Skills Behind Every System",
    slug: "waterproofing-skills-not-just-products",
    category: "Technical",
    excerpt: "The same crystalline coating rated for 460 feet of hydrostatic pressure becomes worthless on unsaturated concrete. Most failures are application failures, not product failures.",
  },
  {
    title: "Engineering on Slopes: The Calculations That Make Buildings Stand",
    slug: "slope-construction-engineering-calculator",
    category: "Guides",
    excerpt: "Every hillside building defies gravity through careful calculation. Most residential projects underutilize techniques that are standard in civil engineering.",
  },
  {
    title: "CRZ Compliance: What Every Business Owner Needs to Know Before Buying Coastal Property",
    slug: "crz-compliance-business-owner-guide",
    category: "Regulatory",
    excerpt: "The Maradu apartments demolition wasn't an anomaly. ₹5 lakh/day NGT fines until compliance. Criminal charges under IPC 406 and 420.",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#fafafa]">
        {/* Hero */}
        <section className="py-16 bg-[#2c3e50] text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">From the field</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Technical insights, regulatory guides, and practical knowledge from decades of construction experience.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-[#2c3e50] text-white rounded-full text-sm font-medium">
                All
              </button>
              <button className="px-4 py-2 bg-[#e0e0e0] text-[#4a4a4a] rounded-full text-sm font-medium hover:bg-[#d0d0d0] transition-colors">
                Technical
              </button>
              <button className="px-4 py-2 bg-[#e0e0e0] text-[#4a4a4a] rounded-full text-sm font-medium hover:bg-[#d0d0d0] transition-colors">
                Guides
              </button>
              <button className="px-4 py-2 bg-[#e0e0e0] text-[#4a4a4a] rounded-full text-sm font-medium hover:bg-[#d0d0d0] transition-colors">
                Regulatory
              </button>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block bg-white p-8 rounded-lg border border-[#e0e0e0] hover:border-[#d35400] transition-colors"
                >
                  <span className="inline-block text-xs font-medium text-[#d35400] uppercase tracking-wide mb-2">
                    {article.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3 group-hover:text-[#2c3e50] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-[#4a4a4a] mb-4">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[#d35400] font-medium">
                    Read article
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
