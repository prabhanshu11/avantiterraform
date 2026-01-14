import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SlopeCalculator from "@/components/SlopeCalculator";
import Link from "next/link";

export const metadata = {
  title: "Engineering on Slopes: The Calculations That Make Buildings Stand | Avanti Terraform",
  description: "Every hillside building defies gravity through careful calculation. Most residential projects underutilize techniques that are standard in civil engineering.",
};

export default function SlopeConstructionArticle() {
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
              Guides
            </span>
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Engineering on Slopes: The Calculations That Make Buildings Stand
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#d35400] mb-8">
              <p className="text-[#1a1a1a] text-lg leading-relaxed m-0">
                Every hillside building defies gravity through careful calculation. Most residential projects underutilize techniques that are standard in civil engineering.
              </p>
            </div>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              Building on a slope isn&apos;t inherently risky — it&apos;s building without understanding the forces involved that creates problems. The same engineering that allows high-rise buildings and bridges can be applied to residential slope construction.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">The Overturning Problem</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Retaining walls fail when the overturning moment exceeds the resisting moment. The earth behind the wall pushes horizontally, creating a rotational force around the wall&apos;s toe.
            </p>

            <div className="bg-[#fafafa] p-6 rounded-lg mb-6 font-mono text-sm">
              <p className="mb-2"><strong>Resisting Moment:</strong> M<sub>r</sub> = W × d</p>
              <p className="mb-2"><strong>Overturning Moment:</strong> M<sub>o</sub> = P<sub>a</sub> × h/3</p>
              <p><strong>Factor of Safety:</strong> FOS = M<sub>r</sub> / M<sub>o</sub> ≥ 2.0</p>
            </div>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              Where W is the wall weight, d is the distance from the wall centerline to the toe, P<sub>a</sub> is the active earth pressure resultant, and h is the wall height.
            </p>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">When Cantilevers Reach Their Limits</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Cantilever retaining walls become impractical beyond 15-20 feet. At these heights:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li>Wall thickness becomes excessive (increasing material costs exponentially)</li>
              <li>Foundation size grows disproportionately</li>
              <li>Construction becomes more complex and risky</li>
            </ul>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              <strong>Ground anchors</strong> transfer lateral loads deep into stable soil or rock, allowing thinner walls at greater heights. Typical tieback spacing:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li>Vertical: 7-13 feet</li>
              <li>Horizontal: 5-15 feet</li>
              <li>Anchor lengths: 20-50 feet depending on soil conditions</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">The Underutilized Solutions</h2>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Micropiles</h3>
            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Small-diameter (3-12 inch) drilled piles that can support 25-500+ kip loads. Advantages include minimal equipment footprint, low vibration, and ability to work in restricted access sites.
            </p>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Helical Piles</h3>
            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Screw-in foundations with immediate load capacity. The installation torque directly correlates to bearing capacity, providing real-time verification.
            </p>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Soil Nailing</h3>
            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Passive reinforcement that creates a reinforced soil mass. Typical spacing of 3-6 feet creates an in-situ retaining structure without the bulk of a concrete wall.
            </p>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              <strong>Why aren&apos;t these used more in residential construction?</strong> Awareness, not capability. These techniques are standard in commercial and infrastructure projects but rarely offered to residential clients.
            </p>

            {/* Calculator */}
            <div className="my-10">
              <SlopeCalculator />
            </div>

            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-10 mb-4">Fallingwater: The Cautionary Tale</h2>

            <p className="text-[#4a4a4a] leading-relaxed mb-4">
              Frank Lloyd Wright&apos;s masterpiece demonstrates what happens when engineering takes a back seat to architecture. Problems appeared immediately:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4a4a4a]">
              <li>Cracking appeared <strong>upon formwork removal</strong> in 1937</li>
              <li>7 inches of deflection accumulated over decades</li>
              <li>2002 remediation required external post-tensioning and carbon fiber reinforcement</li>
            </ul>

            <p className="text-[#4a4a4a] leading-relaxed mb-6">
              The lesson: concrete creep and long-term deflection demand conservative safety factors. Bold cantilevers need bold engineering, not just bold design.
            </p>

            {/* Lead Magnet CTA */}
            <div className="bg-[#2c3e50] text-white p-8 rounded-lg mt-12">
              <h3 className="text-xl font-bold mb-3">Building on a slope?</h3>
              <p className="text-white/80 mb-6">
                Get our walkthrough guide on slope construction feasibility assessment — including the full calculation methodology and what to ask your geotechnical engineer.
              </p>
              <Link
                href="/contact?guide=slope"
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
