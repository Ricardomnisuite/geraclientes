import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/**
 * Canonical lead shape shared across the site.
 * Add new fields here — do not mutate elsewhere.
 */
export function buildLeadData({
    name,
    email,
    city,
    sector,
    phone = undefined,
    plan = undefined,
    message = undefined,
    source = "landing_page",
} = {}) {
    return {
        name,
        email,
        city,
        sector,
        phone,
        plan,
        message,
        source,
        createdAt: new Date().toISOString(),
    };
}

/**
 * Single entry-point for all lead submissions.
 * - Preserves the current MongoDB capture via POST /api/leads.
 * - Returns a normalised result so callers don't need to know the transport.
 *
 * Future integrations (Resend / EmailJS / Klaviyo / HubSpot) should be added
 * INSIDE this function only — do NOT spread integration code across components.
 * Example (NOT implemented yet):
 *
 *   // await axios.post(`${API}/notify-email`, leadData);   // Resend
 *   // await klaviyo.track("Lead Submitted", leadData);     // Klaviyo
 *
 * Do not install packages or connect providers until the main agent is asked to.
 */
export async function handleLeadSubmission(leadData) {
    try {
        // Existing, working capture — maps sector → niche for backend compatibility.
        const payload = {
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone,
            city: leadData.city,
            niche: leadData.sector,
            plan: leadData.plan,
            message: leadData.message,
            source: leadData.source || "landing_page",
        };

        const { data } = await axios.post(`${API}/leads`, payload);

        // Placeholder slot for future marketing-automation providers.
        // Intentionally left without external calls.
        // await notifyOwnerByEmail(leadData); // future
        // await addToEmailMarketingList(leadData); // future

        return { success: true, lead: data };
    } catch (err) {
        // Surface a clean error to the caller for toast/UI handling.
        return {
            success: false,
            error: err?.response?.data?.detail || err?.message || "Unknown error",
        };
    }
}
