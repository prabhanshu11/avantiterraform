"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";

type FormData = {
  serviceType: string;
  description: string;
  location: string;
  timeline: string;
  source: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  contactMethod: string;
  wantsWaterproofingGuide: boolean;
  wantsSlopeGuide: boolean;
};

const initialFormData: FormData = {
  serviceType: "",
  description: "",
  location: "",
  timeline: "",
  source: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  contactMethod: "email",
  wantsWaterproofingGuide: false,
  wantsSlopeGuide: false,
};

const serviceTypes = [
  "Construction Execution",
  "Structural Assessment / Due Diligence",
  "Owner's Representative Services",
  "Quality Inspection",
  "CRZ / Regulatory Consulting",
  "Other",
];

const timelines = [
  { value: "immediate", label: "Immediate (1-3 months)" },
  { value: "near-term", label: "Near-term (3-6 months)" },
  { value: "planning", label: "Planning stage (6+ months)" },
];

const sources = ["Search", "Referral", "Blog article", "Other"];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-[#fafafa]">
          <div className="max-w-xl mx-auto px-4 py-20">
            <div className="bg-white p-8 rounded-lg border border-[#e0e0e0] text-center">
              <svg className="w-16 h-16 text-[#d35400] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Request received.</h1>
              <p className="text-[#4a4a4a] mb-6">We&apos;ll respond within 24 hours.</p>
              <p className="text-sm text-[#4a4a4a]">
                If urgent, WhatsApp us directly:{" "}
                <a href="https://wa.me/918105294167" className="text-[#d35400] font-medium">
                  +91 81052 94167
                </a>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#fafafa]">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Progress */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                    s === step
                      ? "bg-[#d35400] text-white"
                      : s < step
                      ? "bg-[#2c3e50] text-white"
                      : "bg-[#e0e0e0] text-[#4a4a4a]"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 ${s < step ? "bg-[#2c3e50]" : "bg-[#e0e0e0]"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#e0e0e0]">
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a1a] mb-6">What do you need?</h1>
                <div className="space-y-4 mb-6">
                  {serviceTypes.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        formData.serviceType === type
                          ? "border-[#d35400] bg-[#d35400]/5"
                          : "border-[#e0e0e0] hover:border-[#4a4a4a]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={type}
                        checked={formData.serviceType === type}
                        onChange={(e) => updateField("serviceType", e.target.value)}
                        className="w-4 h-4 text-[#d35400]"
                      />
                      <span className="text-[#1a1a1a]">{type}</span>
                    </label>
                  ))}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Brief description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Tell us about your project or requirements..."
                    className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#d35400] focus:outline-none"
                    rows={3}
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.serviceType}
                  className="w-full bg-[#d35400] hover:bg-[#e67e22] disabled:bg-[#e0e0e0] text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a1a] mb-6">Project details</h1>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Project location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Area/locality is fine"
                    className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#d35400] focus:outline-none"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Timeline
                  </label>
                  <div className="space-y-2">
                    {timelines.map((t) => (
                      <label
                        key={t.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.timeline === t.value
                            ? "border-[#d35400] bg-[#d35400]/5"
                            : "border-[#e0e0e0] hover:border-[#4a4a4a]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={t.value}
                          checked={formData.timeline === t.value}
                          onChange={(e) => updateField("timeline", e.target.value)}
                          className="w-4 h-4 text-[#d35400]"
                        />
                        <span className="text-[#1a1a1a]">{t.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    How did you hear about us?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateField("source", s)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          formData.source === s
                            ? "bg-[#d35400] text-white"
                            : "bg-[#e0e0e0] text-[#4a4a4a] hover:bg-[#d0d0d0]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-[#e0e0e0] text-[#4a4a4a] py-3 rounded-lg font-medium hover:bg-[#fafafa] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#d35400] hover:bg-[#e67e22] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a1a] mb-6">Contact information</h1>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#d35400] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#d35400] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                      className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#d35400] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#d35400] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Preferred contact method
                  </label>
                  <div className="flex gap-4">
                    {["email", "phone", "whatsapp"].map((m) => (
                      <label
                        key={m}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={m}
                          checked={formData.contactMethod === m}
                          onChange={(e) => updateField("contactMethod", e.target.value)}
                          className="w-4 h-4 text-[#d35400]"
                        />
                        <span className="text-[#1a1a1a] capitalize">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-6 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.wantsWaterproofingGuide}
                      onChange={(e) => updateField("wantsWaterproofingGuide", e.target.checked)}
                      className="w-4 h-4 text-[#d35400]"
                    />
                    <span className="text-sm text-[#4a4a4a]">
                      Send me the Waterproofing Specification Guide
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.wantsSlopeGuide}
                      onChange={(e) => updateField("wantsSlopeGuide", e.target.checked)}
                      className="w-4 h-4 text-[#d35400]"
                    />
                    <span className="text-sm text-[#4a4a4a]">
                      Send me the Slope Construction Guide
                    </span>
                  </label>
                </div>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-[#e0e0e0] text-[#4a4a4a] py-3 rounded-lg font-medium hover:bg-[#fafafa] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email || submitting}
                    className="flex-1 bg-[#d35400] hover:bg-[#e67e22] disabled:bg-[#e0e0e0] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
