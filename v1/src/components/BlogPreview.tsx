import Link from "next/link";

const articles = [
  {
    title: "Waterproofing: Why Products Fail",
    slug: "waterproofing-skills-not-just-products",
    category: "Technical",
  },
  {
    title: "Engineering on Slopes: Calculator + Guide",
    slug: "slope-construction-engineering-calculator",
    category: "Guides",
  },
  {
    title: "CRZ Compliance: Business Owner Guide",
    slug: "crz-compliance-business-owner-guide",
    category: "Regulatory",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-8">From the field</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block p-6 bg-[#fafafa] rounded-lg border border-[#e0e0e0] hover:border-[#d35400] transition-colors"
            >
              <span className="text-xs font-medium text-[#d35400] uppercase tracking-wide">
                {article.category}
              </span>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mt-2 group-hover:text-[#2c3e50] transition-colors">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#2c3e50] font-medium hover:text-[#d35400] transition-colors"
          >
            View all insights
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
