module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  try {
    const inputEmail = String(req.body?.email || "")
      .trim()
      .toLowerCase();

    if (!inputEmail || !inputEmail.includes("@")) {
      return res.status(400).json({ ok: false });
    }

    const usersRaw = process.env.ONBOARDING_EMAIL_USERS || "{}";
    const users = JSON.parse(usersRaw);

    const flow = users[inputEmail];

    if (!["standard", "enterprise"].includes(flow)) {
      return res.status(200).json({ ok: false });
    }

    return res.status(200).json({
      ok: true,
      flow,
    });
  } catch (error) {
    console.error("Email check failed:", error);

    return res.status(500).json({
      ok: false,
      error: "Email check failed",
    });
  }
};