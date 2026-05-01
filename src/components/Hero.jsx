import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { openWhatsApp } from "../lib/whatsapp";

const STATS = [
    { value: "+180", label: "Leads gerados / mês" },
    { value: "€6,80", label: "Custo médio por lead" },
    { value: "7 dias", label: "Até primeiros resultados" },
];

export default function Hero() {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - 72,
                behavior: "smooth",
            });
        }
    };

    return (
        <section
            id="hero"
            data-testid="hero-section"
            className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden"
        >
            <div className="absolute inset-0 bg-dot-grid opacity-60 mask-fade-b pointer-events-none" />
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-white/60 backdrop-blur-sm text-xs font-medium text-[#334155] mb-6"
                    data-testid="hero-badge"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    Especialistas em Google Ads para negócios locais em Portugal
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0A] leading-[1.05] tracking-tighter-2 max-w-4xl mx-auto"
                    data-testid="hero-headline"
                >
                    Clientes todos os dias para o teu{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10">negócio local</span>
                        <span className="absolute inset-x-0 bottom-1 h-3 bg-[#2563EB]/15 rounded-sm -z-0" />
                    </span>{" "}
                    com Google Ads
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 }}
                    className="mt-6 text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed"
                    data-testid="hero-subheadline"
                >
                    Existem pessoas a procurar o teu serviço hoje — e não estão a encontrar-te.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <button
                        type="button"
                        onClick={() => openWhatsApp({})}
                        data-testid="hero-cta-primary"
                        className="btn btn-primary btn-lg group"
                    >
                        Verificar Disponibilidade
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollTo("simulador")}
                        data-testid="hero-cta-secondary"
                        className="btn btn-outline btn-lg hover:bg-[#2563EB]/10 hover:border-[#2563EB] hover:text-[#2563EB]"
                    >
                        <Calculator className="w-4 h-4" />
                        Ver clientes que pode ganhar
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
                    data-testid="hero-stats"
                >
                    {STATS.map((s) => (
                        <div
                            key={s.label}
                            className="text-left md:text-center border-t border-[#E2E8F0] pt-4 md:pt-6"
                            data-testid={`hero-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            <div className="text-2xl md:text-4xl font-bold text-[#0A0A0A] tracking-tighter">
                                {s.value}
                            </div>
                            <div className="mt-1 text-xs md:text-sm text-[#64748B] font-medium">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
