import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    Check,
    Loader2,
    BarChart3,
    TrendingUp,
    Lock,
    MessageCircle,
    ShieldCheck,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";

const SECTORS = [
    { key: "clinica-estetica", label: "Clínica estética", min: 0.8, max: 1.5, text: "Pode aumentar marcações e tratamentos recorrentes." },
    { key: "clinica-dentaria", label: "Clínica dentária", min: 0.7, max: 1.3, text: "Pode aumentar consultas e tratamentos de maior valor." },
    { key: "imobiliaria", label: "Imobiliária", min: 0.8, max: 2.0, text: "Pode aumentar contactos de compradores e vendedores." },
    { key: "stand-automovel", label: "Stand automóvel", min: 0.6, max: 1.4, text: "Pode aumentar pedidos de contacto e visitas ao stand." },
    { key: "restaurante", label: "Restaurante", min: 0.5, max: 1.0, text: "Pode aumentar reservas e visitas." },
    { key: "ginasio", label: "Ginásio", min: 0.6, max: 1.2, text: "Pode aumentar inscrições e pedidos de aulas." },
    { key: "servicos-locais", label: "Serviços locais", min: 0.7, max: 1.5, text: "Pode aumentar pedidos de orçamento e contactos." },
    { key: "outro", label: "Outro", min: 0.6, max: 1.2, text: "Pode aumentar contactos qualificados." },
];

const VALUE_RANGES = [
    { key: "20-50", label: "20€ – 50€", value: 30 },
    { key: "50-100", label: "50€ – 100€", value: 75 },
    { key: "100-300", label: "100€ – 300€", value: 200 },
    { key: "300-500", label: "300€ – 500€", value: 400 },
    { key: "500-1000", label: "500€ – 1000€", value: 750 },
    { key: "1000+", label: "1000€+", value: 1000 },
];

const READINESS = [
    { key: "sim", label: "Sim" },
    { key: "nao", label: "Não" },
    { key: "depende", label: "Depende" },
];

const STEP_LABELS = [
    { id: 1, label: "Dados" },
    { id: 2, label: "Contacto" },
    { id: 3, label: "Análise" },
];

const INITIAL = {
    businessType: "",
    city: "",
    currentClients: "",
    valueRange: "",
    readiness: "",
    name: "",
    email: "",
    whatsapp: "",
    whatsappConsent: false,
};

function fmtEUR(n) {
    return new Intl.NumberFormat("pt-PT", {
        maximumFractionDigits: 0,
    }).format(Math.max(0, Math.round(n)));
}

export default function SimuladorCrescimentoClientes() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState(INITIAL);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const sector = useMemo(
        () => SECTORS.find((s) => s.key === form.businessType),
        [form.businessType]
    );

    const priceRange = useMemo(
        () => VALUE_RANGES.find((r) => r.key === form.valueRange),
        [form.valueRange]
    );

    const currentClients = Math.max(0, Number(form.currentClients) || 0);
    const averageClientValue = priceRange?.value || 0;

    const stats = useMemo(() => {
        if (!sector || !averageClientValue || !currentClients) return null;

        const currentRevenue = currentClients * averageClientValue;
        const minExtraClients = Math.round(currentClients * sector.min);
        const maxExtraClients = Math.round(currentClients * sector.max);
        const minLostRevenue = minExtraClients * averageClientValue;
        const maxLostRevenue = maxExtraClients * averageClientValue;
        const minTotalRevenue = currentRevenue + minLostRevenue;
        const maxTotalRevenue = currentRevenue + maxLostRevenue;

        return {
            currentRevenue,
            minExtraClients,
            maxExtraClients,
            minLostRevenue,
            maxLostRevenue,
            minTotalRevenue,
            maxTotalRevenue,
        };
    }, [sector, averageClientValue, currentClients]);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const validateStep1 = () => {
        if (!form.businessType) return "Escolha o tipo de negócio.";
        if (!form.city.trim()) return "Indique a cidade.";
        if (!form.currentClients || Number(form.currentClients) <= 0) return "Indique o número de clientes por mês.";
        if (!form.valueRange) return "Escolha o valor médio por cliente.";
        if (!form.readiness) return "Responda à última questão.";
        return "";
    };

    const validateStep2 = () => {
        if (!form.name.trim()) return "Indique o seu nome.";
        if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return "Email inválido.";
        return "";
    };

    const goToStep2 = () => {
        const err = validateStep1();
        if (err) return setError(err);
        setError("");
        setStep(2);
    };

    const buildPayload = () => ({
        name: form.name.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim() || null,
        whatsappConsent: !!form.whatsappConsent,
        businessType: sector?.label || null,
        city: form.city.trim(),
        currentClients,
        averageClientValueRange: priceRange?.label || null,
        averageClientValue,
        readiness: READINESS.find((r) => r.key === form.readiness)?.label || null,
        currentRevenue: stats?.currentRevenue ?? null,
        minExtraClients: stats?.minExtraClients ?? null,
        maxExtraClients: stats?.maxExtraClients ?? null,
        minLostRevenue: stats?.minLostRevenue ?? null,
        maxLostRevenue: stats?.maxLostRevenue ?? null,
        minTotalRevenue: stats?.minTotalRevenue ?? null,
        maxTotalRevenue: stats?.maxTotalRevenue ?? null,
        source: "lead_growth_simulator",
        submittedAt: new Date().toISOString(),
    });

    const submit = async () => {
        const err = validateStep2();
        if (err) return setError(err);

        setError("");
        setSubmitting(true);

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload()),
            });

            if (!response.ok) {
                throw new Error(`Lead API failed with status ${response.status}`);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
            setStep(3);
        }
    };

    const resetSimulator = () => {
        setForm(INITIAL);
        setError("");
        setStep(1);
    };

    const whatsappUrl = useMemo(() => {
        if (!stats || !sector) return `https://wa.me/${WHATSAPP_NUMBER}`;

        const lines = [
            `Olá, sou ${form.name.trim() || "—"}.`,
            `Email: ${form.email.trim() || "—"}`,
            `WhatsApp: ${form.whatsapp.trim() || "—"}`,
            `Negócio: ${sector.label} em ${form.city.trim() || "—"}`,
            "",
            `Clientes atuais: ${currentClients}/mês`,
            `Faturação atual: ~${fmtEUR(stats.currentRevenue)}€/mês`,
            "",
            `Potencial adicional: +${stats.minExtraClients} a ${stats.maxExtraClients} clientes/mês`,
            `Faturação potencial: ${fmtEUR(stats.minTotalRevenue)}€ a ${fmtEUR(stats.maxTotalRevenue)}€/mês`,
            "",
            "Fiz a simulação no site e quero captar mais clientes.",
        ];

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    }, [stats, sector, form, currentClients]);

    const progress = ((step - 1) / (STEP_LABELS.length - 1)) * 100;

    return (
        <section id="simulador" data-testid="simulator-section" className="relative py-24 md:py-28 bg-[#F8FAFC] border-y border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                        <BarChart3 className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Simulador de crescimento
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                        Veja em 30 segundos quantos clientes pode estar a perder
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-[#64748B] leading-relaxed">
                        Simulação gratuita baseada nos dados do seu negócio.
                    </p>
                </div>

                <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-10 md:p-12" data-testid="simulator-card">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            {STEP_LABELS.map((s, i) => {
                                const isDone = step > s.id;
                                const isActive = step === s.id;

                                return (
                                    <div key={s.id} className="flex items-center gap-2" data-testid={`sim-step-indicator-${s.id}`}>
                                        <div className={`w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-all duration-200 ${isDone || isActive ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"}`}>
                                            {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.id}
                                        </div>
                                        <span className={`hidden sm:inline text-xs font-medium ${isActive ? "text-[#0A0A0A]" : "text-[#64748B]"}`}>
                                            {s.label}
                                        </span>
                                        {i < STEP_LABELS.length - 1 && <div className="hidden sm:block ml-2 w-10 h-px bg-[#E2E8F0]" />}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="h-1 rounded-full bg-[#E2E8F0] overflow-hidden">
                            <motion.div className="h-full bg-[#2563EB]" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} data-testid="sim-progress-bar" />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} data-testid="sim-step-1">
                                <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">Passo 1 de 3</div>
                                <h3 className="mt-1 text-xl font-bold text-[#0A0A0A] tracking-tight">Dados do seu negócio</h3>

                                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="Tipo de negócio *"
                                        name="businessType"
                                        value={form.businessType}
                                        onChange={onChange}
                                        testid="sim-business-type"
                                        options={[{ value: "", label: "Escolha um setor…" }, ...SECTORS.map((s) => ({ value: s.key, label: s.label }))]}
                                    />
                                    <Input label="Cidade *" name="city" value={form.city} onChange={onChange} placeholder="Ex: Lisboa" testid="sim-city" />
                                    <Input label="Clientes atuais por mês *" name="currentClients" type="number" min="0" value={form.currentClients} onChange={onChange} placeholder="Ex: 15" testid="sim-current-clients" />
                                    <Select
                                        label="Valor médio por cliente *"
                                        name="valueRange"
                                        value={form.valueRange}
                                        onChange={onChange}
                                        testid="sim-value-range"
                                        options={[{ value: "", label: "Escolha um intervalo…" }, ...VALUE_RANGES.map((r) => ({ value: r.key, label: r.label }))]}
                                    />
                                </div>

                                <div className="mt-6">
                                    <label className="block text-xs font-medium text-[#475569] mb-2">
                                        Consegue lidar com mais clientes neste momento? *
                                    </label>
                                    <div className="flex flex-wrap gap-2" data-testid="sim-readiness">
                                        {READINESS.map((r) => {
                                            const active = form.readiness === r.key;
                                            return (
                                                <button key={r.key} type="button" onClick={() => setForm((f) => ({ ...f, readiness: r.key }))} data-testid={`sim-readiness-${r.key}`} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${active ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#334155] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"}`}>
                                                    {r.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {error && <ErrorText text={error} />}

                                <div className="mt-8 flex justify-end">
                                    <button type="button" onClick={goToStep2} data-testid="sim-step1-next" className="btn btn-primary px-8 py-4 text-lg">
                                        Ver quantos clientes pode ganhar
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} data-testid="sim-step-2">
                                <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">Passo 2 de 3</div>
                                <h3 className="mt-1 text-xl font-bold text-[#0A0A0A] tracking-tight">Desbloqueie a sua análise</h3>

                                {stats && (
                                    <div className="mt-5 relative rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6 overflow-hidden" data-testid="sim-preview">
                                        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#64748B] uppercase tracking-widest">
                                            <Lock className="w-3 h-3" />
                                            Parcial
                                        </div>
                                        <div className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">Pré-visualização</div>
                                        <div className="mt-2 text-xl md:text-2xl font-bold text-[#0A0A0A] tracking-tight leading-snug">
                                            Pode estar a perder até <span className="text-[#2563EB]">~{fmtEUR(stats.maxLostRevenue)}€/mês</span> no seu negócio
                                        </div>
                                        <p className="mt-2 text-sm text-[#64748B]">Desbloqueie a análise completa para ver a estimativa detalhada.</p>
                                    </div>
                                )}

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Nome *" name="name" value={form.name} onChange={onChange} placeholder="O seu nome" testid="sim-name" />
                                    <Input label="Email *" name="email" type="email" value={form.email} onChange={onChange} placeholder="geral@exemplo.com" testid="sim-email" />
                                    <div className="md:col-span-2">
                                        <Input label="WhatsApp (opcional)" name="whatsapp" value={form.whatsapp} onChange={onChange} placeholder="Ex: 912 345 678" testid="sim-whatsapp" />
                                    </div>
                                </div>

                                <label className="mt-4 flex items-start gap-3 cursor-pointer select-none" data-testid="sim-consent">
                                    <input type="checkbox" name="whatsappConsent" checked={form.whatsappConsent} onChange={onChange} className="mt-0.5 w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]/30" />
                                    <span className="text-sm text-[#475569] leading-relaxed">Autorizo contacto via WhatsApp sobre a minha análise.</span>
                                </label>

                                {error && <ErrorText text={error} />}

                                <div className="mt-8 flex items-center justify-between gap-3">
                                    <button type="button" onClick={() => { setError(""); setStep(1); }} data-testid="sim-step2-back" className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors">
                                        <ArrowLeft className="w-4 h-4" />
                                        Voltar
                                    </button>
                                    <button type="button" onClick={submit} disabled={submitting} data-testid="sim-submit" className="btn btn-primary px-8 py-4 text-lg">
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                A enviar…
                                            </>
                                        ) : (
                                            <>
                                                Desbloquear análise completa
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && stats && sector && (
                            <motion.div key="s3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} data-testid="sim-step-3">
                                <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">Passo 3 de 3</div>
                                <h3 className="mt-1 text-xl font-bold text-[#0A0A0A] tracking-tight">A sua análise</h3>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResultCard label="Situação atual" testid="sim-result-current">
                                        <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">{currentClients} clientes/mês</div>
                                        <div className="mt-1 text-sm text-[#64748B]">~{fmtEUR(stats.currentRevenue)}€/mês em faturação</div>
                                    </ResultCard>

                                    <ResultCard label="Crescimento possível" testid="sim-result-growth" accent>
                                        <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">+{stats.minExtraClients} a {stats.maxExtraClients} clientes/mês</div>
                                        <div className="mt-1 text-sm text-[#64748B]">Pode praticamente duplicar o volume atual. {sector.text}</div>
                                    </ResultCard>

                                    <ResultCard label="Novo nível de faturação" testid="sim-result-new-level">
                                        <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">{fmtEUR(stats.minTotalRevenue)}€ a {fmtEUR(stats.maxTotalRevenue)}€/mês</div>
                                    </ResultCard>

                                    <ResultCard label="Perda estimada" testid="sim-result-loss">
                                        <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">{fmtEUR(stats.minLostRevenue)}€ a {fmtEUR(stats.maxLostRevenue)}€/mês</div>
                                        <div className="mt-1 text-sm text-[#64748B]">não captados atualmente.</div>
                                    </ResultCard>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoRow icon={TrendingUp} title="Contexto" text={`Parte desta procura em ${form.city.trim() || "a sua cidade"} está a ser captada por concorrentes neste momento.`} />
                                    <InfoRow icon={BarChart3} title="Como chegamos a este valor" text="Este potencial vem de procura já existente no Google que não está a ser aproveitada." />
                                </div>

                                <div className="mt-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 flex items-start gap-3">
                                    <ShieldCheck className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                                    <p className="text-xs text-[#475569] leading-relaxed">Estimativa baseada nos dados introduzidos, na procura local no Google e em campanhas reais de negócios semelhantes em Portugal.</p>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <button type="button" onClick={resetSimulator} data-testid="sim-reset" className="btn btn-ghost px-6 py-3 text-base">
                                        <ArrowLeft className="w-4 h-4" />
                                        Nova simulação
                                    </button>
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-testid="sim-final-cta" className="btn btn-whatsapp px-6 py-3 text-base">
                                        <MessageCircle className="w-4 h-4" />
                                        Quero captar mais clientes no meu negócio
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function Input({ label, name, value, onChange, type = "text", placeholder, min, testid }) {
    return (
        <div>
            <label className="block text-xs font-medium text-[#475569] mb-1.5">{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} min={min} data-testid={testid} className="w-full rounded-lg border border-[#E2E8F0] bg-white px-5 py-3.5 text-base text-[#0A0A0A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-colors" />
        </div>
    );
}

function Select({ label, name, value, onChange, options, testid }) {
    return (
        <div>
            <label className="block text-xs font-medium text-[#475569] mb-1.5">{label}</label>
            <select name={name} value={value} onChange={onChange} data-testid={testid} className="w-full rounded-lg border border-[#E2E8F0] bg-white px-5 py-3.5 text-base text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-colors">
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

function ErrorText({ text }) {
    return <div className="mt-4 text-sm text-[#B91C1C] bg-red-50 border border-red-100 rounded-md px-3 py-2" data-testid="sim-error">{text}</div>;
}

function ResultCard({ label, children, accent = false, testid }) {
    return (
        <div className={`rounded-xl p-5 md:p-6 border transition-colors ${accent ? "bg-white border-[#2563EB]/30 shadow-sm" : "bg-white border-[#E2E8F0]"}`} data-testid={testid}>
            <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-widest">{label}</div>
            <div className="mt-2">{children}</div>
        </div>
    );
}

function InfoRow({ icon: Icon, title, text }) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 md:p-5">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
                <div className="text-sm font-semibold text-[#0A0A0A]">{title}</div>
                <p className="mt-0.5 text-sm text-[#64748B] leading-relaxed">{text}</p>
            </div>
        </div>
    );
}
