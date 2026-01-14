const offers = [
  {
    context: "For investors building from abroad",
    title: "Owner's Representative Services",
    description: "Single point of accountability. Monthly reporting. We handle contractors so you don't have to.",
  },
  {
    context: "For buyers evaluating property",
    title: "Structural Assessment & Due Diligence",
    description: "Condition reports, repair estimates, regulatory status. Know what you're buying before you sign.",
  },
  {
    context: "For projects already underway",
    title: "Third-Party Quality Inspection",
    description: "Independent verification at critical milestones. Documentation that protects your interests.",
  },
  {
    context: "For coastal/complex sites",
    title: "Pre-Construction Consulting",
    description: "CRZ compliance, feasibility studies, cost estimation. Regulatory navigation before you commit.",
  },
];

export default function WhatWeOffer() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="p-8 bg-white rounded-lg border-l-4 border-[#2c3e50]"
            >
              <p className="text-sm text-[#d35400] font-medium mb-2">
                {offer.context}
              </p>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">
                {offer.title}
              </h3>
              <p className="text-[#4a4a4a]">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
