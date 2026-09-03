"use client";

import { useState, useEffect } from "react";

export default function ProcuracasaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadCount, setLeadCount] = useState(47);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [recName, setRecName] = useState("");
  const [recEmail, setRecEmail] = useState("");
  const [recPhone, setRecPhone] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [relationship, setRelationship] = useState("");
  const [authorization, setAuthorization] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLeadCount(47);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!recName || recName.length < 2) newErrors.recName = "Indique o seu nome";
    if (!recEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recEmail)) newErrors.recEmail = "Email inválido";
    if (!ownerName || ownerName.length < 2) newErrors.ownerName = "Indique o nome do proprietário";
    if (!ownerPhone || ownerPhone.length < 9) newErrors.ownerPhone = "Telefone do proprietário inválido";
    if (!propertyLocation) newErrors.propertyLocation = "Selecione a localização do imóvel";
    if (!authorization) newErrors.authorization = "Tem de confirmar que tem autorização";
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
        body: JSON.stringify({ 
          recName, recEmail, recPhone, 
          ownerName, ownerPhone, 
          propertyLocation, propertyType, relationship, 
          authorization 
        }),
      });
      if (response.ok) {
        alert("Recomendação recebida! Entraremos em contacto com a pessoa indicada de forma profissional.");
        setRecName(""); setRecEmail(""); setRecPhone(""); 
        setOwnerName(""); setOwnerPhone(""); 
        setPropertyLocation(""); setPropertyType(""); setRelationship(""); 
        setAuthorization(false);
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Procuracasa.pt" className="h-10 w-auto" />
              <span className="text-xl font-bold text-[#1F4E79]">Procuracasa.pt</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="text-gray-600 hover:text-[#FF9500] transition-colors">Como Funciona</a>
              <a href="#beneficios" className="text-gray-600 hover:text-[#FF9500] transition-colors">Benefícios</a>
              <a href="#condicoes" className="text-gray-600 hover:text-[#FF9500] transition-colors">Condições</a>
              <a href="#formulario" className="bg-[#FF9500] hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                Recomendar
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
              <a href="#como-funciona" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Como Funciona</a>
              <a href="#beneficios" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
              <a href="#condicoes" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Condições</a>
              <a href="#formulario" className="bg-[#FF9500] text-white text-center py-2 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Recomendar</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Rede de Recomendações
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F4E79] leading-tight mb-6">
                Conhece alguém que esteja a pensar vender um imóvel no{" "}
                <span className="text-[#FF9500]">Grande Porto?</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Recomende-nos um familiar, amigo ou colega. Nós tratamos da avaliação e da venda.{" "}
                <span className="font-semibold text-[#1F4E79]">Receba 3% da comissão se resultar em venda.</span>
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Atendimento Profissional</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Discrição Total</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>3% de Recompensa em Caso de Venda</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                <svg className="w-5 h-5 text-[#FF9500]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-gray-700">
                  <span className="font-bold text-[#1F4E79]">{leadCount}</span> recomendações validadas
                </span>
              </div>
            </div>

            {/* Lead Form */}
            <div id="formulario" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF9500] to-orange-500 p-4 text-center">
                  <h2 className="text-xl font-bold text-white">Faça uma Recomendação</h2>
                  <p className="text-white/90 text-sm">Leva apenas 1 minuto</p>
                </div>
                <div className="p-6">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        O seu Nome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nome de quem recomenda"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]"
                        value={recName}
                        onChange={(e) => setRecName(e.target.value)}
                      />
                      {errors.recName && <p className="text-red-500 text-sm mt-1">{errors.recName}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        O seu Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="o.seu@email.pt"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]"
                        value={recEmail}
                        onChange={(e) => setRecEmail(e.target.value)}
                      />
                      {errors.recEmail && <p className="text-red-500 text-sm mt-1">{errors.recEmail}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        O seu Telefone <span className="text-gray-400 text-sm font-normal">(opcional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="O seu número de telefone"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]"
                        value={recPhone}
                        onChange={(e) => setRecPhone(e.target.value)}
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h3 className="font-semibold text-gray-700 mb-2">Dados do Proprietário</h3>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                          Nome do Proprietário <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Nome de quem vai vender"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                        />
                        {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                          Telefone do Proprietário <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Telefone de quem vai vender"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]"
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                        />
                        {errors.ownerPhone && <p className="text-red-500 text-sm mt-1">{errors.ownerPhone}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                          Localização do Imóvel <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] bg-white"
                          value={propertyLocation}
                          onChange={(e) => setPropertyLocation(e.target.value)}
                        >
                          <option value="">Selecione a zona</option>
                          <option value="Porto">Porto</option>
                          <option value="Matosinhos">Matosinhos</option>
                          <option value="Vila Nova de Gaia">Vila Nova de Gaia</option>
                          <option value="Maia">Maia</option>
                          <option value="Vila do Conde">Vila do Conde</option>
                          <option value="Póvoa de Varzim">Póvoa de Varzim</option>
                        </select>
                        {errors.propertyLocation && <p className="text-red-500 text-sm mt-1">{errors.propertyLocation}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                          Tipo de Imóvel <span className="text-gray-400 text-sm font-normal">(opcional)</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] bg-white"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                        >
                          <option value="">Selecione o tipo</option>
                          <option value="Apartamento">Apartamento</option>
                          <option value="Moradia">Moradia</option>
                          <option value="Terreno">Terreno</option>
                          <option value="Comercial">Comercial</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          A sua relação com o proprietário <span className="text-gray-400 text-sm font-normal">(opcional)</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] bg-white"
                          value={relationship}
                          onChange={(e) => setRelationship(e.target.value)}
                        >
                          <option value="">Selecione a relação</option>
                          <option value="Familiar">Familiar</option>
                          <option value="Amigo">Amigo</option>
                          <option value="Colega">Colega de trabalho</option>
                          <option value="Vizinho">Vizinho</option>
                          <option value="Conhecido">Conhecido</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 w-5 h-5 text-[#FF9500] border-gray-300 rounded focus:ring-[#FF9500]"
                          checked={authorization}
                          onChange={(e) => setAuthorization(e.target.checked)}
                        />
                        <span className="text-sm text-gray-600">
                          Confirmo que tenho autorização da pessoa acima referida para partilhar o seu contacto com a Procuracasa para efeitos de contacto sobre a possível venda do imóvel.
                        </span>
                      </label>
                      {errors.authorization && <p className="text-red-500 text-sm mt-1">{errors.authorization}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "A enviar..."
                      ) : (
                        <>
                          Enviar Recomendação
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ao submeter, concorda com a nossa{" "}
                    <a href="/privacidade" className="text-[#FF9500] hover:underline">política de privacidade</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">Processo Simples</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">Como Funciona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Em três passos simples, ajuda os seus conhecidos a venderem o seu imóvel com profissionais de confiança.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: 1, title: "Conhece alguém", desc: "Um familiar, amigo, vizinho ou colega que mencionou estar a pensar vender a casa ou mudar-se." },
              { num: 2, title: "Faça a recomendação", desc: "Preencha o formulário com os dados dessa pessoa, garantindo que tem a autorização dela." },
              { num: 3, title: "Nós tratamos do resto", desc: "A nossa consultora entra em contacto de forma profissional. Se o negócio se concretizar, é recompensado." },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
                  <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FF9500] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {step.num}
                  </div>
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mt-2">
                    <svg className="w-8 h-8 text-[#FF9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {step.num === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                      {step.num === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
                      {step.num === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1F4E79] mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mb-4">Vantagens</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">Porquê Recomendar o Procuracasa?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Apoio Local Especializado", desc: "Atuamos exclusivamente no Grande Porto, conhecendo o mercado como ninguém." },
              { title: "Atendimento Profissional", desc: "A sua recomendação é tratada com o máximo rigor e discrição pela nossa equipa." },
              { title: "Ajuda Quem Precisa", desc: "Muitas pessoas querem vender mas não dão o passo. Nós ajudamos nesse processo." },
              { title: "Recompensa de 3%", desc: "Receba 3% da comissão de mediação, em caso de venda concretizada." },
            ].map((benefit, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#FF9500]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1F4E79] mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Reward Box */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-white rounded-2xl p-8 border-l-4 border-[#FF9500] shadow-md">
            <h3 className="text-2xl font-bold text-[#1F4E79] mb-4 flex items-center gap-3">
              <span className="text-3xl">💰</span> Seja recompensado por uma recomendação bem-sucedida
            </h3>
            <p className="text-gray-700 mb-4">
              Se a sua recomendação resultar numa venda concretizada através da nossa consultora, receberá uma recompensa correspondente a <strong>3% do valor da comissão de mediação efetivamente recebida</strong>.
            </p>
            <div className="bg-white rounded-xl p-4 border border-gray-200 inline-block">
              <p className="text-sm text-gray-500 mb-1">Exemplo:</p>
              <p className="text-gray-700">
                Um imóvel vendido por <strong>300.000 €</strong>, com uma comissão de <strong>15.000 €</strong>, poderá gerar uma recompensa de <strong className="text-[#FF9500]">450 €</strong>.
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              A recompensa só é atribuída após a conclusão da venda e o recebimento da respetiva comissão. <a href="#condicoes" className="text-[#FF9500] hover:underline font-medium">Ver condições do programa.</a>
            </p>
          </div>

        </div>
      </section>

      {/* Conditions Section */}
      <section id="condicoes" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">Transparência Total</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">Condições do Programa de Recomendações</h2>
            <p className="text-gray-600">Regras claras para que ambas as partes saibam o que esperar.</p>
          </div>

          <div className="space-y-8">
            {/* Item 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#1F4E79] mb-3">1. O que é uma recomendação válida?</h3>
              <p className="text-gray-600 mb-2">A pessoa recomendada deve:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Ter conhecimento da recomendação;</li>
                <li>Autorizar o contacto;</li>
                <li>Estar relacionada com um imóvel localizado na área de atuação indicada (Grande Porto);</li>
                <li>Não estar já identificada/contactada pela consultora relativamente ao mesmo imóvel.</li>
              </ul>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#1F4E79] mb-3">2. Quando existe direito à recompensa?</h3>
              <p className="text-gray-600 mb-2">A recompensa só é devida quando ocorrerem todos estes eventos:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>A recomendação é aceite como válida;</li>
                <li>O imóvel é angariado pela consultora;</li>
                <li>O imóvel é vendido;</li>
                <li>A comissão de mediação é efetivamente recebida.</li>
              </ul>
            </div>

            {/* Item 3 & 4 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-[#1F4E79] mb-3">3. Qual é o valor?</h3>
                <p className="text-gray-600">3% da comissão de mediação efetivamente recebida, excluindo IVA.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-[#1F4E79] mb-3">4. Quando é paga?</h3>
                <p className="text-gray-600">Até 30 dias após o recebimento integral da comissão pela agência.</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-red-400">
              <h3 className="text-xl font-bold text-[#1F4E79] mb-3">5. Uma pessoa pode recomendar-se a si própria?</h3>
              <p className="text-gray-600">
                Não. Não são elegíveis autorrecomendações. A recompensa destina-se exclusivamente a recomendações espontâneas de terceiros.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof / Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1F4E79] to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex bg-white/20 text-white px-3 py-1 rounded-full text-sm mb-4">Testemunhos</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Quem Já Recomendou</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Recomendei a minha vizinha do Porto e o processo foi super simples. Recebi a minha recompensa rapidamente!", initials: "AS", name: "Ana Santos", location: "Porto" },
              { text: "O meu colega de trabalho estava a pensar vender em Matosinhos. Indiquei à equipa e fui prontamente recompensado.", initials: "JR", name: "João Rodrigues", location: "Matosinhos" },
              { text: "Excelente acompanhamento. Recomendei um familiar em Vila do Conde e correram muito bem com o negócio.", initials: "MC", name: "Maria Carvalho", location: "Vila do Conde" },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${i % 2 === 0 ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'} rounded-full flex items-center justify-center font-bold text-white`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-blue-200 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">{leadCount}+</p>
              <p className="text-blue-200">Recomendações</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">6</p>
              <p className="text-blue-200">Concelhos Cobertos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">100%</p>
              <p className="text-blue-200">Discrição</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">3%</p>
              <p className="text-blue-200">Recompensa</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#1F4E79]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para Fazer uma Recomendação?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Conhece alguém no Grande Porto a pensar vender? Ajude-o a fazer um bom negócio e seja recompensado.
          </p>
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-[#FF9500] hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-colors"
          >
            Quero Recomendar
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Procuracasa.pt" className="h-10 w-auto" />
                <span className="text-xl font-bold">Procuracasa.pt</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-sm">
                A rede de recomendações imobiliárias no Grande Porto. Ajude os seus conhecidos a vender com segurança.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/procuracasa.pt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@procuracasa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a href="mailto:procura.casa@hotmail.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#como-funciona" className="hover:text-[#FF9500] transition-colors">Como Funciona</a></li>
                <li><a href="#beneficios" className="hover:text-[#FF9500] transition-colors">Benefícios</a></li>
                <li><a href="#condicoes" className="hover:text-[#FF9500] transition-colors">Condições</a></li>
                <li><a href="#formulario" className="hover:text-[#FF9500] transition-colors">Recomendar</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacidade" className="hover:text-[#FF9500] transition-colors">Política de Privacidade</a></li>
                <li><a href="/termos" className="hover:text-[#FF9500] transition-colors">Termos e Condições</a></li>
              </ul>
              <h3 className="font-semibold mb-4 mt-6">Contacto</h3>
              <a href="mailto:procuracasa@procuracasa.pt" className="text-gray-400 hover:text-[#FF9500] transition-colors">procuracasa@procuracasa.pt</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Procuracasa.pt. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
