"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { sendContactEmail } from "@/app/actions/sendEmail";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Captcha {
  num1: number;
  num2: number;
  answer: string;
}

function generateCaptcha(): Captcha {
  return {
    num1: Math.floor(Math.random() * 9) + 1,
    num2: Math.floor(Math.random() * 9) + 1,
    answer: "",
  };
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
  const [captchaError, setCaptchaError] = useState("");
  const [captcha, setCaptcha] = useState<Captcha>(generateCaptcha);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const firstInputRef = useRef<HTMLInputElement>(null);

  const resetCaptcha = useCallback(() => {
    setCaptcha({ ...generateCaptcha(), answer: "" });
    setCaptchaError("");
  }, []);

  // Bloqueia scroll do body e foca o primeiro campo ao abrir
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
    setCaptchaError("");

    // Validação do captcha
    const expected = captcha.num1 + captcha.num2;
    if (parseInt(captcha.answer) !== expected) {
      setCaptchaError("Resposta incorreta. Tente novamente.");
      resetCaptcha();
      return;
    }

    setStatus("loading");
    const result = await sendContactEmail(form);

    if (result.success) {
      setStatus("success");
      setForm({ nome: "", telefone: "", email: "", assunto: "", mensagem: "" });
      resetCaptcha();
    } else {
      setStatus("error");
      resetCaptcha();
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
                  <span>
                    Não foi possível enviar. Tente novamente ou ligue para (35) 9 9810-5327.
                  </span>
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

              {/* Captcha */}
              <div>
                <label className="block font-sans text-xs font-semibold text-forest/60 uppercase tracking-widest mb-1.5">
                  Verificação de segurança <span className="text-gold">*</span>
                </label>
                <div className="flex items-center gap-3">
                  {/* Caixa da pergunta */}
                  <div className="flex items-center gap-2 bg-forest px-5 py-3 shrink-0">
                    <span className="font-sans text-white font-semibold text-sm tracking-wide">
                      {captcha.num1} + {captcha.num2} =
                    </span>
                  </div>
                  {/* Campo de resposta */}
                  <input
                    type="number"
                    value={captcha.answer}
                    onChange={(e) =>
                      setCaptcha((prev) => ({ ...prev, answer: e.target.value }))
                    }
                    required
                    placeholder="?"
                    min="0"
                    max="99"
                    className="w-20 border border-forest/15 focus:border-gold focus:outline-none px-4 py-3 font-sans text-sm text-forest text-center placeholder:text-forest/30 transition-colors bg-cream-light [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  {/* Botão refresh */}
                  <button
                    type="button"
                    onClick={resetCaptcha}
                    className="p-2 text-forest/40 hover:text-gold transition-colors"
                    title="Gerar nova pergunta"
                  >
                    <RefreshCw size={16} />
                  </button>
                  {/* Erro inline */}
                  {captchaError && (
                    <span className="font-sans text-xs text-red-600">
                      {captchaError}
                    </span>
                  )}
                </div>
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
