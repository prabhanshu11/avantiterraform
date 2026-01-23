import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/80">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              AVANTI<span className="text-[#d35400]">TERRAFORM</span>
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Construction · Infratech · Engineering Consultancy
            </p>
            <div className="text-xs text-white/40 space-y-1">
              <p>GSTIN: 30ACMFA4980F1ZI</p>
              <p>Firm Reg: MOR-F34-2025</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/services" className="block text-sm hover:text-[#d35400] transition-colors">
                Services
              </Link>
              <Link href="/blog" className="block text-sm hover:text-[#d35400] transition-colors">
                Insights
              </Link>
              <Link href="/contact" className="block text-sm hover:text-[#d35400] transition-colors">
                Get Quote
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>Sancoale, South Goa</p>
              <a href="tel:+918105294167" className="block hover:text-[#d35400] transition-colors">
                +91 81052 94167
              </a>
              <a href="tel:+918660681084" className="block hover:text-[#d35400] transition-colors">
                +91 86606 81084
              </a>
              <a href="mailto:contact@avantiterraform.com" className="block hover:text-[#d35400] transition-colors">
                contact@avantiterraform.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Avanti Terraform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
