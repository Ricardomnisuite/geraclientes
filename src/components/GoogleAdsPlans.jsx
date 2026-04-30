import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Share2, Globe, ArrowRight, Star } from "lucide-react";
import { openWhatsApp } from "../lib/whatsapp";

const BILLING_OPTIONS = [
    { id: "1m", label: "1 mês", months: 1, discount: 0 },
    { id: "3m", label: "3 meses", months: 3, discount: 0.1 },
    { id: "6m", label: "6 meses", months: 6, discount: 0.2 },
];

const PLANS = [
    {
        id: "arranque",
        name: "Arranque",
        tagline: "Ideal para começar com foco local",
        monthly: 249,
        features: [
            "Criação e configuração da conta Google Ads",
            "1 campanha de pesquisa local optimizada",
            "Palavras-chave com intenção de compra",
            "Extensões de chamada e localização",
            "Relatório mensal simples",
        ],
        highlight: false,
    },
    {
        id: "crescimento",
        name: "Crescimento",
        tagline: "Para quem quer escalar leads de forma previsível",
        monthly: 399,
        features: [
            "Tudo do plano Arranque",
            "Até 3 campanhas (pesquisa + display)",
            "Otimização semanal com testes A/B",
            "Landing page dedicada incluída",
            "Tracking completo de chamadas e formulários",
            "Relatórios quinzenais + reunião estratégica",
        ],
        highlight: true,
    },
    {
        id: "escala",
        name: "Escala",
        tagline: "Campanhas multi-zona para negócios em expansão",
        monthly: 699,
        features: [
            "Tudo do plano Crescimento",
            "Campanhas multi-zona ou multi-loja",
            "Remarketing avançado e públicos custom",
            "Integração CRM e automação de leads",
            "Otimização diária por especialista",
            "Account manager dedicado",
        ],
        highlight: false,
    },
];

const UPSELLS = [
    {
        id: "redes",
        icon: Share2,
        name: "Gestão de Redes Sociais",
        price: 199,
        originalPrice: 299,
        unit: "/mês",
        badge: "Preço exclusivo para clientes Google Ads",
        description: "Conteúdo estratégico e consistente em Instagram e Facebook.",
        recurring: true,
    },
    {
        id: "website",
        icon: Globe,
        name: "Website Visual Premium",
        price: 299,
        originalPrice: 399,
        unit: "pagamento único",
        badge: "Pagamento único com desconto",
        description: "Website profissional e otimizado para converter visitas em leads.",
        recurring: false,
    },
];

function fmtPrice(n) {
    return new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 }).format(n);
}

export default function GoogleAdsPlans() {
    const [billingId, setBillingId] = useState("3m");
    const [selectedUpsells, setSelectedUpsells] = useState({ redes: false, website: false });

    const billing = useMemo(
        () => BILLING_OPTIONS.find((b) => b.id === billingId),
        [billingId]
    );

    const toggleUpsell = (id) =>
        setSelectedUpsells((s) => ({ ...s, [id]: !s[id] }));

    const computePricing = (plan) => {
        const monthly = Math.round(plan.monthly * (1 - billing.discount));
        const total = monthly * billing.months;
        const savings = plan.monthly * billing.months - total;
        return { monthly, total, savings };
    };

    // Real-time dynamic total that reflects selected upsells.
    // Returns either { mode: "monthly", monthly } or { mode: "today-after", today, after }
    const computeTotals = (planMonthly) => {
        const socialMonthly = selectedUpsells.redes ? 199 : 0;
        const websiteOneTime = selectedUpsells.website ? 299 : 0;

        const baseMonthly = planMonthly + socialMonthly;

        if (websiteOneTime > 0) {
            return {
                mode: "today-after",
                today: baseMonthly + websiteOneTime,
                after: baseMonthly,
            };
        }
        return { mode: "monthly", monthly: baseMonthly };
    };

    const activeServiceNames = Object.entries(selectedUpsells)
        .filter(([, v]) => v)
        .map(([k]) =>
            k === "redes" ? "Gestão de Redes Sociais" : "Website Visual Premium"
        );

    return (
        <section
            id="google-ads"
            data-testid="google-ads-section"
            className="relative py-20 md:py-24"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Planos Google Ads
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                        Escolhe o plano certo para o teu ritmo de crescimento
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-[#64748B] leading-relaxed">
                        Compromissos curtos, descontos reais em contratos mais longos.
                        Sem fidelizações abusivas.
                    </p>
                </motion.div>

                {/* Billing selector */}
                <div className="mt-10 flex justify-center">
                    <div
                        className="inline-flex items-center gap-1 p-1 rounded-full border border-[#E2E8F0] bg-white shadow-sm"
                        data-testid="billing-selector"
                    >
                        {BILLING_OPTIONS.map((b) => (
                            <button
                                key={b.id}
                                type="button"
                                onClick={() => setBillingId(b.id)}
                                data-testid={`billing-option-${b.id}`}
                                className={`relative px-4 md:px-5 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-200 ${
                                    billingId === b.id
                                        ? "bg-[#2563EB] text-white shadow-sm"
                                        : "text-[#475569] hover:text-[#2563EB]"
                                }`}
                            >
                                {b.label}
                                {b.discount > 0 && (
                                    <span
                                        className={`ml-1.5 text-[10px] font-semibold ${
                                            billingId === b.id ? "text-white/80" : "text-[#2563EB]"
                                        }`}
                                    >
                                        -{Math.round(b.discount * 100)}%
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Plans */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 items-start">
                    {PLANS.map((plan, i) => {
                        const pricing = computePricing(plan);
                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className={`relative rounded-2xl p-7 md:p-8 transition-all duration-200 ${
                                    plan.highlight
                                        ? "pt-9 md:pt-10 text-white shadow-xl lg:-translate-y-2"
                                        : "bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md"
                                }`}
                                style={
                                    plan.highlight
                                        ? {
                                              background:
                                                  "linear-gradient(155deg, #2563EB 0%, #1D4ED8 55%, #1E40AF 100%)",
                                              boxShadow:
                                                  "0 25px 50px -12px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(37, 99, 235, 0.15)",
                                          }
                                        : undefined
                                }
                                data-testid={`plan-card-${plan.id}`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#2563EB] text-[11px] font-semibold uppercase tracking-widest"
                                        style={{
                                            boxShadow:
                                                "0 6px 14px -6px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(37, 99, 235, 0.08)",
                                        }}
                                    >
                                        <Star className="w-3 h-3 fill-[#2563EB]" />
                                        Mais escolhido
                                    </div>
                                )}

                                <h3
                                    className={`text-xl font-bold tracking-tight ${
                                        plan.highlight ? "text-white" : "text-[#0A0A0A]"
                                    }`}
                                >
                                    {plan.name}
                                </h3>
                                <p
                                    className={`mt-1.5 text-sm leading-relaxed ${
                                        plan.highlight ? "text-white/70" : "text-[#64748B]"
                                    }`}
                                >
                                    {plan.tagline}
                                </p>

                                <div className="mt-6">
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            className={`text-4xl md:text-5xl font-bold tracking-tighter ${
                                                plan.highlight ? "text-white" : "text-[#0A0A0A]"
                                            }`}
                                        >
                                            €{fmtPrice(pricing.monthly)}
                                        </span>
                                        <span
                                            className={`text-sm font-medium ${
                                                plan.highlight ? "text-white/60" : "text-[#64748B]"
                                            }`}
                                        >
                                            /mês
                                        </span>
                                    </div>
                                    <div
                                        className={`mt-1 text-xs ${
                                            plan.highlight ? "text-white/60" : "text-[#64748B]"
                                        }`}
                                        data-testid={`plan-${plan.id}-total`}
                                    >
                                        Total {billing.label}: €{fmtPrice(pricing.total)}
                                        {pricing.savings > 0 && (
                                            <span
                                                className={`ml-2 font-semibold ${
                                                    plan.highlight
                                                        ? "text-[#93C5FD]"
                                                        : "text-[#2563EB]"
                                                }`}
                                            >
                                                Poupa €{fmtPrice(pricing.savings)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic total — reflects selected upsells in real time */}
                                {(() => {
                                    const totals = computeTotals(pricing.monthly);
                                    const hasUpsells =
                                        selectedUpsells.redes || selectedUpsells.website;
                                    return (
                                        <div
                                            className={`mt-5 rounded-xl px-4 py-3 transition-colors ${
                                                plan.highlight
                                                    ? "bg-white/10 border border-white/10"
                                                    : "bg-[#F8FAFC] border border-[#E2E8F0]"
                                            }`}
                                            data-testid={`plan-${plan.id}-dynamic-total`}
                                        >
                                            <div
                                                className={`text-[10px] font-semibold uppercase tracking-widest ${
                                                    plan.highlight ? "text-white/60" : "text-[#64748B]"
                                                }`}
                                            >
                                                {hasUpsells ? "Valor estimado" : "Total"}
                                            </div>
                                            {totals.mode === "monthly" ? (
                                                <div
                                                    className={`mt-0.5 text-2xl font-bold tracking-tight tabular-nums ${
                                                        plan.highlight ? "text-white" : "text-[#0A0A0A]"
                                                    }`}
                                                >
                                                    €{fmtPrice(totals.monthly)}
                                                    <span
                                                        className={`text-sm font-medium ml-1 ${
                                                            plan.highlight
                                                                ? "text-white/60"
                                                                : "text-[#64748B]"
                                                        }`}
                                                    >
                                                        /mês
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="mt-0.5 flex items-baseline gap-3 flex-wrap">
                                                    <div
                                                        className={`text-2xl font-bold tracking-tight tabular-nums ${
                                                            plan.highlight ? "text-white" : "text-[#0A0A0A]"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`text-[10px] font-semibold uppercase tracking-widest mr-1 ${
                                                                plan.highlight
                                                                    ? "text-[#93C5FD]"
                                                                    : "text-[#2563EB]"
                                                            }`}
                                                        >
                                                            Hoje
                                                        </span>
                                                        €{fmtPrice(totals.today)}
                                                    </div>
                                                    <div
                                                        className={`text-sm font-medium tabular-nums ${
                                                            plan.highlight ? "text-white/70" : "text-[#475569]"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`text-[10px] font-semibold uppercase tracking-widest mr-1 ${
                                                                plan.highlight
                                                                    ? "text-white/50"
                                                                    : "text-[#94A3B8]"
                                                            }`}
                                                        >
                                                            Depois
                                                        </span>
                                                        €{fmtPrice(totals.after)}/mês
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}

                                <button
                                    type="button"
                                    onClick={() => {
                                        const totals = computeTotals(pricing.monthly);
                                        const estimated =
                                            totals.mode === "monthly"
                                                ? totals.monthly
                                                : totals.today;
                                        openWhatsApp({
                                            plan: plan.name,
                                            billing: billing.label,
                                            services: activeServiceNames,
                                            estimatedValue: estimated,
                                        });
                                    }}
                                    data-testid={`plan-${plan.id}-cta`}
                                    className={
                                        plan.highlight
                                            ? "mt-6 w-full btn btn-on-blue"
                                            : "mt-6 w-full btn btn-primary"
                                    }
                                >
                                    Verificar Disponibilidade
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <div
                                    className={`my-6 h-px ${
                                        plan.highlight ? "bg-white/10" : "bg-[#E2E8F0]"
                                    }`}
                                />

                                <ul className="space-y-3">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5">
                                            <div
                                                className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                    plan.highlight
                                                        ? "bg-[#2563EB]/20 text-[#93C5FD]"
                                                        : "bg-[#2563EB]/10 text-[#2563EB]"
                                                }`}
                                            >
                                                <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                            </div>
                                            <span
                                                className={`text-sm leading-relaxed ${
                                                    plan.highlight ? "text-white/80" : "text-[#334155]"
                                                }`}
                                            >
                                                {f}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Upsells */}
                <div className="mt-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-[#E2E8F0]" />
                        <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
                            Adicionar ao plano
                        </h3>
                        <div className="flex-1 h-px bg-[#E2E8F0]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {UPSELLS.map((u) => {
                            const active = selectedUpsells[u.id];
                            const Icon = u.icon;
                            return (
                                <button
                                    key={u.id}
                                    type="button"
                                    onClick={() => toggleUpsell(u.id)}
                                    data-testid={`upsell-card-${u.id}`}
                                    className={`text-left rounded-2xl border p-6 md:p-7 transition-all duration-200 hover:shadow-md ${
                                        active
                                            ? "border-[#2563EB] bg-[#2563EB]/[0.03] shadow-md"
                                            : "border-[#E2E8F0] bg-white shadow-sm hover:-translate-y-0.5"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                    active
                                                        ? "bg-[#2563EB] text-white"
                                                        : "bg-[#F8FAFC] text-[#0A0A0A] border border-[#E2E8F0]"
                                                }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-base font-semibold text-[#0A0A0A]">
                                                    {u.name}
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded">
                                                    {u.badge}
                                                </div>
                                                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                                                    {u.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-xs text-[#94A3B8] line-through">
                                                €{u.originalPrice}
                                            </div>
                                            <div className="text-xl font-bold text-[#0A0A0A] tracking-tight">
                                                +€{u.price}
                                            </div>
                                            <div className="text-[11px] text-[#64748B]">{u.unit}</div>
                                        </div>
                                    </div>
                                    <div
                                        className={`mt-5 inline-flex items-center gap-2 text-xs font-medium ${
                                            active ? "text-[#2563EB]" : "text-[#64748B]"
                                        }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                active
                                                    ? "border-[#2563EB] bg-[#2563EB]"
                                                    : "border-[#CBD5E1]"
                                            }`}
                                        >
                                            {active && (
                                                <Check
                                                    className="w-3 h-3 text-white"
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </div>
                                        {active ? "Adicionado ao pedido" : "Adicionar ao pedido"}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
