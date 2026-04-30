import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQS = [
    {
        q: "Em quanto tempo começo a ver resultados?",
        a: "A maior parte dos nossos clientes recebe os primeiros contactos qualificados entre o 3.º e o 7.º dia após a campanha estar ativa. As duas primeiras semanas são de otimização — a partir daí o custo por lead estabiliza.",
    },
    {
        q: "Qual o orçamento mínimo recomendado para Google Ads?",
        a: "Para negócios locais em Portugal recomendamos começar com €8–€15/dia de budget de Google Ads (além da mensalidade do plano). Ajustamos sempre ao setor e zona geográfica para garantir rentabilidade.",
    },
    {
        q: "Fazem fidelização por longos períodos?",
        a: "Não. Podes começar com 1 mês. Os planos de 3 e 6 meses têm desconto real porque nos permitem investir mais em otimização e testes. Se não sentires valor, não renovas — sem letras pequenas.",
    },
    {
        q: "Trabalham com o meu setor?",
        a: "Trabalhamos com negócios locais: imobiliárias, clínicas (dentárias, estéticas, veterinárias), restauração, stands automóveis, ginásios, advocacia, serviços e comércio local. Se tens dúvidas, fala connosco e validamos juntos se faz sentido.",
    },
    {
        q: "O que acontece se eu cancelar?",
        a: "Entregamos toda a estrutura: conta Google Ads, tracking, landing pages e documentação. A conta é sempre tua — nunca da agência. Assim garantimos total transparência.",
    },
    {
        q: "Posso contratar só Redes Sociais ou Website?",
        a: "Sim. Os serviços estão disponíveis de forma independente. Podes contratar Google Ads, Redes Sociais ou Website separadamente — ou combiná-los para desconto.",
    },
    {
        q: "Como é feita a comunicação durante a campanha?",
        a: "Tens acesso direto ao gestor de campanhas por WhatsApp e reuniões mensais (ou quinzenais nos planos Crescimento e Escala). Relatórios claros, sem jargão técnico.",
    },
];

export default function FAQ() {
    return (
        <section id="faq" data-testid="faq-section" className="relative py-20 md:py-24">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                        <HelpCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Perguntas frequentes
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]">
                        Respostas diretas às dúvidas mais comuns
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="mt-12"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((item, i) => (
                            <AccordionItem
                                key={i}
                                value={`faq-${i}`}
                                className="border-b border-[#E2E8F0]"
                                data-testid={`faq-item-${i}`}
                            >
                                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-[#0A0A0A] hover:no-underline py-5">
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#475569] text-[15px] leading-relaxed pb-5">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
