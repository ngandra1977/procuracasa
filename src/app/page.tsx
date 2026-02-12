"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProcuracasaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xeelaaew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone || "Não indicado",
          localizacao: formData.location,
          tipoImovel: formData.propertyType,
          mensagem: formData.message,
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
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
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Procuracasa.pt" 
              width={40} 
              height={40}
              className="rounded-xl"
            />
            <span className="text-xl font-bold text-blue-900">Procuracasa.pt</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Encontre a Sua Casa Ideal <span className="text-orange-500">Sem Perder Tempo</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Diz-nos o que procuras. Nos encontramos por si. Sem spam, sem pressao.
            </p>
            <div className="flex gap-4 text-gray-600 text-sm">
              <span>✓ 100% Gratuito</span>
              <span>✓ Sem Compromisso</span>
              <span>✓ Resposta em 24h</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
            <div className="bg-orange-500 p-4 text-center">
              <h2 className="text-xl font-bold text-white">Comece a Sua Procura</h2>
              <p className="text-white/80 text-sm">Preencha em 1 minuto</p>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Obrigado!</h3>
                  <p className="text-gray-600">Recebemos o seu pedido. Entraremos em contacto em breve!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Nome *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="O seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="o.seu@email.pt"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Telefone <span className="text-gray-400">(opcional)</span></label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Zona pretendida</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Ex: Lisboa, Cascais, Porto..."
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Tipo de imovel</label>
                    <select
                      className="w-full px-4 py-3 border rounded-lg"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    >
                      <option value="">Selecione</option>
                      <option value="T1">T1</option>
                      <option value="T2">T2</option>
                      <option value="T3">T3</option>
                      <option value="T4+">T4+</option>
                      <option value="Moradia">Moradia</option>
                      <option value="Terreno">Terreno</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">O que procura?</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Descreva o imovel que procura, orcamento, caracteristicas importantes..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white font-semibold py-4 rounded-lg hover:bg-orange-600 disabled:opacity-50"
                  >
                    {isSubmitting ? "A enviar..." : "Comecar a Procura Gratis"}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Ao submeter, concorda com a nossa{" "}
                    <a href="/privacidade" className="text-orange-500 underline">Politica de Privacidade</a>{" "}
                    e{" "}
                    <a href="/termos" className="text-orange-500 underline">Termos e Condicoes</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">PDF Gratuito</span>
                <h2 className="text-2xl font-bold text-blue-900 mt-4 mb-4">
                  Guia Completo para Comprar Casa em Portugal 2025
                </h2>
                <p className="text-gray-600 mb-6">
                  Tudo o que precisa de saber sobre o processo de compra, financiamento, 
                  impostos e dicas para evitar armadilhas comuns.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Passo-a-passo do processo de compra
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Documentos necessarios
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Impostos e custos explicados
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Erros comuns a evitar
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Checklist final incluida
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 md:p-10 flex flex-col justify-center items-center">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-4 text-center">
                  <div className="text-5xl mb-2">📋</div>
                  <p className="text-gray-500 text-sm">PDF com 15 paginas</p>
                </div>
                <a 
                  href="/guia-comprar-casa-portugal.pdf" 
                  target="_blank"
                  className="w-full bg-orange-500 text-white font-semibold py-4 rounded-lg hover:bg-orange-600 text-center"
                >
                  Transferir Guia Gratuito
                </a>
                <p className="text-xs text-gray-500 text-center mt-3">Sem spam. Download imediato.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Conte-nos o que procura</h3>
              <p className="text-gray-600">Preencha o formulario em 1 minuto.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Nos pesquisamos por si</h3>
              <p className="text-gray-600">Procuramos imoveis que outros nao veem.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Receba opcoes</h3>
              <p className="text-gray-600">Apresentamos as melhores oportunidades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="/logo.png" 
              alt="Procuracasa.pt" 
              width={40} 
              height={40}
              className="rounded-xl"
            />
            <span className="text-xl font-bold">Procuracasa.pt</span>
          </div>
          <p className="text-gray-400 text-center mb-2">© 2025 Procuracasa.pt. Todos os direitos reservados.</p>
          <p className="text-gray-400 text-center mb-4">
            <a href="mailto:procura.casa@hotmail.com" className="hover:text-orange-500">procura.casa@hotmail.com</a>
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.instagram.com/procuracasa.pt" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Instagram</a>
            <a href="https://www.tiktok.com/@procuracasa" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">TikTok</a>
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="/privacidade" className="hover:text-orange-500">Politica de Privacidade</a>
            <span>|</span>
            <a href="/termos" className="hover:text-orange-500">Termos e Condicoes</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
