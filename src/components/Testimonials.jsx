import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
    {
        name: "João Martins",
        sector: "Clínica Dentária",
        city: "Braga",
        text: "As primeiras consultas chegaram na segunda semana. Finalmente temos um canal previsível de novos pacientes.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Ana Ribeiro",
        sector: "Imobiliária",
        city: "Lisboa",
        text: "Equipa muito transparente. Relatórios claros e resultados reais — nada de promessas vazias.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Pedro Silva",
        sector: "Stand Automóvel",
        city: "Porto",
        text: "Passámos de 5 test-drives por mês para mais de 20. A diferença na agenda comercial é enorme.",
        avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
        name: "Marta Costa",
        sector: "Clínica Estética",
        city: "Aveiro",
        text: "O telefone começou a tocar em poucos dias. Atendimento profissional do início ao fim.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        name: "Rui Oliveira",
        sector: "Restaurante",
        city: "Coimbra",
        text: "Reservas a subir todas as semanas. O investimento pagou-se logo no primeiro mês.",
        avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
        name: "Sofia Mendes",
        sector: "Advocacia",
        city: "Lisboa",
        text: "Casos qualificados, sem curiosos. Ganhámos tempo para focar nos clientes certos.",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
        name: "Tiago Ferreira",
        sector: "Ginásio",
        city: "Leiria",
        text: "Os leads que chegam estão realmente interessados. Zero desperdício de tempo com curiosos.",
        avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    },
];

function TestimonialCard({ t, index }) {
    return (
        <div
            className="shrink-0 w-[86vw] sm:w-[420px] rounded-2xl border border-[#E2E8F0] bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow duration-200"
            data-testid={`testimonial-card-${index}`}
        >
            <Quote className="w-5 h-5 text-[#2563EB]/30" strokeWidth={2.5} />
            <p className="mt-3 text-[15px] text-[#334155] leading-relaxed min-h-[72px]">
                {t.text}
            </p>
            <div className="mt-6 flex items-center gap-3.5">
                <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover border border-[#E2E8F0] bg-[#F8FAFC]"
                />
                <div>
                    <div className="text-sm font-semibold text-[#0A0A0A]">{t.name}</div>
                    <div className="text-xs text-[#64748B]">
                        {t.sector} · {t.city}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <section
            id="testemunhos"
            data-testid="testimonials-section"
            className="relative py-20 md:py-24 overflow-hidden"
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
                        <Star className="w-3.5 h-3.5 fill-[#2563EB]" strokeWidth={0} />
                        Testemunhos
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                        O que dizem os nossos clientes
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-[#64748B] leading-relaxed">
                        Negócios locais reais, com resultados concretos. Sem paga-posts,
                        sem rostos genéricos.
                    </p>
                </motion.div>
            </div>

            {/* Auto-scrolling marquee — user cannot drag; hover pauses */}
            <div
                className="relative mt-12"
                data-testid="testimonials-marquee"
            >
                {/* Fade masks on edges */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden">
                    <div
                        className="flex gap-4 md:gap-6 animate-marquee w-max"
                        data-testid="testimonials-track"
                    >
                        {/* First pass */}
                        {TESTIMONIALS.map((t, i) => (
                            <TestimonialCard key={`a-${t.name}`} t={t} index={i} />
                        ))}
                        {/* Duplicate for seamless loop */}
                        {TESTIMONIALS.map((t, i) => (
                            <TestimonialCard
                                key={`b-${t.name}`}
                                t={t}
                                index={i + TESTIMONIALS.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
