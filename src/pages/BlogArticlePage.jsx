import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Clock, Calendar, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogGraphic from "../components/BlogGraphic";
import { getArticleBySlug, getRelatedArticles } from "../lib/blogData";
import { openWhatsApp } from "../lib/whatsapp";

export default function BlogArticlePage() {
    const { slug } = useParams();
    const article = getArticleBySlug(slug);

    if (!article) return <Navigate to="/blog" replace />;

    const related = getRelatedArticles(slug, 2);

    const publishedDate = new Date(article.publishedAt).toLocaleDateString("pt-PT", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.metaDescription || article.excerpt,
        datePublished: article.publishedAt,
        author: { "@type": "Organization", name: "GeraClientes" },
        publisher: {
            "@type": "Organization",
            name: "GeraClientes",
            logo: { "@type": "ImageObject", url: "https://geraclientes.com/logo.png" },
        },
        mainEntityOfPage: `https://geraclientes.com/blog/${article.slug}`,
    };

    return (
        <>
            <Helmet>
                <title>{`${article.title} — GeraClientes`}</title>
                <meta name="description" content={article.metaDescription || article.excerpt} />
                <link rel="canonical" href={`https://geraclientes.com/blog/${article.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
            <Navbar />

            <main className="pt-32 pb-24">
                <article className="max-w-3xl mx-auto px-4 md:px-8">
                    <Link
                        to="/blog"
                        data-testid="article-back-link"
                        className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0A0A0A] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao blog
                    </Link>

                    <div className="mt-6 flex items-center gap-3 text-xs text-[#64748B]">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] font-medium">
                            {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {publishedDate}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                        </span>
                    </div>

                    <h1
                        className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tighter-2 leading-[1.1]"
                        data-testid="article-title"
                    >
                        {article.title}
                    </h1>
                    <p className="mt-4 text-lg text-[#64748B] leading-relaxed">
                        {article.excerpt}
                    </p>

                    <div className="mt-10 rounded-2xl overflow-hidden border border-[#E2E8F0]">
                        <BlogGraphic variant={article.graphicVariant} />
                    </div>

                    {/* Table of contents */}
                    <div className="mt-12 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
                        <div className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-3">
                            Índice
                        </div>
                        <ol className="space-y-1.5">
                            {article.sections.map((s, i) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className="text-sm text-[#334155] hover:text-[#2563EB] transition-colors"
                                        data-testid={`toc-link-${s.id}`}
                                    >
                                        <span className="text-[#94A3B8] mr-2 tabular-nums">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Body — with mid-article WhatsApp CTA */}
                    <div className="prose-article mt-10">
                        {article.sections.map((s, sectionIdx) => {
                            const midpoint = Math.floor(article.sections.length / 2);
                            return (
                                <section key={s.id} id={s.id}>
                                    <h2>{s.title}</h2>
                                    {s.body.map((block, j) => {
                                        if (block.type === "p")
                                            return <p key={j}>{block.text}</p>;
                                        if (block.type === "ul")
                                            return (
                                                <ul key={j}>
                                                    {block.items.map((it, k) => (
                                                        <li key={k}>{it}</li>
                                                    ))}
                                                </ul>
                                            );
                                        return null;
                                    })}
                                    {sectionIdx === midpoint - 1 && (
                                        <div
                                            className="my-10 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                            data-testid="article-mid-cta"
                                        >
                                            <div>
                                                <div className="text-sm font-semibold text-[#0A0A0A]">
                                                    Tens dúvidas sobre isto?
                                                </div>
                                                <p className="text-sm text-[#64748B] mt-0.5">
                                                    Resposta direta no WhatsApp em poucos minutos.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => openWhatsApp({})}
                                                data-testid="article-mid-cta-button"
                                                className="btn btn-whatsapp btn-sm shrink-0"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Fala connosco no WhatsApp
                                            </button>
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                    </div>

                    {/* Article CTA */}
                    <div className="mt-16 rounded-2xl bg-[#0A0A0A] text-white p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#2563EB]/20 blur-3xl pointer-events-none" />
                        <div className="relative">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Queres aplicar isto ao teu negócio?
                            </h3>
                            <p className="mt-3 text-white/70 max-w-xl">
                                Vemos se a tua zona ainda está disponível e quais as
                                opções para o teu setor.
                            </p>
                            <button
                                onClick={() => openWhatsApp({})}
                                data-testid="article-cta-button"
                                className="mt-6 btn btn-whatsapp-on-dark"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Ver vagas disponíveis
                            </button>
                        </div>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-4">
                                Artigos relacionados
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {related.map((r) => (
                                    <Link
                                        key={r.slug}
                                        to={`/blog/${r.slug}`}
                                        className="group block rounded-xl border border-[#E2E8F0] bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                        data-testid={`related-article-${r.slug}`}
                                    >
                                        <div className="text-xs text-[#64748B] font-medium uppercase tracking-widest">
                                            {r.category}
                                        </div>
                                        <div className="mt-2 text-base font-semibold text-[#0A0A0A] tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors">
                                            {r.title}
                                        </div>
                                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#0A0A0A]">
                                            Ler artigo
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </>
    );
}
