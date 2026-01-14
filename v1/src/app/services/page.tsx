import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

const services = [
  {
    id: "construction",
    title: "Construction Execution",
    items: [
      {
        name: "Commercial Buildings",
        description: "Office complexes, retail spaces, and mixed-use developments built to specification.",
        trigger: "When you need a contractor who understands commercial code requirements and timelines.",
        deliverables: ["Detailed project schedule", "Weekly progress reports", "Quality documentation"],
      },
      {
        name: "Residential Projects",
        description: "Custom homes and multi-family housing with attention to finish quality.",
        trigger: "When you want a home built to last, not to flip.",
        deliverables: ["Material specifications", "Construction timeline", "Warranty documentation"],
      },
      {
        name: "Renovation & Structural Repair",
        description: "Restoration of deteriorating structures, reinforcement, and adaptive reuse.",
        trigger: "When an existing building shows signs of distress or needs modernization.",
        deliverables: ["Condition assessment", "Repair methodology", "Post-repair certification"],
      },
      {
        name: "Waterproofing Systems",
        description: "Crystalline, cementitious, and drainage-based solutions for below-grade and wet areas.",
        trigger: "When water ingress threatens structural integrity or habitability.",
        deliverables: ["System selection rationale", "Application documentation", "Warranty coverage"],
      },
    ],
  },
  {
    id: "infratech",
    title: "Infratech Solutions",
    items: [
      {
        name: "Foundation Systems",
        description: "Pile foundations, mat foundations, and specialized systems for difficult terrain.",
        trigger: "When soil conditions or topography require more than standard strip footings.",
        deliverables: ["Geotechnical coordination", "Foundation design", "Load test documentation"],
      },
      {
        name: "Drainage & Water Management",
        description: "Surface drainage, subsurface systems, and stormwater management.",
        trigger: "When water pooling or soil saturation affects site usability.",
        deliverables: ["Drainage design", "Material specifications", "Maintenance guidelines"],
      },
      {
        name: "Retaining Structures",
        description: "Gravity walls, cantilever walls, and mechanically stabilized earth systems.",
        trigger: "When grade changes require structural support.",
        deliverables: ["Structural calculations", "Construction drawings", "Inspection documentation"],
      },
      {
        name: "Corrosion-Resistant Infrastructure",
        description: "Specialized coatings, cathodic protection, and material selection for coastal environments.",
        trigger: "When proximity to saltwater accelerates material degradation.",
        deliverables: ["Corrosion assessment", "Protection strategy", "Maintenance schedule"],
      },
    ],
  },
  {
    id: "consultancy",
    title: "Engineering Consultancy",
    items: [
      {
        name: "Structural Assessment",
        description: "Evaluation of existing buildings for condition, capacity, and remaining service life.",
        trigger: "When buying property, noticing cracks, or planning renovations.",
        deliverables: ["Condition report", "Repair recommendations", "Cost estimates"],
      },
      {
        name: "Pre-Construction Feasibility",
        description: "Site evaluation, regulatory research, and preliminary cost analysis.",
        trigger: "When evaluating whether a project is viable before committing.",
        deliverables: ["Feasibility report", "Regulatory checklist", "Preliminary budget"],
      },
      {
        name: "CRZ Compliance Consulting",
        description: "Coastal regulation navigation, clearance applications, and compliance documentation.",
        trigger: "When building within 500m of the coast or near mangroves.",
        deliverables: ["CRZ classification", "Clearance roadmap", "Application support"],
      },
      {
        name: "Owner's Representation",
        description: "Single point of accountability for project oversight and contractor management.",
        trigger: "When you can't be present daily or need professional oversight.",
        deliverables: ["Monthly reports", "Quality verification", "Schedule tracking"],
      },
    ],
  },
  {
    id: "supply",
    title: "Supply & Procurement",
    items: [
      {
        name: "Material Specification",
        description: "Selection of appropriate materials for durability, performance, and budget.",
        trigger: "When you need guidance on what materials will perform best for your conditions.",
        deliverables: ["Specification documents", "Supplier recommendations", "Quality benchmarks"],
      },
      {
        name: "Vendor Vetting",
        description: "Supplier evaluation, quality verification, and reliability assessment.",
        trigger: "When you need assurance that suppliers can deliver to specification.",
        deliverables: ["Vendor assessment", "Reference verification", "Contract recommendations"],
      },
      {
        name: "Procurement Management",
        description: "Coordinated purchasing, delivery scheduling, and inventory management.",
        trigger: "When multiple materials need to arrive in sequence without delays.",
        deliverables: ["Procurement schedule", "Delivery coordination", "Cost tracking"],
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-[#2c3e50] text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Services</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Comprehensive solutions across the construction and infrastructure lifecycle.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <section className="sticky top-16 bg-white border-b z-40">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex gap-8 overflow-x-auto py-4">
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="text-[#4a4a4a] hover:text-[#d35400] font-medium whitespace-nowrap transition-colors"
                >
                  {service.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Service Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-16 ${index % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}
          >
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">{service.title}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {service.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white p-6 rounded-lg border border-[#e0e0e0] hover:border-[#d35400] transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{item.name}</h3>
                    <p className="text-[#4a4a4a] mb-4">{item.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-[#d35400] mb-1">When you need this:</p>
                      <p className="text-sm text-[#4a4a4a]">{item.trigger}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2c3e50] mb-1">What we deliver:</p>
                      <ul className="text-sm text-[#4a4a4a] space-y-1">
                        {item.deliverables.map((d) => (
                          <li key={d} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#d35400] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-16 bg-[#d35400] text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to discuss your project?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Get a detailed quote tailored to your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#d35400] px-8 py-3 rounded font-semibold hover:bg-[#fafafa] transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
