"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions/sendEmail";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const assuntos = [
  "Registros Ambientais",
  "Proteção de Marcas",
  "Cadastros em Conselhos",
  "Holding Rural",
  "Consultoria Especializada",
  "Ações Agro Jurídicas",
  "Outro assunto",
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Foca o primeiro campo ao abrir; bloqueia scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Fecha com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await sendContactEmail(form);
    if (result.success) {
      setStatus("success");
      setForm({ nome: "", telefone: "", email: "", assunto: "", mensagem: "" });
    } else {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-white shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-forest px-8 py-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-white text-xl font-semibold">
              Fale com um Especialista
            </h2>
            <p className="font-sans text-white/50 text-xs mt-1 tracking-wide">
              Responderemos em até 24 horas úteis
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-gold shrink-0" />

        {/* Content */}
        <div className="overflow-y-auto">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mb-5">
                <CheckCircle size={32} className="text-forest" />
              </div>
              <h3 className="font-serif text-forest text-2xl font-semibold mb-3">
                Mensagem enviada!
              </h3>
              <p className="font-sans text-forest/60 text-sm leading-relaxed max-w-xs">
                Recebemos o seu contato. Nossa equipe retornará em breve pelo
                e-mail ou telefone informado.
              </p>
              <button
                onClick={onClose}
                className="mt-8 font-sans text-sm font-medium px-8 py-3 bg-forest text-white hover:bg-forest-light transition-colors tracking-wide"
              >
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
              {status === "error" && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>Não foi possível enviar. Tente novamente ou ligue para (35) 9 9810-5327.</span>
                </div>
              )}

              {/* Nome */}
              <div>
                <label className="block font-sans text-xs font-semibold text-forest/60 uppercase tracking-widest mb-1.5">
                  Nome completo <span className="text-gold">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  placeholder="Ex: João da Silva"
                  className="w-full border border-forest/15 focus:border-gold focus:outline-none px-4 py-3 font-sans text-sm text-forest placeholder:text-forest/30 transition-colors bg-cream-light"
                />
              </div>

              {/* Telefone + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-forest/60 uppercase tracking-widest mb-1.5">
                    WhatsApp <span className="text-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    required
                    placeholder="(35) 9 9999-9999"
                    className="w-full border border-forest/15 focus:border-gold focus:outline-none px-4 py-3 font-sans text-sm text-forest placeholder:text-forest/30 transition-colors bg-cream-light"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold text-forest/60 uppercase tracking-widest mb-1.5">
                    E-mail <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className="w-full border border-forest/15 focus:border-gold focus:outline-none px-4 py-3 font-sans text-sm text-forest placeholder:text-forest/30 transition-colors bg-cream-light"
                  />
                </div>
              </div>

              {/* Assunto */}
              <div>
                <label className="block font-sans text-xs font-semibold text-forest/60 uppercase tracking-widest mb-1.5">
                  Assunto <span className="text-gold">*</span>
                </label>
                <select
                  name="assunto"
                  value={form.assunto}
                  onChange={handleChange}
                  required
                  className="w-full border border-forest/15 focus:border-gold focus:outline-none px-4 py-3 font-sans text-sm text-forest transition-colors bg-cream-light appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecione um serviço...</option>
                  {assuntos.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block font-sans text-xs font-semibold text-forest/60 uppercase tracking-widest mb-1.5">
                  Mensagem <span className="text-gold">*</span>
                </label>
                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Conte brevemente sobre o que você precisa..."
                  className="w-full border border-forest/15 focus:border-gold focus:outline-none px-4 py-3 font-sans text-sm text-forest placeholder:text-forest/30 transition-colors resize-none bg-cream-light"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full flex items-center justify-center gap-3 bg-forest hover:bg-forest-light disabled:opacity-60 text-white font-sans font-semibold text-sm tracking-wide py-4 transition-colors duration-300 mt-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={15} className="text-gold" />
                    Enviar Mensagem
                  </>
                )}
              </button>

              <p className="font-sans text-forest/35 text-xs text-center pb-2">
                Ao enviar, você concorda em ser contatado pela nossa equipe.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
