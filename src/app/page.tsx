"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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

// Form schema
const leadFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  location: z.string().min(2, "Indique a localização pretendida"),
  phone: z.string().optional(),
  message: z.string().min(5, "Descreva o que procura (mínimo 5 caracteres)"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const subscribeSchema = z.object({
  email: z.string().email("Email inválido"),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

export default function ProcuracasaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [leadCount, setLeadCount] = useState(47);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Lead form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  // Subscribe form
  const {
    register: registerSubscribe,
    handleSubmit: handleSubmitSubscribe,
    reset: resetSubscribe,
    formState: { errors: subscribeErrors },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
  });

  // Fetch lead count
  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeadCount(data.count || 47))
      .catch(() => setLeadCount(47));
  }, []);

  // Submit lead form
  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Recebemos o seu pedido. Entraremos em contacto em breve!",
        });
        reset();
        setLeadCount((prev) => prev + 1);
      } else {
        toast({
          title: "Erro",
          description: result.error || "Ocorreu um erro. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit subscribe form
  const onSubscribe = async (data: SubscribeFormData) => {
    setIsSubscribing(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "lead_magnet" }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: "Vai receber o guia no seu email em breve!",
        });
        resetSubscribe();
      } else {
        toast({
          title: "Erro",
          description: result.error || "Ocorreu um erro. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1F4E79]">Procuracasa.pt</span>
            </div>
            
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="text-gray-600 hover:text-[#FF9500] transition-colors">Como Funciona</a>
              <a href="#beneficios" className="text-gray-600 hover:text-[#FF9500] transition-colors">Benefícios</a>
              <a href="#sobre" className="text-gray-600 hover:text-[#FF9500] transition-colors">Sobre Nós</a>
              <Button asChild className="bg-[#FF9500] hover:bg-orange-600 text-white font-medium px-6">
                <a href="#formulario">Começar</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#como-funciona" className="text-gray-600 hover:text-[#FF9500]" onClick={() => setMobileMenuOpen(false)}>Como Funciona</a>
              <a href="#beneficios" className="text-gray-600 hover:text-[#FF9500]" onClick={() => setMobileMenuOpen(false)}>Benefícios</a>
              <a href="#sobre" className="text-gray-600 hover:text-[#FF9500]" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</a>
              <Button asChild className="bg-[#FF9500] hover:bg-orange-600 text-white">
                <a href="#formulario" onClick={() => setMobileMenuOpen(false)}>Começar</a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        
        {/* Background image with overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="/hero-home.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 mb-4">
                <Star className="w-3 h-3 mr-1" />
                Serviço Gratuito
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F4E79] leading-tight mb-6">
                Encontre a Sua Casa Ideal{" "}
                <span className="text-[#FF9500]">Sem Perder Tempo</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Diz-nos o que procura. Nós encontramos por si.{" "}
                <span className="font-semibold text-[#1F4E79]">Sem spam, sem pressão.</span>
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Sem Compromisso</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Resposta em 24h</span>
                </div>
              </div>

              {/* Families helped counter */}
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                <Users className="w-5 h-5 text-[#FF9500]" />
                <span className="text-gray-700">
                  <span className="font-bold text-[#1F4E79]">{leadCount}</span> famílias já ajudadas
                </span>
              </div>
            </div>

            {/* Right - Lead Form */}
            <div id="formulario" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF9500] to-orange-500 p-4 text-center">
                  <h2 className="text-xl font-bold text-white">Comece a Sua Procura</h2>
                  <p className="text-white/90 text-sm">Preencha em 1 minuto</p>
                </div>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Nome <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="O seu nome"
                        className="mt-1 border-gray-200 focus:border-[#FF9500] focus:ring-[#FF9500]"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="o.seu@email.pt"
                        className="mt-1 border-gray-200 focus:border-[#FF9500] focus:ring-[#FF9500]"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-gray-700 font-medium">
                        Localização Pretendida <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="location"
                        placeholder="Ex: Lisboa, Porto, Algarve, Cascais..."
                        className="mt-1 border-gray-200 focus:border-[#FF9500] focus:ring-[#FF9500]"
                        {...register("location")}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Telefone <span className="text-gray-400 text-sm">(opcional)</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="O seu número de telefone"
                        className="mt-1 border-gray-200 focus:border-[#FF9500] focus:ring-[#FF9500]"
                        {...register("phone")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        O que procura? <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Descreva o tipo de imóvel que procura (T2, moradia, com garagem, etc.), orçamento aproximado e outras preferências..."
                        className="mt-1 border-gray-200 focus:border-[#FF9500] focus:ring-[#FF9500] min-h-[100px]"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-6 text-lg transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "A enviar..."
                      ) : (
                        <>
                          Começar a Procura Grátis
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ao submeter, concorda com a nossa política de privacidade.
                    Não partilhamos os seus dados.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Processo Simples</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">
              Como Funciona
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Em três passos simples, ajudamos você a encontrar a casa dos seus sonhos sem stress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
                <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FF9500] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mt-2">
                  <UserCheck className="w-8 h-8 text-[#FF9500]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F4E79] mb-3">
                  Conte-nos o que procura
                </h3>
                <p className="text-gray-600">
                  Preencha o formulário em 1 minuto. Diga-nos a localização, tipo de imóvel e as suas preferências.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
                <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FF9500] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mt-2">
                  <Search className="w-8 h-8 text-[#FF9500]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F4E79] mb-3">
                  Nós pesquisamos por si
                </h3>
                <p className="text-gray-600">
                  A nossa equipa procura imóveis que outros não vêem, incluindo oportunidades exclusivas.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
                <div className="absolute -top-4 left-8 w-10 h-10 bg-[#FF9500] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mt-2">
                  <Home className="w-8 h-8 text-[#FF9500]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F4E79] mb-3">
                  Receba opções
                </h3>
                <p className="text-gray-600">
                  Apresentamos-lhe as melhores oportunidades que correspondem exactamente ao que procura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-700 mb-4">Vantagens</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-4">
              Porquê Escolher o Procuracasa?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Poupamos-lhe tempo e stress na procura da casa ideal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#FF9500]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F4E79] mb-2">
                Sem perder horas em portais
              </h3>
              <p className="text-gray-600 text-sm">
                Nós fazemos a pesquisa por si, poupando-lhe horas de navegação infinita.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-[#1F4E79]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F4E79] mb-2">
                Acesso a oportunidades exclusivas
              </h3>
              <p className="text-gray-600 text-sm">
                Imóveis que não chegam aos portais públicos, directamente para si.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#FF9500]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F4E79] mb-2">
                Acompanhamento personalizado
              </h3>
              <p className="text-gray-600 text-sm">
                Um consultor dedicado para entender exactamente o que precisa.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-[#1F4E79]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F4E79] mb-2">
                Grátis, sem compromisso
              </h3>
              <p className="text-gray-600 text-sm">
                Não paga nada até decidir avançar com a compra do imóvel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1F4E79] to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-white/20 text-white mb-4">Testemunhos</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              O Que Dizem os Nossos Clientes
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Histórias reais de famílias que encontraram a sua casa ideal connosco.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-6">
                &ldquo;Depois de meses à procura sozinho, o Procuracasa encontrou-me o T2 perfeito em Lisboa em apenas duas semanas. Serviço incrível!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-white">
                  JR
                </div>
                <div>
                  <p className="font-semibold">João Rodrigues</p>
                  <p className="text-blue-200 text-sm">Lisboa • T2</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-6">
                &ldquo;Encontraram uma moradia no Algarve que não estava em nenhum portal. O acompanhamento foi excepcional do início ao fim.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                  MC
                </div>
                <div>
                  <p className="font-semibold">Maria Carvalho</p>
                  <p className="text-blue-200 text-sm">Algarve • Moradia</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/90 mb-6">
                &ldquo;Pouparam-me imenso tempo! Recebi propostas personalizadas e encontrei o meu T3 no Porto em menos de um mês.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-white">
                  AS
                </div>
                <div>
                  <p className="font-semibold">Ana Santos</p>
                  <p className="text-blue-200 text-sm">Porto • T3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">{leadCount}+</p>
              <p className="text-blue-200">Famílias Ajudadas</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">98%</p>
              <p className="text-blue-200">Taxa de Satisfação</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">2 sem</p>
              <p className="text-blue-200">Tempo Médio de Procura</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF9500]">100%</p>
              <p className="text-blue-200">Serviço Gratuito</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="sobre" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-blue-100 rounded-3xl overflow-hidden flex items-center justify-center">
                <img
                  src="/hero-home.png"
                  alt="Equipa Procuracasa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FF9500] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1F4E79]">Desde 2020</p>
                    <p className="text-gray-500 text-sm">A ajudar famílias</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <Badge className="bg-orange-100 text-orange-700 mb-4">Sobre Nós</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F4E79] mb-6">
                Uma Equipa Dedicada a Encontrar a Sua Casa
              </h2>
              <p className="text-gray-600 mb-6">
                O Procuracasa nasceu de uma constatação simples: perder horas a navegar 
                em portais imobiliários não é a melhor forma de encontrar casa. Existem 
                imóveis que nunca chegam a ser anunciados publicamente.
              </p>
              <p className="text-gray-600 mb-6">
                A nossa missão é fazer a ligação entre quem procura e quem tem o imóvel 
                ideal, de forma humana, personalizada e sem pressão comercial.
              </p>
              <p className="text-gray-600 mb-8">
                Acreditamos que encontrar casa deve ser uma experiência positiva, não 
                uma fonte de stress. Por isso, fazemos todo o trabalho de pesquisa por si.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Equipa especializada</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Rede de parceiros</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cobertura nacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left content */}
              <div className="p-8 md:p-10">
                <Badge className="bg-orange-100 text-orange-700 mb-4">PDF Gratuito</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E79] mb-4">
                  Guia Completo para Comprar Casa em Portugal 2025
                </h2>
                <p className="text-gray-600 mb-6">
                  Tudo o que precisa de saber sobre o processo de compra, financiamento, 
                  impostos e dicas para evitar armadilhas comuns.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Passo-a-passo do processo de compra</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Simulador de custos e impostos</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Checklist de documentos necessários</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Dicas de negociação</span>
                  </li>
                </ul>
              </div>

              {/* Right form */}
              <div className="bg-gray-50 p-8 md:p-10 flex flex-col justify-center">
                <form onSubmit={handleSubmitSubscribe(onSubscribe)} className="space-y-4">
                  <div>
                    <Label htmlFor="subscribe-email" className="text-gray-700 font-medium">
                      O seu email
                    </Label>
                    <Input
                      id="subscribe-email"
                      type="email"
                      placeholder="o.seu@email.pt"
                      className="mt-1 border-gray-200 focus:border-[#FF9500] focus:ring-[#FF9500]"
                      {...registerSubscribe("email")}
                    />
                    {subscribeErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{subscribeErrors.email.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FF9500] hover:bg-orange-600 text-white font-semibold py-6"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? (
                      "A enviar..."
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Receber Guia por Email
                      </>
                    )}
                  </Button>
                </form>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-50 px-2 text-gray-500">ou</span>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[#FF9500] text-[#FF9500] hover:bg-orange-50 font-semibold py-6"
                >
                  <a href="/guia-comprar-casa-portugal.pdf" download>
                    <Download className="w-5 h-5 mr-2" />
                    Download Direto (PDF)
                  </a>
                </Button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Sem spam. Cancelar a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-[#1F4E79]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para Encontrar a Sua Casa Ideal?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Conte-nos o que procura e deixe-nos fazer o trabalho por si. 
            É gratuito e sem compromisso.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#FF9500] hover:bg-orange-600 text-white font-semibold px-8 py-6 text-lg"
          >
            <a href="#formulario">
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Procuracasa.pt</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-sm">
                Encontramos a sua casa ideal sem perder tempo. 
                Serviço gratuito e personalizado.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/procuracasa.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com/@procuracasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
                <a
                  href="mailto:procura.casa@hotmail.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#como-funciona" className="hover:text-[#FF9500] transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="hover:text-[#FF9500] transition-colors">
                    Benefícios
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-[#FF9500] transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#formulario" className="hover:text-[#FF9500] transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:procura.casa@hotmail.com" className="hover:text-[#FF9500] transition-colors">
                    procura.casa@hotmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Procuracasa.pt. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
