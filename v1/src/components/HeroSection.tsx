import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fafafa] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Dual Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Image 1: Weathered building - what happens when done wrong */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden group">
            <Image
              src="/hero-deteriorated.jpg"
              alt="Weathered concrete building showing deterioration - what happens when done wrong"
              fill
              className="object-cover grayscale-[30%] contrast-[90%] brightness-[95%] group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-white/90 text-sm font-medium">
                What happens when done wrong
              </span>
            </div>
          </div>

          {/* Image 2: Modern infrastructure - what's possible */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden group">
            <Image
              src="/hero-modern.jpg"
              alt="Modern well-constructed building - what's possible when done right"
              fill
              className="object-cover grayscale-[30%] contrast-[90%] brightness-[95%] group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-white/90 text-sm font-medium">
                What&apos;s possible when done right
              </span>
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
