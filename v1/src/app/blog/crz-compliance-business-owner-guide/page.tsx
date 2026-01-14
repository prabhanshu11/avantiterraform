import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata = {
  title: "CRZ Compliance: What Every Business Owner Needs to Know Before Buying Coastal Property | Avanti Terraform",
  description: "The Maradu apartments demolition wasn't an anomaly. ₹5 lakh/day NGT fines until compliance. Criminal charges under IPC 406 and 420.",
};

export default function CRZComplianceArticle() {
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
              Regulatory
            </span>
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              CRZ Compliance: What Every Business Owner Needs to Know Before Buying Coastal Property
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <p className="text-red-800 text-lg leading-relaxed m-0">
                <strong>The Maradu apartments demolition wasn&apos;t an anomaly.</strong> ₹5 lakh/day NGT fines until compliance. Criminal charges under IPC 406 and 420. These aren&apos;t hypotheticals — they&apos;re enforcement actions that have happened.
              </p>
            </div>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              The Coastal Regulation Zone framework governs all construction within 500 meters of the High Tide Line. Understanding it before purchase can save you from buying an asset that becomes a liability.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">The Zone System Explained</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-[#2c3e50] text-white">
                    <th className="border border-[#e0e0e0] p-3 text-left">Zone</th>
                    <th className="border border-[#e0e0e0] p-3 text-left">What It Is</th>
                    <th className="border border-[#e0e0e0] p-3 text-left">What&apos;s Allowed</th>
                  </tr>
                </thead>
                <tbody className="text-[#4a4a4a]">
                  <tr>
                    <td className="border border-[#e0e0e0] p-3 font-semibold">CRZ-I</td>
                    <td className="border border-[#e0e0e0] p-3">Mangroves, coral, turtle nesting</td>
                    <td className="border border-[#e0e0e0] p-3">Almost nothing</td>
                  </tr>
                  <tr className="bg-[#fafafa]">
                    <td className="border border-[#e0e0e0] p-3 font-semibold">CRZ-II</td>
                    <td className="border border-[#e0e0e0] p-3">Developed urban areas</td>
                    <td className="border border-[#e0e0e0] p-3">Buildings per existing FSI</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e0e0e0] p-3 font-semibold">CRZ-IIIA</td>
                    <td className="border border-[#e0e0e0] p-3">Rural, dense population</td>
                    <td className="border border-[#e0e0e0] p-3">50m NDZ from HTL</td>
                  </tr>
                  <tr className="bg-[#fafafa]">
                    <td className="border border-[#e0e0e0] p-3 font-semibold">CRZ-IIIB</td>
                    <td className="border border-[#e0e0e0] p-3">Rural, sparse population</td>
                    <td className="border border-[#e0e0e0] p-3">200m NDZ from HTL</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e0e0e0] p-3 font-semibold">CRZ-IV</td>
                    <td className="border border-[#e0e0e0] p-3">Water areas</td>
                    <td className="border border-[#e0e0e0] p-3">Traditional fishing, ports</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              <strong>NDZ = No Development Zone.</strong> Within this distance from the High Tide Line, no new construction is permitted.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">The Goa Complication</h2>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-6">
              <p className="text-amber-800 mb-4">
                <strong>⚠️ Critical:</strong> Goa&apos;s CZMP 2019 is still unapproved. The state operates under 2011 rules.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-amber-800">
                <li><strong>200m NDZ applies</strong> where 50m would under 2019 rules</li>
                <li>Mapping at wrong scale (1:25,000 vs needed 1:4,000)</li>
                <li><strong>Don&apos;t rely on draft provisions</strong></li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">Khazan Lands: The Hidden Risk</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Goa has 18,951 hectares of estuarine floodplain — khazan lands. These were traditionally managed for rice cultivation and aquaculture, but abandonment has allowed mangroves to encroach.
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li>May 2020 amendment classified these as <strong>CRZ-IA</strong> (most restrictive)</li>
              <li>Ongoing PIL challenging the classification</li>
              <li>Pre-September 2022 structures with valid permissions are protected</li>
              <li><strong>New construction is extremely difficult to permit</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">The Clearance Process</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Who grants CRZ clearance depends on the zone and project size:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li><strong>CRZ-II projects &lt; 20,000 sq.m:</strong> State Coastal Zone Management Authority (SCZMA)</li>
              <li><strong>CRZ-II projects &gt; 20,000 sq.m:</strong> MoEFCC</li>
              <li><strong>CRZ-III projects:</strong> Generally SCZMA, with MoEFCC for larger projects</li>
              <li><strong>CRZ-I:</strong> MoEFCC required (and rarely granted)</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Required Documents</h3>

            <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li>CRZ map from authorized agency</li>
              <li>Property ownership documents</li>
              <li>Site plan with HTL/LTL marked</li>
              <li>Building plan</li>
              <li>Environmental Impact Assessment (for larger projects)</li>
              <li>NOC from local panchayat/municipality</li>
            </ol>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              <strong>Realistic timeline:</strong> 6-12 months for complex projects. CRZ clearance is valid for 7 years, extendable by 3 years.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">Red Flags When Buying</h2>

            <div className="bg-red-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-red-800 mb-3">Walk away or investigate deeply if you see:</p>
              <ul className="list-disc pl-6 space-y-2 text-red-800">
                <li>No clear CRZ classification documentation</li>
                <li>Property within 500m of sea without CRZ clearance</li>
                <li>Recent construction without CZMA stamp on approvals</li>
                <li>Property near mangroves (even small patches)</li>
                <li>Khazan land with unclear tenure history</li>
                <li>Active NGT or court cases involving the property or area</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">What International Frameworks Do Better</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Looking at how other countries handle coastal regulation reveals opportunities for improvement:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li><strong>Mediterranean Protocol:</strong> 100m setback but with clear exception criteria and defined permit paths</li>
              <li><strong>US CZMA:</strong> State flexibility within federal guidelines, promotes &quot;living shorelines&quot; over hard structures</li>
              <li><strong>Digital tools:</strong> National Zoning Atlas enables parcel-level lookup — no ambiguity about classification</li>
            </ul>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              What India could adopt: risk-based setbacks, online self-screening tools, and tiered permitting based on environmental sensitivity.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">How to Verify Before Buying</h2>

            <ol className="list-decimal pl-6 mb-6 space-y-3 text-[#4a4a4a]">
              <li>
                <strong>Check official CZMP maps</strong>
                <br />
                <span className="text-sm">Available at: goa.gov.in (GCZMA section)</span>
              </li>
              <li>
                <strong>Commission a CRZ map</strong>
                <br />
                <span className="text-sm">From an authorized agency showing your property&apos;s position relative to HTL</span>
              </li>
              <li>
                <strong>Submit formal query to GCZMA</strong>
                <br />
                <span className="text-sm">Get written confirmation of classification and permit requirements</span>
              </li>
              <li>
                <strong>Verify historical status</strong>
                <br />
                <span className="text-sm">Pre-1991 structures have different rules than post-1991 construction</span>
              </li>
            </ol>

            {/* Lead Magnet CTA */}
            <div className="bg-[#2c3e50] text-white p-8 rounded-lg mt-12">
              <h3 className="text-xl font-bold mb-3">Need help navigating CRZ?</h3>
              <p className="text-white/80 mb-6">
                We offer pre-purchase CRZ assessment including zone classification verification, document review, and clearance feasibility analysis.
              </p>
              <Link
                href="/contact?service=crz"
                className="inline-block bg-[#d35400] hover:bg-[#e67e22] text-white px-6 py-3 rounded font-medium transition-colors"
              >
                Request CRZ Assessment
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
