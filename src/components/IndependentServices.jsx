import { motion } from "framer-motion";
import { Check, Share2, Globe, Package, ArrowRight } from "lucide-react";
import { openWhatsApp } from "../lib/whatsapp";

const REDES_PLANS = [
    {
        id: "redes-1",
        name: "1 rede",
        price: 299,
        unit: "/mês",
        description: "Presença ativa e consistente numa rede social",
        features: [
            "Estratégia de conteúdo mensal",
            "12 publicações otimizadas",
            "Gestão completa da página",
            "Relatório de performance",
        ],
    },
    {
        id: "redes-2",
        name: "2 redes",
        price: 399,
        unit: "/mês",
        description: "Maior alcance e consistência em múltiplas plataformas",
        features: [
            "Estratégia multi-plataforma",
            "20 publicações adaptadas",
            "Gestão de duas redes sociais",
            "Relatórios comparativos",
            "Sugestões de stories/reels",
        ],
        highlight: true,
    },
    {
        id: "redes-3",
        name: "3 redes",
        price: 449,
        unit: "/mês",
        description: "Presença completa e estratégia contínua",
        features: [
            "Estratégia omnichannel",
            "28 publicações premium",
            "Gestão de três redes sociais",
            "Análise de concorrência",
            "Calls mensais de estratégia",
            "Plano editorial trimestral",
        ],
    },
];

function fmt(n) {
    return new Intl.NumberFormat("pt-PT").format(n);
}

function PlanCard({ plan, sectionId, testid }) {
    return (
        <div
            className={`relative rounded-2xl p-7 md:p-8 transition-all duration-200 ${
                plan.highlight
                    ? "border-2 border-[#2563EB] bg-white shadow-md"
                    : "border border-[#E2E8F0] bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
            }`}
            data-testid={testid}
        >
            {plan.highlight && (
                <div className="absolute -top-3 left-6 inline-flex items-center px-2.5 py-1 rounded-md bg-[#2563EB] text-white text-[10px] font-semibold uppercase tracking-widest">
                    Mais popular
                </div>
            )}
            <h4 className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                {plan.name}
            </h4>
            <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tighter text-[#0A0A0A]">
                    €{fmt(plan.price)}
                </span>
                <span className="text-sm text-[#64748B]">{plan.unit}</span>
            </div>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed min-h-[44px]">
                {plan.description}
            </p>
            <ul className="mt-5 space-y-2.5">
                {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#334155]">
                        <Check
                            className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0"
                            strokeWidth={2.5}
                        />
                        {f}
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick={() =>
                    openWhatsApp({
                        services: [`${sectionId === "redes" ? "Redes Sociais" : "Website"} — ${plan.name}`],
                    })
                }
                data-testid={`${testid}-cta`}
                className="mt-6 w-full btn btn-primary"
            >
                Quero este plano
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}

export default function IndependentServices() {
    return (
        <>
            {/* Redes Sociais */}
            <section
                id="redes-sociais"
                data-testid="redes-sociais-section"
                className="relative py-20 md:py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]"
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                            <Share2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Serviços disponíveis de forma independente
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                            Gestão de Redes Sociais
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-[#64748B] leading-relaxed">
                            Presença consistente, conteúdo de qualidade e uma estratégia
                            editorial pensada para converter seguidores em clientes.
                        </p>
                    </motion.div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
                        {REDES_PLANS.map((p) => (
                            <PlanCard
                                key={p.id}
                                plan={p}
                                sectionId="redes"
                                testid={`redes-plan-${p.id}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Website + Bundle */}
            <section
                id="website"
                data-testid="website-section"
                className="relative py-20 md:py-24"
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                            <Globe className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Website
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                            Website Visual Premium
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-[#64748B] leading-relaxed">
                            Um website profissional moderno, rápido e otimizado para
                            conversão. Pensado para funcionar como o teu melhor vendedor
                            digital 24/7.
                        </p>
                    </motion.div>

                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
                        {/* Website card */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-200"
                            data-testid="website-standalone-card"
                        >
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#475569] uppercase tracking-wider">
                                Pagamento único
                            </div>
                            <h3 className="mt-4 text-2xl font-bold text-[#0A0A0A] tracking-tight">
                                Website Visual Premium
                            </h3>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-5xl font-bold tracking-tighter text-[#0A0A0A]">
                                    €399
                                </span>
                            </div>
                            <p className="mt-3 text-sm text-[#64748B] leading-relaxed max-w-md">
                                Website profissional moderno, rápido e otimizado para
                                conversão.
                            </p>
                            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {[
                                    "Design 100% personalizado",
                                    "Totalmente responsivo",
                                    "SEO base configurado",
                                    "Integração WhatsApp e Analytics",
                                    "Velocidade otimizada",
                                    "Formulários de lead incluídos",
                                ].map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-start gap-2 text-sm text-[#334155]"
                                    >
                                        <Check
                                            className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0"
                                            strokeWidth={2.5}
                                        />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                onClick={() =>
                                    openWhatsApp({ services: ["Website Visual Premium"] })
                                }
                                data-testid="website-standalone-cta"
                                className="mt-7 btn btn-primary"
                            >
                                Quero o meu website
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>

                        {/* Bundle card */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            className="relative overflow-hidden rounded-2xl text-white p-8 md:p-10"
                            style={{
                                background:
                                    "linear-gradient(140deg, #3B82F6 0%, #2563EB 45%, #1D4ED8 100%)",
                                boxShadow:
                                    "0 30px 60px -15px rgba(37, 99, 235, 0.45), 0 0 0 1px rgba(255,255,255,0.08) inset",
                            }}
                            data-testid="bundle-card"
                        >
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/15 blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-24 -left-12 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                            <div className="relative">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[11px] font-medium text-white uppercase tracking-wider">
                                    <Package className="w-3 h-3" />
                                    Combinar serviços
                                </div>
                                <h3 className="mt-4 text-2xl font-bold tracking-tight">
                                    Gestão Redes + Website
                                </h3>
                                <div className="mt-4 flex items-baseline gap-3">
                                    <span className="text-5xl font-bold tracking-tighter">
                                        €539
                                    </span>
                                    <span className="text-lg text-white/50 line-through">
                                        €599
                                    </span>
                                </div>
                                <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-md">
                                    Desconto aplicado ao combinar serviços. Tudo o que
                                    precisas para uma presença digital completa.
                                </p>
                                <ul className="mt-6 space-y-2.5">
                                    {[
                                        "Website Visual Premium incluído",
                                        "Gestão de 1 rede social (1º mês)",
                                        "Integração total entre canais",
                                        "Suporte prioritário",
                                    ].map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-2.5 text-sm text-white/85"
                                        >
                                            <Check
                                                className="w-4 h-4 text-[#93C5FD] mt-0.5 flex-shrink-0"
                                                strokeWidth={2.5}
                                            />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    type="button"
                                    onClick={() =>
                                        openWhatsApp({
                                            services: ["Bundle Redes + Website"],
                                        })
                                    }
                                    data-testid="bundle-cta"
                                    className="mt-7 btn btn-ghost"
                                >
                                    Aproveitar desconto
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
