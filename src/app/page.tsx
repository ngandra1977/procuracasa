"use client";

import { useState, useEffect } from "react";

export default function ProcuracasaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadCount, setLeadCount] = useState(47);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeadCount(data.count || 47))
      .catch(() => setLeadCount(47));
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name || name.length < 2) newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email inválido";
    if (!location || location.length < 2) newErrors.location = "Indique a localização pretendida";
    if (!propertyType) newErrors.propertyType = "Selecione o tipo de imóvel";
    if (!message || message.length < 5) newErrors.message = "Descreva o que procura";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xeelaaew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, location, phone, propertyType, message }),
      });
      if (response.ok) {
        alert("Recebemos o seu pedido. Entraremos em contacto em breve!");
        setName(""); setEmail(""); setLocation(""); setPhone(""); setPropertyType(""); setMessage("");
        setLeadCount((prev) => prev + 1);
      } else {
        alert("Ocorreu um erro. Tente novamente.");
      }
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Procuracasa.pt" className="h-10 w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="text-gray-600 hover:text-[#FF9500]">Como Funciona</a>
              <a href="#beneficios" className="text-gray-600 hover:text-[#FF9500]">Benefícios</a>
              <a href="#sobre" className="text-gray-600 hover:text-[#FF9500]">Sobre Nós</a>
              <a href="#formulario" className="bg-[#FF9500] hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg">Começar</a>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#como-funciona" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Como Funciona</a>
              <a href="#beneficios" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
              <a href="#sobre" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</a>
              <a href="#formulario" className="bg-[#FF9500] text-white text-center py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Começar</a>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                Serviço Gratuito
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F4E79] leading-tight mb-6">
                Encontre a Sua Casa Ideal <span className="text-[#FF9500]">Sem Perder Tempo</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Diz-nos o que procura. Nós encontramos por si. <span className="font-semibold text-[#1F4E79]">Sem spam, sem pressão.</span>
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-600"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>100% Gratuito</span></div>
                <div className="flex items-center gap-2 text-gray-600"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Sem Compromisso</span></div>
                <div className="flex items-center gap-2 text-gray-600"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span>Resposta em 24h</span></div>
              </div>
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                <svg className="w-5 h-5 text-[#FF9500]" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                <span className="text-gray-700"><span className="font-bold text-[#1F4E79]">{leadCount}</span> famílias já ajudadas</span>
              </div>
            </div>

            <div id="formulario" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF9500] to-orange-500 p-4 text-center">
                  <h2 className="text-xl font-bold text-white">Comece a Sua Procura</h2>
                  <p className="text-white/90 text-sm">Preencha em 1 minuto</p>
                </div>
                <div className="p-6">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Nome <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="O seu nome" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500]" value={name} onChange={(e) => setName(e.target.value)} />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                      <input type="email" placeholder="o.seu@email.pt" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500]" value={email} onChange={(e) => setEmail(e.target.value)} />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Localização Pretendida <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Ex: Lisboa, Porto, Algarve..." className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500]" value={location} onChange={(e) => setLocation(e.target.value)} />
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Tipo de Imóvel <span className="text-red-500">*</span></label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] bg-white" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                        <option value="">Selecione o tipo</option>
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4+">T4+</option>
                        <option value="Moradia">Moradia</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Comercial">Comercial</option>
                      </select>
                      {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Telefone <span className="text-gray-400 text-sm font-normal">(opcional)</span></label>
                      <input type="tel" placeholder="O seu telefone" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500]" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">O que procura? <span className="text-red-500">*</span></label>
                      <textarea placeholder="Descreva orçamento, preferências..." className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] min-h-[100px]" value={message} onChange={(e) => setMessage(e.target.value)} />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-3 text-lg rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                      {isSubmitting ? "A enviar..." : <>Começar a Procura Grátis<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>}
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 text-center mt-4">Ao submeter, concorda com a nossa <a href="/privacidade" className="text-[#FF9500]">política de privacidade</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">Processo Simples</span>
            <h2 className="text-3xl font-bold text-[#1F4E79] mb-4">Como Funciona</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{n:1,t:"Conte-nos o que procura",d:"Preencha o formulário em 1 minuto."},{n:2,t:"Nós pesquisamos por si",d:"Procuramos imóveis exclusivos."},{n:3,t:"Receba opções",d:"Apresentamos as melhores oportunidades."}].map(s=>(
              <div key={s.n} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FF9500] rounded-full flex items-center justify-center text-white font-bold">{s.n}</div>
                  <h3 className="text-xl font-bold text-[#1F4E79] mb-3 mt-4">{s.t}</h3>
                  <p className="text-gray-600">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <span className="inline-flex bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mb-4">PDF Gratuito</span>
                <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Guia para Comprar Casa em Portugal 2025</h2>
                <ul className="space-y-2">
                  {["Passo-a-passo do processo","Custos e impostos","Checklist de documentos"].map((item,i)=><li key={i} className="flex items-center gap-2 text-gray-600"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>{item}</li>)}
                </ul>
              </div>
              <div className="bg-gray-50 p-8 flex flex-col justify-center">
                <a href="/guia-comprar-casa-portugal.pdf" download className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download Direto (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img src="/logo.svg" alt="Procuracasa.pt" className="h-10 w-auto brightness-0 invert mb-4" />
              <p className="text-gray-400 mb-4">Encontramos a sua casa ideal sem perder tempo.</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/procuracasa.pt" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="https://tiktok.com/@procuracasa" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg></a>
                <a href="mailto:procura.casa@hotmail.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#como-funciona" className="hover:text-[#FF9500]">Como Funciona</a></li>
                <li><a href="#beneficios" className="hover:text-[#FF9500]">Benefícios</a></li>
                <li><a href="#formulario" className="hover:text-[#FF9500]">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacidade" className="hover:text-[#FF9500]">Privacidade</a></li>
                <li><a href="/termos" className="hover:text-[#FF9500]">Termos</a></li>
              </ul>
              <p className="text-gray-400 mt-4">procura.casa@hotmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Procuracasa.pt</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
