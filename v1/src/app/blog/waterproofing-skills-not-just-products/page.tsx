import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata = {
  title: "Why Your Waterproofing Failed: The Skills Behind Every System | Avanti Terraform",
  description: "The same crystalline coating rated for 460 feet of hydrostatic pressure becomes worthless on unsaturated concrete. Most failures are application failures, not product failures.",
};

export default function WaterproofingArticle() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#fafafa]">
        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/blog" className="text-[#d35400] text-sm font-medium hover:underline mb-4 inline-block">
              ← Back to Insights
            </Link>
            <span className="block text-xs font-medium text-[#d35400] uppercase tracking-wide mb-2">
              Technical
            </span>
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Why Your Waterproofing Failed: The Skills Behind Every System
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#d35400] mb-8">
              <p className="text-[#1a1a1a] text-lg leading-relaxed m-0">
                The same crystalline coating rated for 460 feet of hydrostatic pressure becomes worthless on unsaturated concrete. Most failures are application failures, not product failures.
              </p>
            </div>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              Walk through any construction site dealing with water ingress, and you&apos;ll hear the same story: &quot;We used the best products.&quot; They probably did. The products weren&apos;t the problem.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">Crystalline Waterproofing</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Crystalline systems work through chemistry. Active chemicals react with moisture and unhydrated cement particles to form insoluble crystals within the concrete pores. When done right, these crystals can seal cracks up to 0.5mm and provide a permanent waterproof barrier.
            </p>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">The Saturation Requirement</h3>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Here&apos;s what most applicators miss: crystalline systems require Saturated Surface Dry (SSD) condition. This means:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li><strong>Minimum 2 hours pre-soak</strong> before application</li>
              <li>Surface should be damp but not have standing water</li>
              <li>Multiple saturation cycles may be needed in dry conditions</li>
              <li>Application during midday heat almost guarantees failure</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Why It Fails</h3>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li><strong>Insufficient saturation</strong> — the most common cause</li>
              <li>Surface contaminants (oils, curing compounds, form release agents)</li>
              <li>Premature coating before crystals form</li>
              <li>Incompatible repair mortars in the substrate</li>
            </ul>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              <strong>Products in this category:</strong> Xypex, Penetron, Krystol, Cementaid, BASF MasterSeal.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">Bentonite Clay Systems</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Bentonite swells 15-20 times its dry volume when hydrated. This expansion creates a self-sealing barrier that can heal minor punctures. But it needs constant confining pressure (30-60 PSF) to work.
            </p>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Critical Installation Details</h3>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li>Minimum 6-inch overlap at all seams</li>
              <li>Maximum 3:1 slope (steeper surfaces need mechanical fastening)</li>
              <li>Termination bars at all edges and penetrations</li>
              <li>Protection board required before backfill</li>
            </ul>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              Bentonite excels in blindside applications where you can&apos;t access the exterior after construction. But it fails completely if the confining pressure isn&apos;t maintained or if it&apos;s installed on steep slopes without proper anchoring.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">Polyurea Coatings</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Polyurea represents the extreme end of waterproofing technology. The equipment alone costs ₹15-20 lakhs. Material must be heated to 135-160°F and applied at 2000+ PSI. Gel time is 10-30 seconds — zero room for error.
            </p>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Why DIY Always Fails</h3>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              90% of polyurea failures trace to surface preparation:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li>Concrete must be cured minimum 28 days</li>
              <li>Moisture content below 4%</li>
              <li>Surface profile equivalent to CSP 3-5</li>
              <li>Primer application within specific temperature window</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">Hot-Applied Rubberized Asphalt</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              The temperature window is critical: 380-400°F exactly. Too cool and it won&apos;t flow properly. Too hot and you damage the polymers.
            </p>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Standard application is 90 mils base + reinforcement fabric + 125 mils top coat. This provides excellent crack-bridging capability (up to 1/8&quot;) and can handle structural movement.
            </p>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              For appropriate projects, hot-applied systems can deliver 60% labor savings compared to sheet goods. But the specialized equipment and temperature control requirements mean only experienced crews should attempt it.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">The Common Thread: Why Waterproofing Fails</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Across all system types, failures cluster around the same issues:
            </p>

            <ol className="list-decimal pl-6 mb-6 space-y-3 text-[#4a4a4a]">
              <li>
                <strong>Substrate preparation</strong> — The majority of failures start here. Dirty, dusty, oily, or improperly cured concrete defeats any system.
              </li>
              <li>
                <strong>Joint and penetration treatment</strong> — Water finds the path of least resistance. Every pipe, conduit, and construction joint needs specific detailing.
              </li>
              <li>
                <strong>Insufficient thickness</strong> — &quot;A little extra never hurts&quot; doesn&apos;t apply to coatings. Too thick causes curing problems. Too thin provides no protection.
              </li>
              <li>
                <strong>Inadequate curing</strong> — Most systems need protection from traffic, UV, and weather for specific periods. Rushing this stage creates latent failures.
              </li>
              <li>
                <strong>Trade coordination damage</strong> — Waterproofing applied on schedule, then punctured by subsequent trades. Protection and coordination are part of the system.
              </li>
            </ol>

            {/* Lead Magnet CTA */}
            <div className="bg-[#2c3e50] text-white p-8 rounded-lg mt-12">
              <h3 className="text-xl font-bold mb-3">Want the complete specification?</h3>
              <p className="text-white/80 mb-6">
                Our 10-page Waterproofing Specification Guide covers thickness requirements, cure times, temperature windows, surface profiles, and testing protocols for every major system type.
              </p>
              <Link
                href="/contact?guide=waterproofing"
                className="inline-block bg-[#d35400] hover:bg-[#e67e22] text-white px-6 py-3 rounded font-medium transition-colors"
              >
                Request the Guide
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
