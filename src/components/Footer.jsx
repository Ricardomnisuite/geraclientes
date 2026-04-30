import { Link } from "react-router-dom";
import { Sparkles, Mail, MapPin } from "lucide-react";
import { openWhatsApp, WHATSAPP_NUMBER } from "../lib/whatsapp";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            data-testid="footer"
            className="border-t border-[#E2E8F0] bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="font-bold tracking-tight text-[#0A0A0A]">
                                GeraClientes
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-[#64748B] leading-relaxed max-w-sm">
                            Agência especializada em geração de leads para negócios
                            locais em Portugal através de Google Ads, redes sociais e
                            websites otimizados para conversão.
                        </p>
                        <div className="mt-6 space-y-2 text-sm text-[#64748B]">
                            <button
                                onClick={() => openWhatsApp({})}
                                className="inline-flex items-center gap-2 hover:text-[#0A0A0A] transition-colors"
                                data-testid="footer-whatsapp"
                            >
                                <Mail className="w-4 h-4" />
                                +351 929 337 626
                            </button>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Portugal
                            </div>
                        </div>
                    </div>
                    <FooterGroup
                        title="Serviços"
                        links={[
                            { label: "Google Ads", href: "/#google-ads" },
                            { label: "Redes Sociais", href: "/#redes-sociais" },
                            { label: "Website Premium", href: "/#website" },
                        ]}
                    />
                    <FooterGroup
                        title="Empresa"
                        links={[
                            { label: "FAQ", href: "/#faq" },
                            { label: "Blog", href: "/blog", isRoute: true },
                            { label: "Contacto", href: "/#contacto" },
                        ]}
                    />
                    <FooterGroup
                        title="Legal"
                        links={[
                            { label: "Política de Privacidade", href: "#" },
                            { label: "Termos de Serviço", href: "#" },
                        ]}
                    />
                </div>

                <div className="mt-14 pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="text-xs text-[#64748B]">
                        © {year} GeraClientes. Todos os direitos reservados.
                    </div>
                    <div className="text-xs text-[#64748B]">
                        geraclientes.com
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterGroup({ title, links }) {
    return (
        <div>
            <h4 className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-widest">
                {title}
            </h4>
            <ul className="mt-4 space-y-2.5">
                {links.map((l) =>
                    l.isRoute ? (
                        <li key={l.label}>
                            <Link
                                to={l.href}
                                className="text-sm text-[#64748B] hover:text-[#0A0A0A] transition-colors"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ) : (
                        <li key={l.label}>
                            <a
                                href={l.href}
                                className="text-sm text-[#64748B] hover:text-[#0A0A0A] transition-colors"
                            >
                                {l.label}
                            </a>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
