"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ContactModal from "@/app/components/ContactModal";
import {
  Leaf,
  ShieldCheck,
  TrendingUp,
  FileText,
  Scale,
  Building2,
  Briefcase,
  ClipboardList,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface NavLink {
  label: string;
  href: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Contato", href: "#contato" },
];

const services: Service[] = [
  {
    icon: FileText,
    title: "Registros Ambientais",
    description:
      "Obtenha conformidade ambiental com as regulamentações vigentes. Cuidamos de toda a documentação necessária para manter sua propriedade regularizada.",
  },
  {
    icon: ShieldCheck,
    title: "Proteção de Marcas",
    description:
      "Proteja a identidade da sua empresa e garanta exclusividade sobre sua marca junto ao INPI, assegurando seu diferencial competitivo no mercado.",
  },
  {
    icon: ClipboardList,
    title: "Cadastros em Conselhos",
    description:
      "Simplifique a burocracia e agilize os processos de licenciamento e regularização junto a órgãos e conselhos reguladores.",
  },
  {
    icon: Building2,
    title: "Holding Rural",
    description:
      "Estruture e proteja seu patrimônio, unificando suas propriedades e negócios em uma única entidade jurídica com planejamento sucessório eficiente.",
  },
  {
    icon: Briefcase,
    title: "Consultoria Especializada",
    description:
      "Aumente a produtividade, reduza custos e otimize sua gestão com nosso conhecimento especializado e profundo do setor agronegócio.",
  },
  {
    icon: Scale,
    title: "Ações Agro Jurídicas",
    description:
      "Proteja seus interesses no agronegócio, garanta seus direitos e tenha tranquilidade com nossas ações e assessoria jurídica especializada.",
  },
];

const advantages = [
  {
    icon: TrendingUp,
    label: "Mais Eficiência",
    description: "Processos otimizados que economizam seu tempo e recursos",
  },
  {
    icon: ShieldCheck,
    label: "Mais Competitividade",
    description: "Soluções estratégicas que colocam você à frente no mercado",
  },
  {
    icon: Leaf,
    label: "Menos Burocracia",
    description: "Deixe as complicações administrativas com os nossos especialistas",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="h-px w-16 bg-gold/40" />
      <div className="mx-3 w-1.5 h-1.5 rounded-full bg-gold" />
      <div className="h-px w-16 bg-gold/40" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-gold font-sans text-xs font-semibold tracking-widest2 uppercase mb-4">
      {children}
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ onConsultarClick }: { onConsultarClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest/98 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
          aria-label="Ir ao topo"
        >
          <Image
            src="/logo.png"
            alt="Agrofortes"
            width={44}
            height={44}
            className="object-contain"
          />
          <div className="leading-none">
            <span className="block font-serif text-white font-semibold text-xl tracking-wide">
              AGRO<span className="text-gold">FORTES</span>
            </span>
            <span className="block font-sans text-white/50 text-[9px] tracking-widest2 uppercase mt-0.5">
              Soluções Agrícolas
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-sans text-white/80 hover:text-gold text-sm tracking-wide transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-gold after:transition-all after:duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onConsultarClick}
            className="font-sans text-sm font-medium px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 tracking-wide"
          >
            Consultar
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-1"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-forest border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-sans text-white/80 hover:text-gold text-left text-base tracking-wide transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onConsultarClick}
            className="mt-2 font-sans text-sm font-medium px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 tracking-wide text-center"
          >
            Consultar
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onConsultarClick }: { onConsultarClick: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1800&q=90"
          alt="Plantação brasileira ao entardecer"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Layered overlays for depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
      </div>

      {/* Decorative gold line left */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-gold" />
            <span className="font-sans text-gold text-xs tracking-widest2 uppercase font-medium">
              Serviços Estratégicos
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] mb-6">
            Soluções Estratégicas
            <br />
            <span className="text-gold">para o Agronegócio</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-white/75 text-lg md:text-xl leading-relaxed max-w-xl mb-12 font-light">
            Impulsionando o seu Agronegócio com soluções especializadas,
            eficiência comprovada e mais de uma década de experiência em todo o
            território nacional.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onConsultarClick}
              className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-forest font-sans font-semibold text-sm tracking-wide px-8 py-4 transition-all duration-300 shadow-lg shadow-gold/20"
            >
              Fale com um Especialista
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => {
                document
                  .querySelector("#solucoes")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 border border-white/30 hover:border-gold/60 text-white font-sans font-medium text-sm tracking-wide px-8 py-4 transition-all duration-300 hover:text-gold"
            >
              Nossas Soluções
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-sans text-white text-[10px] tracking-widest2 uppercase">
          Rolar
        </span>
        <ChevronDown size={16} className="text-gold animate-bounce" />
      </div>
    </section>
  );
}

// ─── About / Qualidade ────────────────────────────────────────────────────────

function AboutSection({ onConsultarClick }: { onConsultarClick: () => void }) {
  return (
    <section id="sobre" className="bg-cream-light py-28 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image Column */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=85"
              alt="Produtor rural com tablet em lavoura"
              fill
              className="object-cover"
            />
            {/* Gold frame accent */}
            <div className="absolute inset-0 border border-gold/20" />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 bg-forest text-white px-8 py-6 shadow-xl hidden md:block">
            <p className="font-serif text-4xl font-semibold text-gold leading-none">
              +10
            </p>
            <p className="font-sans text-xs text-white/70 tracking-wide mt-1 uppercase">
              Anos de Experiência
            </p>
          </div>
          {/* Decorative bg square */}
          <div className="absolute -top-6 -left-6 w-full h-full border border-gold/15 -z-10" />
        </div>

        {/* Text Column */}
        <div className="order-1 lg:order-2">
          <SectionLabel>Garantia de Qualidade</SectionLabel>
          <h2 className="font-serif text-forest text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Experiência e Qualidade
            <br />
            <span className="text-forest/60">em todo o Brasil</span>
          </h2>

          <GoldDivider />

          <p className="font-sans text-forest/70 text-base leading-[1.85] mb-6">
            Com mais de uma década de experiência, temos o conhecimento
            necessário para oferecer serviços de qualidade para empresas no
            setor do agronegócio.
          </p>
          <p className="font-sans text-forest/70 text-base leading-[1.85] mb-10">
            Nossa equipe é composta por profissionais altamente qualificados e
            habilidosos, prontos para atender às suas necessidades. Estamos
            sempre disponíveis, priorizando a ética e a eficiência em todos os
            nossos serviços. Atendemos em todo o Território Nacional.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Profissionais especializados no agronegócio",
              "Atendimento em todo o território nacional",
              "Ética, eficiência e resultados comprovados",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-gold mt-0.5 shrink-0" />
                <span className="font-sans text-forest/75 text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onConsultarClick}
            className="group inline-flex items-center gap-3 text-gold font-sans font-medium text-sm tracking-wide border-b border-gold/40 pb-0.5 hover:border-gold transition-colors"
          >
            Consultar agora
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Vantagens ────────────────────────────────────────────────────────────────

function VantagensSection() {
  return (
    <section id="vantagens" className="bg-forest py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Impulsione o seu Negócio</SectionLabel>
          <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-tight">
            O que você ganha com a Agrofortes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {advantages.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="bg-forest-dark hover:bg-forest-light transition-colors duration-300 p-10 flex flex-col items-start gap-5"
            >
              <div className="p-3 border border-gold/30">
                <Icon size={22} className="text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-white text-xl font-semibold mb-2">
                  {label}
                </h3>
                <p className="font-sans text-white/55 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesSection({ onConsultarClick }: { onConsultarClick: () => void }) {
  return (
    <section id="solucoes" className="bg-cream py-28 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <SectionLabel>Nossas Soluções</SectionLabel>
          <h2 className="font-serif text-forest text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Deixe a burocracia para trás
          </h2>
          <div className="h-px w-20 bg-gold mb-6" />
          <p className="font-sans text-forest/65 text-base leading-relaxed">
            Oferecemos um portfólio completo de serviços estratégicos para que
            você foque no que realmente importa: a produção e o crescimento do
            seu negócio.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-forest/10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group p-10 border-forest/10 hover:bg-forest transition-all duration-400 cursor-default
                  ${i % 3 !== 2 ? "lg:border-r" : ""}
                  ${i < 3 ? "border-b" : ""}
                  ${i % 2 === 0 ? "md:border-r lg:border-r-0" : ""}
                  ${i % 2 === 0 && (i === 2 || i === 4) ? "md:border-r" : ""}
                `}
              >
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 border border-gold/30 group-hover:border-gold/60 transition-colors">
                  <Icon
                    size={20}
                    className="text-gold group-hover:text-gold-light transition-colors"
                  />
                </div>
                <h3 className="font-serif text-forest group-hover:text-white text-xl font-semibold mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-forest/60 group-hover:text-white/65 text-sm leading-relaxed transition-colors">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 p-10 border border-gold/20 bg-forest/5">
          <p className="font-serif text-forest text-2xl md:text-3xl font-medium italic text-center md:text-left">
            "Nós cuidamos de tudo para você."
          </p>
          <button
            onClick={onConsultarClick}
            className="group shrink-0 inline-flex items-center gap-3 bg-forest hover:bg-forest-light text-white font-sans font-medium text-sm tracking-wide px-8 py-4 transition-colors duration-300"
          >
            Fale Conosco
            <ArrowRight
              size={15}
              className="text-gold group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CtaBanner({ onConsultarClick }: { onConsultarClick: () => void }) {
  return (
    <section className="relative py-28 px-6 lg:px-16 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&q=80"
        alt="Vista aérea de lavoura"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-forest/90" />
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #B8963E 0, #B8963E 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <SectionLabel>Atendimento Nacional</SectionLabel>
        <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-tight mb-6">
          Pronto para impulsionar o
          <br />
          <span className="text-gold">seu agronegócio?</span>
        </h2>
        <p className="font-sans text-white/65 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Entre em contato com nossa equipe de especialistas e descubra como
          podemos transformar os desafios do seu negócio em vantagens
          competitivas.
        </p>
        <button
          onClick={onConsultarClick}
          className="group inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-forest font-sans font-semibold text-sm tracking-wide px-10 py-4 transition-all duration-300 shadow-xl shadow-black/30"
        >
          Consultar Gratuitamente
          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}

// ─── Footer / Contact ─────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-forest-dark">
      {/* Main Contact Block */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 grid lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-6">
            <Image
              src="/logo.png"
              alt="Agrofortes"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="leading-none">
              <span className="block font-serif text-white font-semibold text-xl tracking-wide">
                AGRO<span className="text-gold">FORTES</span>
              </span>
              <span className="block font-sans text-white/40 text-[9px] tracking-widest2 uppercase mt-0.5">
                Soluções Agrícolas
              </span>
            </div>
          </div>
          <p className="font-sans text-white/50 text-sm leading-relaxed max-w-xs">
            Serviços estratégicos especializados para impulsionar o seu
            agronegócio em todo o território nacional.
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-serif text-white font-semibold text-sm tracking-widest uppercase mb-6">
            Soluções
          </h4>
          <ul className="space-y-3">
            {[
              "Registros Ambientais",
              "Proteção de Marcas",
              "Cadastros em Conselhos",
              "Holding Rural",
              "Consultoria Especializada",
              "Ações Agro Jurídicas",
            ].map((s) => (
              <li key={s}>
                <span className="font-sans text-white/50 hover:text-gold text-sm transition-colors cursor-default">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-serif text-white font-semibold text-sm tracking-widest uppercase mb-6">
            Fale Conosco
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              <span className="font-sans text-white/55 text-sm leading-relaxed">
                Av. Celina Ferreira Ottoni, 760 – Rezende
                <br />
                Varginha – MG, 37062-170
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-gold shrink-0" />
              <a
                href="tel:+5535998105327"
                className="font-sans text-white/55 hover:text-gold text-sm transition-colors"
              >
                (35) 9 9810-5327
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-gold shrink-0" />
              <a
                href="mailto:contato@agrofortes.com.br"
                className="font-sans text-white/55 hover:text-gold text-sm transition-colors"
              >
                contato@agrofortes.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-white/35 text-xs text-center md:text-left">
            AGROFORTES NUCLEO DE AGRONEGOCIOS LTDA &nbsp;|&nbsp; CNPJ:
            29.601.025/0001-22
          </p>
          <p className="font-sans text-white/35 text-xs">
            © {year} Agrofortes. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar onConsultarClick={() => setModalOpen(true)} />
      <HeroSection onConsultarClick={() => setModalOpen(true)} />
      <AboutSection onConsultarClick={() => setModalOpen(true)} />
      <VantagensSection />
      <ServicesSection onConsultarClick={() => setModalOpen(true)} />
      <CtaBanner onConsultarClick={() => setModalOpen(true)} />
      <Footer />
    </main>
  );
}
