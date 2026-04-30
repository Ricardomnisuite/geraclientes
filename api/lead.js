export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.MAKE_WEBHOOK_URL) {
    return res.status(500).json({ error: "Missing MAKE_WEBHOOK_URL" });
  }

  try {
    const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Make Webhook Response Error:", errorText);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Make webhook error:", error);
    return res.status(500).json({ error: "Failed to send lead" });
  }
}
