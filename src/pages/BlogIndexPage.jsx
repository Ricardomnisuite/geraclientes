import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogGraphic from "../components/BlogGraphic";
import { BLOG_ARTICLES } from "../lib/blogData";

export default function BlogIndexPage() {
    return (
        <>
            <Helmet>
                <title>Blog — GeraClientes | Google Ads, Leads e Marketing Local</title>
                <meta
                    name="description"
                    content="Artigos práticos sobre Google Ads, geração de leads, redes sociais e websites para negócios locais em Portugal."
                />
                <link rel="canonical" href="https://geraclientes.com/blog" />
            </Helmet>
            <Navbar />
            <main className="pt-32 pb-24 md:pt-40 md:pb-32">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="max-w-2xl">
                        <div className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                            Blog
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.05]">
                            Ideias que fazem crescer negócios locais
                        </h1>
                        <p className="mt-5 text-lg text-[#64748B] leading-relaxed">
                            Guias práticos sobre Google Ads, geração de leads, redes sociais
                            e websites. Sem teoria vazia, só o que dá resultado.
                        </p>
                    </div>

                    {/* Featured article */}
                    <Link
                        to={`/blog/${BLOG_ARTICLES[0].slug}`}
                        className="mt-14 group grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 items-center rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6 hover:shadow-md transition-all duration-200"
                        data-testid="blog-featured-article"
                    >
                        <div className="lg:col-span-3 rounded-xl overflow-hidden border border-[#E2E8F0]">
                            <BlogGraphic variant={BLOG_ARTICLES[0].graphicVariant} />
                        </div>
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 text-xs text-[#64748B]">
                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] font-medium">
                                    {BLOG_ARTICLES[0].category}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {BLOG_ARTICLES[0].readTime}
                                </span>
                            </div>
                            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#0A0A0A] tracking-tight leading-tight group-hover:text-[#2563EB] transition-colors">
                                {BLOG_ARTICLES[0].title}
                            </h2>
                            <p className="mt-3 text-[15px] text-[#64748B] leading-relaxed">
                                {BLOG_ARTICLES[0].excerpt}
                            </p>
                            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A]">
                                Ler artigo
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Grid */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BLOG_ARTICLES.slice(1).map((a, i) => (
                            <motion.div
                                key={a.slug}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                            >
                                <Link
                                    to={`/blog/${a.slug}`}
                                    className="group block rounded-2xl border border-[#E2E8F0] bg-white p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                                    data-testid={`blog-card-${a.slug}`}
                                >
                                    <div className="rounded-xl overflow-hidden border border-[#E2E8F0]">
                                        <BlogGraphic variant={a.graphicVariant} />
                                    </div>
                                    <div className="mt-5 px-2">
                                        <div className="flex items-center gap-3 text-xs text-[#64748B]">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] font-medium">
                                                {a.category}
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {a.readTime}
                                            </span>
                                        </div>
                                        <h3 className="mt-3 text-lg md:text-xl font-bold text-[#0A0A0A] tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors">
                                            {a.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-[#64748B] leading-relaxed line-clamp-2">
                                            {a.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
