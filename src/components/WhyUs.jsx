import { motion } from "framer-motion";
import { ShieldCheck, Target, LineChart, Users } from "lucide-react";

const POINTS = [
    {
        icon: Target,
        title: "1 cliente por zona",
        text: "Trabalhamos em exclusivo no teu setor e área geográfica. Não partilhamos leads com concorrentes diretos.",
    },
    {
        icon: LineChart,
        title: "Dados claros, sem jargão",
        text: "Relatórios transparentes com CPL, CPA e ROI reais. Sabes sempre onde está cada euro investido.",
    },
    {
        icon: ShieldCheck,
        title: "A conta é flexível",
        text: "A conta pode ser tua ou criada por nós — sempre com total transparência.",
    },
    {
        icon: Users,
        title: "Equipa acessível",
        text: "Acesso direto ao gestor de campanhas por WhatsApp. Resposta no mesmo dia útil.",
    },
];

export default function WhyUs() {
    return (
        <section
            id="porque-nos"
            data-testid="why-us-section"
            className="relative overflow-hidden bg-[#2563EB] py-20 md:py-24"
        >
            {/* Subtle decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        Porquê GeraClientes
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter-2 leading-[1.1]">
                        A forma clara de crescer com marketing digital em Portugal
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                        Trabalhamos com transparência total. Sem letras pequenas, sem
                        promessas vazias — apenas resultados mensuráveis.
                    </p>
                </motion.div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {POINTS.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="rounded-2xl bg-white p-6 md:p-7 shadow-lg shadow-blue-950/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                                data-testid={`why-us-card-${i}`}
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                                    <Icon className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <h3 className="mt-5 text-base font-semibold text-[#0A0A0A] tracking-tight">
                                    {p.title}
                                </h3>
                                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                                    {p.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
