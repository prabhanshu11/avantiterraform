import Link from "next/link";

const services = [
  {
    title: "Construction",
    description: "Commercial & residential execution",
    href: "/services#construction",
  },
  {
    title: "Infratech",
    description: "Drainage, foundations, water management",
    href: "/services#infratech",
  },
  {
    title: "Consultancy",
    description: "Structural assessment, project management",
    href: "/services#consultancy",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group p-8 bg-[#fafafa] rounded-lg border border-[#e0e0e0] hover:border-[#d35400] transition-colors"
            >
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="text-[#4a4a4a] mb-4">{service.description}</p>
              <span className="inline-flex items-center text-[#d35400] font-medium group-hover:translate-x-1 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
