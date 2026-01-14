import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fafafa] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Dual Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Image 1: Weathered building */}
          <div className="relative aspect-[16/10] bg-[#e0e0e0] rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-[#4a4a4a] text-sm">
              {/* Placeholder for weathered building image */}
              <div className="text-center p-4">
                <svg className="w-16 h-16 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="opacity-60">What happens when done wrong</span>
              </div>
            </div>
          </div>

          {/* Image 2: Modern infrastructure */}
          <div className="relative aspect-[16/10] bg-[#2c3e50] rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
              {/* Placeholder for modern building image */}
              <div className="text-center p-4">
                <svg className="w-16 h-16 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="opacity-60">What&apos;s possible when done right</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="mb-6">
            <span className="block font-serif text-3xl md:text-4xl text-[#4a4a4a] mb-2" style={{ fontFamily: 'var(--font-merriweather)' }}>
              In the seasons, most build to time-pass.
            </span>
            <span className="block font-serif text-4xl md:text-5xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-merriweather)' }}>
              We build to last.
            </span>
          </h1>

          <p className="text-[#4a4a4a] text-lg mb-8">
            Construction · Infratech · Engineering Consultancy
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#d35400] hover:bg-[#e67e22] text-white px-8 py-3 rounded font-medium transition-colors text-center"
            >
              Request Quote
            </Link>
            <a
              href="https://wa.me/918618112720?text=Hi%2C%20I%27m%20interested%20in%20your%20construction%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#2c3e50] text-[#2c3e50] hover:bg-[#2c3e50] hover:text-white px-8 py-3 rounded font-medium transition-colors text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
