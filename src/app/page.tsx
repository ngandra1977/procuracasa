"use client";

import { useState } from "react";

export default function ProcuracasaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    propertyType: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
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
                    <label className="block text-gray-700 mb-1">Nome</label>
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
                    <label className="block text-gray-700 mb-1">Email</label>
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
                    <label className="block text-gray-700 mb-1">Localizacao</label>
                    <select
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    >
                      <option value="">Selecione</option>
                      <option value="Lisboa">Lisboa</option>
                      <option value="Porto">Porto</option>
                      <option value="Algarve">Algarve</option>
                      <option value="Outra">Outra</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Tipo de Imovel</label>
                    <select
                      required
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
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-semibold py-4 rounded-lg hover:bg-orange-600"
                  >
                    Comecar a Procura Gratis
                  </button>
                </form>
              )}
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
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Procuracasa.pt. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://instagram.com/procuracasa.pt" className="hover:text-orange-500">Instagram</a>
            <a href="https://tiktok.com/@procuracasa.pt" className="hover:text-orange-500">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
