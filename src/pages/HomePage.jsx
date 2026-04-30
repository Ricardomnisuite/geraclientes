import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BeforeAfterChart from "../components/BeforeAfterChart";
import Results from "../components/Results";
import GoogleAdsPlans from "../components/GoogleAdsPlans";
import IndependentServices from "../components/IndependentServices";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import ContactForm from "../components/ContactForm";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GeraClientes",
        description:
            "Agência especializada em geração de leads para negócios locais em Portugal através de Google Ads, redes sociais e websites otimizados para conversão.",
        url: "https://geraclientes.com",
        telephone: "+351929337626",
        areaServed: "PT",
        address: { "@type": "PostalAddress", addressCountry: "PT" },
        priceRange: "€€",
        image: "https://geraclientes.com/og.png",
    };

    return (
        <>
            <Helmet>
                <title>GeraClientes — Google Ads e Leads para Negócios Locais em Portugal</title>
                <meta
                    name="description"
                    content="Agência Google Ads para negócios locais em Portugal. Geramos leads qualificados para clínicas, imobiliárias, restaurantes e mais. Verifica disponibilidade na tua zona."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href="https://geraclientes.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="GeraClientes — Google Ads para Negócios Locais em Portugal" />
                <meta
                    property="og:description"
                    content="Mais chamadas, mais mensagens e mais contactos — de pessoas que já procuram o que fazes."
                />
                <meta property="og:locale" content="pt_PT" />
                <meta property="og:url" content="https://geraclientes.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
            <Navbar />
            <main>
                <Hero />
                <BeforeAfterChart />
                <Results />
                <GoogleAdsPlans />
                <IndependentServices />
                <WhyUs />
                <ContactForm />
                <Testimonials />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
        </>
    );
}
