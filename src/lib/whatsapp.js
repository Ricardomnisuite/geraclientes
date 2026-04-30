// WhatsApp business number for GeraClientes
export const WHATSAPP_NUMBER = "351929337626"; // +351 929 337 626

/**
 * Build a WhatsApp deep-link URL with a pre-filled message.
 * Two templates:
 *   - "default": generic CTAs (hero, plans, final CTA) — plan/billing/services/estimatedValue
 *   - "agency":  post-submission success state — brand-defined exact wording
 * Email is NEVER included in the WhatsApp message (still captured internally).
 *
 * @param {Object} opts
 * @param {string} [opts.name]
 * @param {string} [opts.niche]
 * @param {string} [opts.city]
 * @param {string} [opts.plan]
 * @param {string[]} [opts.services]
 * @param {number} [opts.estimatedValue]
 * @param {"default"|"agency"} [opts.template]
 * @param {string} [opts.custom] - Full override message (highest priority)
 */
export function buildWhatsAppUrl(opts = {}) {
    const {
        name,
        niche,
        city,
        plan,
        services = [],
        estimatedValue,
        template = "default",
        custom,
    } = opts;

    if (custom) {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(custom)}`;
    }

    let message;
    if (template === "agency") {
        // Post-form submission — brand-defined exact wording (NO email)
        const lines = [];
        lines.push(name ? `Olá, sou ${name}.` : "Olá!");
        if (niche || city) {
            const parts = [];
            if (niche) parts.push(`Tenho um negócio de ${niche}`);
            else parts.push("Tenho um negócio");
            if (city) parts.push(`em ${city}`);
            lines.push(`${parts.join(" ")}.`);
        }
        lines.push("");
        lines.push(
            "Tenho interesse em receber contactos qualificados através de Google Ads."
        );
        lines.push("");
        lines.push("Gostaria de verificar vagas disponíveis.");
        message = lines.join("\n");
    } else {
        // Default template — plan/services/estimated value
        const lines = [];
        lines.push(name ? `Olá, sou ${name}.` : "Olá!");
        if (niche || city) {
            const parts = [];
            if (niche) parts.push(`Tenho um negócio de ${niche}`);
            else parts.push("Tenho um negócio");
            if (city) parts.push(`em ${city}`);
            lines.push(`${parts.join(" ")}.`);
            lines.push("");
        }
        if (plan) {
            let interest = `Tenho interesse no plano ${plan}`;
            if (services && services.length > 0) {
                interest += ` com ${services.join(" e ")}`;
            }
            lines.push(`${interest}.`);
        } else if (services && services.length > 0) {
            lines.push(`Tenho interesse em ${services.join(" e ")}.`);
        }
        if (estimatedValue) {
            lines.push(`Valor estimado: €${formatValue(estimatedValue)}`);
        }
        lines.push("");
        lines.push("Gostaria de verificar disponibilidade.");
        message = lines.join("\n");
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatValue(n) {
    return new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 }).format(
        Math.round(n)
    );
}

export function openWhatsApp(opts = {}) {
    const url = buildWhatsAppUrl(opts);
    if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
    }
}
