import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
    Loader2,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    Check,
    MessageCircle,
    RotateCcw,
} from "lucide-react";
import { openWhatsApp } from "../lib/whatsapp";

const SECTORS = [
    "Clínica Dentária",
    "Clínica Estética",
    "Imobiliária",
    "Stand Automóvel",
    "Restaurante",
    "Advocacia",
    "Ginásio",
    "Serviços Locais",
    "Comércio Local",
    "Outro",
];

const INITIAL = {
    name: "",
    email: "",
    city: "",
    sector: "",
};

const STEPS = [
    { id: 1, label: "Identificação" },
    { id: 2, label: "Negócio" },
    { id: 3, label: "Confirmar" },
];

export default function ContactForm() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState(INITIAL);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validateStep = (s) => {
        if (s === 1) {
            if (!form.name.trim()) return "Indica o teu nome.";
            if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
                return "Email inválido.";
            }
        }

        if (s === 2) {
            if (!form.city.trim()) return "Indica a tua cidade.";
            if (!form.sector) return "Escolhe um setor.";
        }

        return null;
    };

    const next = () => {
        const err = validateStep(step);

        if (err) {
            toast.error(err);
            return;
        }

        setStep((s) => Math.min(3, s + 1));
    };

    const back = () => setStep((s) => Math.max(1, s - 1));

    const onSubmit = async () => {
        const err = validateStep(1) || validateStep(2);

        if (err) {
            toast.error(err);
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    city: form.city,
                    sector: form.sector,
                    source: "geraclientes-form",
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) {
                throw new Error(`API ERROR ${res.status}`);
            }

            if (typeof window !== "undefined" && typeof window.gtag === "function") {
                window.gtag("event", "conversion", {
                    send_to: "AW-18127989211/d9BgCMDY3qQcENvTjMRD",
                    value: 1.0,
                    currency: "EUR",
                });
            }

            setSubmitted(true);

            toast.success(
                "Pedido recebido com sucesso. Se quiseres acelerar, fala connosco no WhatsApp."
            );
        } catch (error) {
            console.error("Lead submission error:", error);
            toast.error("Erro ao enviar pedido. Tenta novamente.");
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setForm(INITIAL);
        setStep(1);
        setSubmitted(false);
    };

    const progress = ((step - 1) / (STEPS.length - 1)) * 100;

    return (
        <section
            id="contacto"
            data-testid="contact-section"
            className="relative py-20 md:py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]"
        >
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Contacto direto
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                            Vamos verificar se a tua zona está disponível
                        </h2>

                        <p className="mt-4 text-base text-[#64748B] leading-relaxed">
                            Trabalhamos apenas com 1 cliente por zona e setor para garantir
                            resultados. Responde em 3 passos rápidos.
                        </p>

                        <ul className="mt-8 space-y-3 text-sm text-[#334155]">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2" />
                                Resposta no mesmo dia útil
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2" />
                                Análise da zona e concorrência incluída
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2" />
                                Sem compromisso e sem custo
                            </li>
                        </ul>

                        <button
                            type="button"
                            onClick={() =>
                                openWhatsApp({
                                    template: "agency",
                                    name: form.name,
                                    email: form.email,
                                    niche: form.sector,
                                    city: form.city,
                                })
                            }
                            data-testid="contact-whatsapp-button"
                            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#16A34A] hover:text-[#15803D] transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Preferes WhatsApp? Fala diretamente connosco
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] p-8 md:p-10 shadow-sm"
                        data-testid="contact-form"
                    >
                        {!submitted && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    {STEPS.map((s, i) => {
                                        const isDone = step > s.id;
                                        const isActive = step === s.id;

                                        return (
                                            <div key={s.id} className="flex items-center gap-2">
                                                <div
                                                    className={`w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-all duration-200 ${isDone || isActive
                                                        ? "bg-[#2563EB] text-white"
                                                        : "bg-[#E2E8F0] text-[#94A3B8]"
                                                        }`}
                                                >
                                                    {isDone ? (
                                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                    ) : (
                                                        s.id
                                                    )}
                                                </div>

                                                <span
                                                    className={`hidden sm:inline text-xs font-medium ${isActive ? "text-[#0A0A0A]" : "text-[#64748B]"
                                                        }`}
                                                >
                                                    {s.label}
                                                </span>

                                                {i < STEPS.length - 1 && (
                                                    <div className="hidden sm:block ml-2 w-8 h-px bg-[#E2E8F0]" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="h-1 rounded-full bg-[#E2E8F0] overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#2563EB]"
                                        initial={false}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        )}

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="py-6 text-center"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mx-auto">
                                    <Check className="w-7 h-7" strokeWidth={2.5} />
                                </div>

                                <h3 className="mt-5 text-2xl font-bold text-[#0A0A0A] tracking-tight">
                                    Pedido recebido
                                </h3>

                                <p className="mt-3 text-[15px] text-[#475569] max-w-md mx-auto leading-relaxed">
                                    Obrigado, <strong>{form.name.split(" ")[0]}</strong>. Já temos
                                    os teus dados. Se quiseres acelerar, fala connosco no WhatsApp.
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openWhatsApp({
                                                template: "agency",
                                                name: form.name,
                                                email: form.email,
                                                niche: form.sector,
                                                city: form.city,
                                            })
                                        }
                                        className="btn btn-whatsapp btn-lg"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Falar no WhatsApp
                                    </button>

                                    <button type="button" onClick={resetForm} className="btn btn-ghost">
                                        <RotateCcw className="w-4 h-4" />
                                        Começar de novo
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step-1"
                                            initial={{ opacity: 0, x: 12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -12 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
                                                Passo 1 de 3
                                            </div>

                                            <h3 className="mt-1 text-xl font-bold text-[#0A0A0A] tracking-tight">
                                                Como te chamas?
                                            </h3>

                                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Field
                                                    label="Nome *"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={onChange}
                                                    placeholder="O teu nome"
                                                />

                                                <Field
                                                    label="Email *"
                                                    name="email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={onChange}
                                                    placeholder="[email protected]"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step-2"
                                            initial={{ opacity: 0, x: 12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -12 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
                                                Passo 2 de 3
                                            </div>

                                            <h3 className="mt-1 text-xl font-bold text-[#0A0A0A] tracking-tight">
                                                Conta-nos sobre o teu negócio
                                            </h3>

                                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Field
                                                    label="Cidade *"
                                                    name="city"
                                                    value={form.city}
                                                    onChange={onChange}
                                                    placeholder="Ex: Lisboa"
                                                />

                                                <SelectField
                                                    label="Setor *"
                                                    name="sector"
                                                    value={form.sector}
                                                    onChange={onChange}
                                                    options={[
                                                        { value: "", label: "Escolhe um setor…" },
                                                        ...SECTORS.map((s) => ({ value: s, label: s })),
                                                    ]}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step-3"
                                            initial={{ opacity: 0, x: 12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -12 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
                                                Passo 3 de 3
                                            </div>

                                            <h3 className="mt-1 text-xl font-bold text-[#0A0A0A] tracking-tight">
                                                Tudo pronto. Confirma e envia.
                                            </h3>

                                            <dl className="mt-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] divide-y divide-[#E2E8F0]">
                                                <SummaryRow label="Nome" value={form.name} />
                                                <SummaryRow label="Email" value={form.email} />
                                                <SummaryRow label="Cidade" value={form.city} />
                                                <SummaryRow label="Setor" value={form.sector} />
                                            </dl>

                                            <p className="mt-4 text-xs text-[#64748B]">
                                                Ao enviar aceitas ser contactado pela GeraClientes
                                                sobre o teu pedido.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="mt-8 flex items-center justify-between gap-3">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={back}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Voltar
                                        </button>
                                    ) : (
                                        <span />
                                    )}

                                    {step < 3 ? (
                                        <button type="button" onClick={next} className="btn btn-primary btn-lg px-8 py-4">
                                            Continuar
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={onSubmit}
                                            disabled={submitting}
                                            className="btn btn-primary btn-lg"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    A enviar…
                                                </>
                                            ) : (
                                                <>
                                                    Verificar disponibilidade
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Field({ label, name, value, onChange, type = "text", placeholder }) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#475569] mb-1.5">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3.5 text-base text-[#0A0A0A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-colors"
            />
        </div>
    );
}

function SelectField({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="block text-xs font-medium text-[#475569] mb-1.5">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-colors"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-xs font-medium text-[#64748B] uppercase tracking-widest">
                {label}
            </dt>

            <dd className="text-sm font-medium text-[#0A0A0A] text-right">
                {value || <span className="text-[#94A3B8]">—</span>}
            </dd>
        </div>
    );
}
