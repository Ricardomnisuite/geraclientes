import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

// Simple animated bar comparison: BEFORE 8 leads / AFTER 32 leads
// Subtle glow on AFTER bar. Clean minimal axis.
export default function BeforeAfterChart() {
    const BEFORE = 8;
    const AFTER = 32;
    const MAX = 40;

    const beforePct = (BEFORE / MAX) * 100;
    const afterPct = (AFTER / MAX) * 100;

    return (
        <section
            id="impacto"
            data-testid="chart-section"
            className="relative pt-6 pb-20 md:pt-10 md:pb-24"
        >
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45 }}
                    className="relative rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden"
                    data-testid="chart-card"
                >
                    {/* Soft glow behind the AFTER bar */}
                    <div className="absolute top-1/2 right-[15%] w-72 h-72 rounded-full bg-[#2563EB]/10 blur-3xl pointer-events-none -translate-y-1/2" />

                    <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 p-8 md:p-12">
                        {/* Left: copy */}
                        <div className="md:col-span-2">
                            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                                <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                                Impacto médio
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.15]">
                                De 8 para 32 leads
                                <br />
                                em poucas semanas
                            </h2>
                            <p className="mt-3 text-sm md:text-base text-[#64748B] leading-relaxed">
                                Média mensal de contactos qualificados antes e depois de
                                ativar uma campanha gerida pela GeraClientes.
                            </p>
                            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#0A0A0A]">
                                <span className="text-[#2563EB] font-bold tabular-nums">+300%</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                                <span className="text-[#64748B]">em volume de leads</span>
                            </div>
                        </div>

                        {/* Right: chart */}
                        <div className="md:col-span-3">
                            <div className="relative h-72 md:h-80">
                                {/* Gridlines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-full border-t border-dashed border-[#E2E8F0]"
                                        />
                                    ))}
                                </div>
                                {/* Y axis labels */}
                                <div className="absolute inset-y-0 -left-2 flex flex-col justify-between text-[10px] font-medium text-[#94A3B8] tabular-nums">
                                    {[40, 30, 20, 10, 0].map((v) => (
                                        <span key={v}>{v}</span>
                                    ))}
                                </div>

                                {/* Bars */}
                                <div className="absolute inset-0 pl-6 pr-2 flex items-end justify-around gap-10">
                                    {/* BEFORE */}
                                    <div className="flex-1 max-w-[120px] h-full flex items-end">
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            whileInView={{ height: `${beforePct}%`, opacity: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                            className="w-full rounded-t-lg bg-[#0A0A0A] relative"
                                            data-testid="chart-bar-before"
                                        >
                                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-base font-bold text-[#0A0A0A] tabular-nums">
                                                {BEFORE}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* AFTER */}
                                    <div className="flex-1 max-w-[120px] h-full flex items-end">
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            whileInView={{ height: `${afterPct}%`, opacity: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{
                                                duration: 1.1,
                                                delay: 0.15,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="w-full rounded-t-lg relative"
                                            style={{
                                                background:
                                                    "linear-gradient(to top, #2563EB 0%, #3B82F6 100%)",
                                                boxShadow:
                                                    "0 0 40px rgba(37, 99, 235, 0.35), 0 10px 30px -10px rgba(37, 99, 235, 0.4)",
                                            }}
                                            data-testid="chart-bar-after"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{ duration: 0.4, delay: 1.1 }}
                                                className="absolute -top-7 left-1/2 -translate-x-1/2 text-base font-bold text-[#2563EB] tabular-nums"
                                            >
                                                {AFTER}
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* X axis labels */}
                            <div className="mt-3 pl-6 pr-2 flex justify-around gap-10">
                                <div className="flex-1 max-w-[120px] text-center">
                                    <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
                                        Antes
                                    </div>
                                    <div className="text-[11px] text-[#94A3B8] mt-0.5">
                                        leads / mês
                                    </div>
                                </div>
                                <div className="flex-1 max-w-[120px] text-center">
                                    <div className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest">
                                        Depois
                                    </div>
                                    <div className="text-[11px] text-[#94A3B8] mt-0.5">
                                        leads / mês
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
