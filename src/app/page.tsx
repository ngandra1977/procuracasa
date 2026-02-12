"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Search,
  Heart,
  Clock,
  Eye,
  UserCheck,
  Gift,
  CheckCircle,
  Instagram,
  Mail,
  ArrowRight,
  Star,
  Users,
  Download,
  Menu,
  X,
} from "lucide-react";

export default function ProcuracasaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [leadCount, setLeadCount] = useState(47);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
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
    if (!message || message.length < 5) newErrors.message = "Descreva o que procura (mínimo 5 caracteres)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, location, phone, message }),
      });
      if (response.ok) {
        alert("Recebemos o seu pedido. Entraremos em contacto em breve!");
        setName(""); setEmail(""); setLocation(""); setPhone(""); setMessage("");
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

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscribeEmail)) {
      alert("Email inválido"); return;
    }
    setIsSubscribing(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribeEmail, source: "lead_magnet" }),
      });
      if (response.ok) {
        alert("Vai receber o guia no seu email em breve!");
        setSubscribeEmail("");
      } else {
        alert("Ocorreu um erro. Tente novamente.");
      }
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1F4E79]">Procuracasa.pt</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="text-gray-600 hover:text-[#FF9500]">Como Funciona</a>
              <a href="#beneficios" className="text-gray-600 hover:text-[#FF9500]">Benefícios</a>
              <a href="#sobre" className="text-gray-600 hover:text-[#FF9500]">Sobre Nós</a>
              <Button asChild className="bg-[#FF9500] hover:bg-orange-600 text-white font-medium px-6">
                <a href="#formulario">Começar</a>
              </Button>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#como-funciona" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Como Funciona</a>
              <a href="#beneficios" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
              <a href="#sobre" className="text-gray-600" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</a>
              <Button asChild className="bg-[#FF9500] text-white">
                <a href="#formulario" onClick={() => setMobileMenuOpen(false)}>Começar</a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        <div className="absolute inset-0 opacity-10">
          <img src="/hero-home.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-orange-100 text-orange-700 mb-4"><Star className="w-3 h-3 mr-1" />Serviço Gratuito</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F4E79] leading-tight mb-6">
                Encontre a Sua Casa Ideal <span className="text-[#FF9500]">Sem Perder Tempo</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Diz-nos o que procura. Nós encontramos por si. <span className="font-semibold text-[#1F4E79]">Sem spam, sem pressão.</span>
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500" /><span>100% Gratuito</span></div>
                <div className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500" /><span>Sem Compromisso</span></div>
                <div className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500" /><span>Resposta em 24h</span></div>
              </div>
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                <Users className="w-5 h-5 text-[#FF9500]" />
                <span className="text-gray-700"><span className="font-bold text-[#1F4E79]">{leadCount}</span> famílias já ajudadas</span>
              </div>
            </div>

            <div id="formulario" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF9500] to-orange-500 p-4 text-center">
                  <h2 className="text-xl font-bold text-white">Comece a Sua Procura</h2>
                  <p className="text-white/90 text-sm">Preencha em 1 minuto</p>
                </div>
                <CardContent className="p-6">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                      <Label className="text-gray-700 font-medium">Nome <span className="text-red-500">*</span></Label>
                      <Input placeholder="O seu nome" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Email <span className="text-red-500">*</span></Label>
                      <Input type="email" placeholder="o.seu@email.pt" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Localização Pretendida <span className="text-red-500">*</span></Label>
                      <Input placeholder="Ex: Lisboa, Porto, Algarve..." className="mt-1" value={location} onChange={(e) => setLocation(e.target.value)} />
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Telefone <span className="text-gray-400 text-sm">(opcional)</span></Label>
                      <Input type="tel" placeholder="O seu telefone" className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">O que procura? <span className="text-red-500">*</span></Label>
                      <Textarea placeholder="Descreva o tipo de imóvel, orçamento, preferências..." className="mt-1 min-h-[100px]" value={message} onChange={(e) => setMessage(e.target.value)} />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-6 text-lg" disabled={isSubmitting}>
                      {isSubmitting ? "A enviar..." : <>Começar a Procura Grátis<ArrowRight className="ml-2 w-5 h-5" /></>}
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 text-center mt-4">Ao submeter, concorda com a nossa política de privacidade.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Processo Simples</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">Como Funciona</h2>
            <p className="text-gray-600">Em três passos simples, ajudamos você a encontrar a casa dos seus sonhos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{n:1, icon:UserCheck, t:"Conte-nos o que procura", d:"Preencha o formulário em 1 minuto."},{n:2, icon:Search, t:"Nós pesquisamos por si", d:"Procuramos imóveis que outros não vêem."},{n:3, icon:Home, t:"Receba opções", d:"Apresentamos as melhores oportunidades."}].map((s) => (
              <div key={s.n} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                  <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FF9500] rounded-full flex items-center justify-center text-white font-bold">{s.n}</div>
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mt-2"><s.icon className="w-8 h-8 text-[#FF9500]" /></div>
                  <h3 className="text-xl font-bold text-[#1F4E79] mb-3">{s.t}</h3>
                  <p className="text-gray-600">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-700 mb-4">Vantagens</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">Porquê Escolher o Procuracasa?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{icon:Clock, t:"Sem perder horas em portais", c:"orange"},{icon:Eye, t:"Oportunidades exclusivas", c:"blue"},{icon:Heart, t:"Acompanhamento personalizado", c:"orange"},{icon:Gift, t:"Grátis, sem compromisso", c:"blue"}].map((b,i) => (
              <div key={i} className={`bg-gradient-to-br from-${b.c}-50 to-white rounded-2xl p-6 border border-${b.c}-100 hover:shadow-lg`}>
                <div className={`w-12 h-12 bg-${b.c}-100 rounded-xl flex items-center justify-center mb-4`}><b.icon className={`w-6 h-6 text-${b.c === "orange" ? "[#FF9500]" : "[#1F4E79]"}`} /></div>
                <h3 className="text-lg font-bold text-[#1F4E79] mb-2">{b.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <Badge className="bg-orange-100 text-orange-700 mb-4">PDF Gratuito</Badge>
                <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Guia para Comprar Casa em Portugal 2025</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500" />Passo-a-passo do processo</li>
                  <li className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500" />Custos e impostos</li>
                  <li className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500" />Checklist de documentos</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 flex flex-col justify-center">
                <form onSubmit={onSubscribe} className="space-y-4">
                  <Label>O seu email</Label>
                  <Input type="email" placeholder="o.seu@email.pt" value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)} />
                  <Button type="submit" className="w-full bg-[#FF9500] hover:bg-orange-600 text-white py-6" disabled={isSubscribing}>
                    {isSubscribing ? "A enviar..." : <><Download className="w-5 h-5 mr-2" />Receber Guia</>}
                  </Button>
                </form>
                <div className="relative my-4"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-sm"><span className="bg-gray-50 px-2 text-gray-500">ou</span></div></div>
                <Button asChild variant="outline" className="w-full border-[#FF9500] text-[#FF9500] py-6">
                  <a href="/guia-comprar-casa-portugal.pdf" download><Download className="w-5 h-5 mr-2" />Download Direto</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#1F4E79]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para Encontrar a Sua Casa Ideal?</h2>
          <Button asChild size="lg" className="bg-[#FF9500] hover:bg-orange-600 text-white px-8 py-6 text-lg">
            <a href="#formulario">Começar Agora<ArrowRight className="ml-2 w-5 h-5" /></a>
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center"><Home className="w-6 h-6 text-white" /></div>
                <span className="text-xl font-bold">Procuracasa.pt</span>
              </div>
              <p className="text-gray-400 mb-4">Encontramos a sua casa ideal sem perder tempo.</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/procuracasa.pt" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500]"><Instagram className="w-5 h-5" /></a>
                <a href="https://tiktok.com/@procuracasa" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg></a>
                <a href="mailto:procura.casa@hotmail.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500]"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#como-funciona" className="hover:text-[#FF9500]">Como Funciona</a></li>
                <li><a href="#beneficios" className="hover:text-[#FF9500]">Benefícios</a></li>
                <li><a href="#sobre" className="hover:text-[#FF9500]">Sobre Nós</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <p className="text-gray-400">procura.casa@hotmail.com</p>
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
