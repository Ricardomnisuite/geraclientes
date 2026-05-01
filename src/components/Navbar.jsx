import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
    { label: "Google Ads", href: "#google-ads" },
    { label: "Redes Sociais", href: "#redes-sociais" },
    { label: "Website", href: "#website" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "/blog", isRoute: true },

    // 🔥 NOVO BOTÃO
    { label: "Simulador", href: "#simulador" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const onHome = location.pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleAnchor = (e, href) => {
        if (!onHome) return;

        if (href.startsWith("#")) {
            e.preventDefault();
            const el = document.querySelector(href);

            if (el) {
                window.scrollTo({
                    top: el.getBoundingClientRect().top + window.scrollY - 72,
                    behavior: "smooth",
                });
            }

            setOpen(false);
        }
    };

    return (
        <header
            data-testid="navbar"
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                ? "backdrop-blur-xl bg-white/75 border-b border-[#E2E8F0]"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center group-hover:scale-[1.04] transition-transform duration-200">
                        <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold tracking-tight text-[#0A0A0A]">
                        GeraClientes
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) =>
                        item.isRoute ? (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="px-3 py-2 text-sm font-medium text-[#334155] hover:text-[#0A0A0A] transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : onHome ? (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleAnchor(e, item.href)}
                                className="px-3 py-2 text-sm font-medium text-[#334155] hover:text-[#0A0A0A] transition-colors"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                key={item.label}
                                to={`/${item.href}`}
                                className="px-3 py-2 text-sm font-medium text-[#334155] hover:text-[#0A0A0A] transition-colors"
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="#contacto"
                        onClick={(e) => onHome && handleAnchor(e, "#contacto")}
                        className="btn btn-primary btn-sm"
                    >
                        Verificar Disponibilidade
                    </a>
                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="md:hidden p-2 text-[#0A0A0A]"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="md:hidden border-t border-[#E2E8F0] bg-white"
                    >
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {NAV_ITEMS.map((item) =>
                                item.isRoute ? (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={() => setOpen(false)}
                                        className="px-3 py-2.5 text-sm font-medium text-[#334155]"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.label}
                                        href={onHome ? item.href : `/${item.href}`}
                                        onClick={(e) => onHome && handleAnchor(e, item.href)}
                                        className="px-3 py-2.5 text-sm font-medium text-[#334155]"
                                    >
                                        {item.label}
                                    </a>
                                )
                            )}

                            <a
                                href={onHome ? "#contacto" : "/#contacto"}
                                onClick={(e) => onHome && handleAnchor(e, "#contacto")}
                                className="mt-2 btn btn-primary"
                            >
                                Verificar Disponibilidade
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
