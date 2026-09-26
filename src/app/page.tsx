"use client";

import { useState, FormEvent } from "react";

export default function ProcuracasaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name || name.length < 2) newErrors.name = "Please enter your name";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email required";
    if (!intent) newErrors.intent = "Please select an option";
    if (!message || message.length < 5) newErrors.message = "Tell us what you are looking for";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xeelaaew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, intent, message }),
      });
      if (response.ok) {
        alert("Thank you! We'll be in touch soon.");
        setName(""); setEmail(""); setIntent(""); setMessage("");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Procuracasa.pt" className="h-10 w-auto" />
              <span className="text-xl font-bold text-[#1F4E79]">Procuracasa.pt</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#buying" className="text-gray-600 hover:text-[#FF9500] transition-colors">Buying</a>
              <a href="#renting" className="text-gray-600 hover:text-[#FF9500] transition-colors">Renting</a>
              <a href="#properties" className="text-gray-600 hover:text-[#FF9500] transition-colors">Properties</a>
              <a href="#contact" className="bg-[#FF9500] hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                Contact Us
              </a>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#buying" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Buying</a>
              <a href="#renting" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Renting</a>
              <a href="#properties" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Properties</a>
              <a href="#contact" className="bg-[#FF9500] text-white text-center py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F4E79] leading-tight mb-6">
            Find your home in Porto.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Local, licensed real estate guidance for foreigners buying or renting in Porto and the Greater Porto area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#buying" className="bg-[#FF9500] hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-colors">
              Buying in Porto
            </a>
            <a href="#renting" className="bg-[#1F4E79] hover:bg-blue-800 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-colors">
              Renting in Porto
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-gray-600 leading-relaxed">
                We&apos;re a Porto-based consultancy operating in partnership with VC Real Estate Investments, a licensed real estate agency in the Greater Porto area. We help foreign buyers and renters navigate the Portuguese property process — from your first search to the signed contract — without the confusion of doing it alone from abroad.
            </p>
        </div>
      </section>

      {/* Buying Section */}
      <section id="buying" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-6 text-center">Thinking about buying in Porto?</h2>
                <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto text-center">
                    The process is different from what you&apos;re used to. We guide you through each step and help you find properties that match what you&apos;re actually looking for.
                </p>
                
                <div className="grid md:grid-cols-4 gap-8 mt-12">
                    {[
                        { num: 1, title: "NIF & Bank Account", desc: "We help you set up your Portuguese tax number and local bank account." },
                        { num: 2, title: "Property Search", desc: "We find on-market and off-market properties that match your criteria." },
                        { num: 3, title: "Promissory Contract", desc: "We negotiate and secure the deal with a CPCV and deposit." },
                        { num: 4, title: "Notary Deed", desc: "Final ownership transfer and keys handover at the notary." },
                    ].map((step) => (
                        <div key={step.num} className="text-center">
                            <div className="w-12 h-12 bg-[#FF9500] rounded-full flex items-center justify-center text-white font-bold shadow-lg mx-auto mb-4">{step.num}</div>
                            <h3 className="font-bold text-[#1F4E79] mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="#contact" className="inline-flex items-center gap-2 bg-[#FF9500] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                        Contact us to start buying
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* Renting Section */}
      <section id="renting" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-6 text-center">Looking to rent in Porto?</h2>
                <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto text-center">
                    Whether you&apos;re relocating, working remotely, or waiting on a visa, we help you find apartments and handle the paperwork landlords expect from foreign tenants.
                </p>
                
                <div className="grid md:grid-cols-4 gap-8 mt-12">
                    {[
                        { num: 1, title: "Define Needs", desc: "Budget, location, furnished vs. unfurnished, and timeline." },
                        { num: 2, title: "Property Viewings", desc: "We arrange tours in-person or via video call for remote clients." },
                        { num: 3, title: "Landlord Requirements", desc: "We help prepare your passport, visa, and proof of income." },
                        { num: 4, title: "Lease Signing", desc: "Sign the contract, pay the deposit and first rent, get keys." },
                    ].map((step) => (
                        <div key={step.num} className="text-center">
                            <div className="w-12 h-12 bg-[#1F4E79] rounded-full flex items-center justify-center text-white font-bold shadow-lg mx-auto mb-4">{step.num}</div>
                            <h3 className="font-bold text-[#1F4E79] mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="#contact" className="inline-flex items-center gap-2 bg-[#1F4E79] hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                        Contact us to start renting
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">Featured Properties</h2>
                <p className="text-gray-600">A selection of available homes in the Greater Porto area.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/property-1.jpg" alt="Property 1" className="w-full h-56 object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1F4E79] mb-1">T2 Apartment</h3>
                        <p className="text-gray-500 mb-4">Foz do Douro, Porto</p>
                        <p className="text-2xl font-bold text-[#FF9500]">€450,000</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/property-2.jpg" alt="Property 2" className="w-full h-56 object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1F4E79] mb-1">T3 House</h3>
                        <p className="text-gray-500 mb-4">Matosinhos</p>
                        <p className="text-lg font-bold text-green-600">€2,500/month</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/property-3.jpg" alt="Property 3" className="w-full h-56 object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1F4E79] mb-1">T1 Studio</h3>
                        <p className="text-gray-500 mb-4">Vila do Conde</p>
                        <p className="text-2xl font-bold text-[#FF9500]">€180,000</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 lg:py-24 bg-[#1F4E79]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get in touch</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Tell us what you&apos;re looking for, and we&apos;ll do the local legwork.
            </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input type="text" placeholder="Your full name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]" value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input type="email" placeholder="you@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">I am looking to...</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] bg-white" value={intent} onChange={(e) => setIntent(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="Buy">Buy a property</option>
                            <option value="Rent">Rent a property</option>
                        </select>
                        {errors.intent && <p className="text-red-500 text-sm mt-1">{errors.intent}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Message</label>
                        <textarea placeholder="Tell us your budget, preferred areas, and what you need..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] min-h-[120px]" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                        {isSubmitting ? "Sending..." : "Send Request"}
                        {!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                    </button>
                </form>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Procuracasa.pt" className="h-10 w-auto" />
                <span className="text-xl font-bold">Procuracasa.pt</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm mx-auto">
                Your trusted local guide to buying and renting in Porto.
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
                <a href="#buying" className="hover:text-[#FF9500]">Buying</a>
                <a href="#renting" className="hover:text-[#FF9500]">Renting</a>
                <a href="#contact" className="hover:text-[#FF9500]">Contact</a>
                <a href="/" className="hover:text-[#FF9500]">Português</a>
            </div>
            <p className="text-gray-600 text-sm mt-8">© {new Date().getFullYear()} Procuracasa.pt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
