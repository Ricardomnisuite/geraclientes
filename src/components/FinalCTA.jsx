import { motion } from "framer-motion";
import { MessageCircle, Clock } from "lucide-react";
import { openWhatsApp } from "../lib/whatsapp";

export default function FinalCTA() {
    return (
        <section
            id="final-cta"
            data-testid="final-cta-section"
            className="relative overflow-hidden bg-[#0A0A0A] text-white py-24 md:py-32"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/80 mb-6"
                >
                    <Clock className="w-3.5 h-3.5 text-[#93C5FD]" />
                    Apenas 1 cliente por zona e setor
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter-2 leading-[1.05]"
                >
                    A tua zona ainda <span className="text-[#93C5FD]">está disponível?</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mt-5 text-lg text-white/70 max-w-xl mx-auto leading-relaxed"
                >
                    Fala connosco no WhatsApp. Validamos a disponibilidade da tua zona
                    e setor em poucos minutos — sem compromisso.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mt-10"
                >
                    <button
                        type="button"
                        onClick={() => openWhatsApp({})}
                        data-testid="final-cta-button"
                        className="btn btn-whatsapp-on-dark btn-lg"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Verificar Disponibilidade no WhatsApp
                    </button>
                    <div className="mt-4 text-xs text-white/50">
                        Resposta geralmente em menos de 30 minutos em horário laboral
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
