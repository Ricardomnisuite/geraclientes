import { motion } from "framer-motion";
import {
    Home,
    Car,
    Stethoscope,
    Sparkle,
    UtensilsCrossed,
    Store,
    Building2,
    TrendingUp,
    MapPin,
} from "lucide-react";

const FEATURED = {
    industry: "Imobiliária",
    location: "Lisboa",
    metrics: [
        { value: "32", label: "Contactos qualificados" },
        { value: "14", label: "Visitas agendadas" },
        { value: "€9,20", label: "Custo por lead" },
    ],
    description:
        "Campanha focada em apartamentos T2/T3 em zonas premium. Leads pré-qualificados através de formulários inteligentes e extensões de chamada.",
};

const GRID = [
    {
        industry: "Stand Automóvel",
        location: "Braga",
        metric: "+26",
        unit: "leads",
        description: "Pedidos de test-drive e propostas financiamento",
        Icon: Car,
    },
    {
        industry: "Clínica Dentária",
        location: "Coimbra",
        metric: "+41",
        unit: "leads",
        description: "Marcações de consultas de implantologia e estética",
        Icon: Stethoscope,
    },
    {
        industry: "Clínica Estética",
        location: "Porto",
        metric: "+38",
        unit: "leads",
        description: "Tratamentos faciais e sessões de diagnóstico gratuito",
        Icon: Sparkle,
    },
    {
        industry: "Restaurante",
        location: "Lisboa",
        metric: "+18",
        unit: "reservas",
        description: "Reservas semanais vindas de pesquisa local",
        Icon: UtensilsCrossed,
    },
    {
        industry: "Negócio Local",
        location: "Aveiro",
        metric: "+22",
        unit: "pedidos",
        description: "Pedidos de orçamento via chamada e WhatsApp",
        Icon: Store,
    },
    {
        industry: "Imobiliária",
        location: "Porto",
        metric: "+29",
        unit: "leads",
        description: "Potenciais compradores com intenção real de compra",
        Icon: Building2,
    },
];

function Stat({ value, label }) {
    return (
        <div>
            <div className="text-3xl md:text-4xl font-bold tracking-tighter text-[#0A0A0A]">
                {value}
            </div>
            <div className="text-xs font-medium text-[#64748B] uppercase tracking-widest mt-1.5">
                {label}
            </div>
        </div>
    );
}

export default function Results() {
    return (
        <section
            id="resultados"
            data-testid="results-section"
            className="relative py-16 md:py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4 }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                        <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Resultados comprovados
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                        Resultados reais em diferentes negócios locais
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-[#64748B] leading-relaxed">
                        Dados de campanhas reais geridas pela nossa equipa. Sem
                        promessas vazias — apenas métricas claras e auditáveis.
                    </p>
                </motion.div>

                {/* Featured + grid */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Featured case */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-200"
                        data-testid="featured-case-card"
                    >
                        {/* Decorative pattern */}
                        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#2563EB]/5 blur-3xl pointer-events-none" />
                        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                            <div className="md:col-span-2">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0A0A0A] text-white text-[11px] font-medium uppercase tracking-wider">
                                    Caso destacado
                                </div>
                                <h3 className="mt-4 text-2xl md:text-3xl font-bold text-[#0A0A0A] tracking-tight">
                                    {FEATURED.industry}
                                </h3>
                                <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-[#64748B]">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {FEATURED.location}
                                </div>
                                <p className="mt-4 text-[15px] text-[#475569] leading-relaxed max-w-md">
                                    {FEATURED.description}
                                </p>
                            </div>
                            <div className="md:col-span-3 grid grid-cols-3 gap-6 md:gap-8 md:pl-8 md:border-l md:border-[#E2E8F0]">
                                {FEATURED.metrics.map((m) => (
                                    <Stat key={m.label} value={m.value} label={m.label} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid cards */}
                    {GRID.map((item, i) => {
                        const { Icon } = item;
                        return (
                            <motion.div
                                key={item.industry + item.location}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: i * 0.04 }}
                                className="group relative rounded-2xl border border-[#E2E8F0] bg-white p-6 md:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                                data-testid={`result-card-${item.industry.toLowerCase().replace(/\s+/g, "-")}-${item.location.toLowerCase()}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-base font-semibold text-[#0A0A0A]">
                                            {item.industry}
                                        </h4>
                                        <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#64748B]">
                                            <MapPin className="w-3 h-3" />
                                            {item.location}
                                        </div>
                                    </div>
                                    <div className="w-9 h-9 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white transition-colors duration-200">
                                        <Icon className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="mt-6 flex items-baseline gap-1.5">
                                    <span className="text-4xl font-bold tracking-tighter text-[#0A0A0A]">
                                        {item.metric}
                                    </span>
                                    <span className="text-sm font-medium text-[#64748B]">
                                        {item.unit}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
