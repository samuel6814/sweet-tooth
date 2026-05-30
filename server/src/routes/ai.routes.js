import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    : null;

const MODEL = "gemini-2.5-flash";

// Pull mimeType + base64 payload out of a data URL (data:image/png;base64,xxxx)
function parseDataUrl(dataUrl) {
    if (typeof dataUrl !== "string") return null;
    const match = dataUrl.match(/^data:(.+?);base64,(.*)$/);
    if (!match) return null;
    return { mimeType: match[1], data: match[2] };
}

router.post("/treatment-chat", async (req, res) => {
    if (!ai) {
        return res.status(503).json({ error: "AI service is not configured (missing GEMINI_API_KEY)." });
    }

    const { treatment, message, history = [], image } = req.body || {};

    if (!message && !image) {
        return res.status(400).json({ error: "A message or image is required." });
    }

    const treatmentTitle = treatment?.title || "dental treatment";

    const systemInstruction = `You are "Sweet Tooth AI", a friendly, professional dental treatment consultant.
You are currently advising a patient specifically about ${treatmentTitle}.
${treatment?.description ? `Context about this treatment: ${treatment.description}` : ""}

Guidelines:
- Give clear, encouraging, easy-to-understand answers focused on ${treatmentTitle}.
- When the user uploads a photo of their teeth, describe what is visually observable (alignment, spacing, coloration, visible gum condition) and how it relates to ${treatmentTitle}. Be specific but cautious.
- Keep responses concise (2-4 short paragraphs max). Use plain language.
- Always remind the user that this is a preliminary AI assessment and not a substitute for an in-person dental examination when giving any clinical observation.
- Never invent exact prices; refer them to the cost estimates shown on the page or a local clinic.`;

    // Build conversation contents from prior history
    const contents = [];
    for (const turn of Array.isArray(history) ? history : []) {
        if (!turn?.text) continue;
        contents.push({
            role: turn.role === "model" || turn.sender === "bot" ? "model" : "user",
            parts: [{ text: turn.text }],
        });
    }

    // Current user turn (text and/or image)
    const userParts = [];
    if (message) userParts.push({ text: message });
    const parsedImage = parseDataUrl(image);
    if (parsedImage) {
        userParts.push({ inlineData: { mimeType: parsedImage.mimeType, data: parsedImage.data } });
        if (!message) userParts.push({ text: `Please analyze this photo of my teeth in the context of ${treatmentTitle}.` });
    }
    contents.push({ role: "user", parts: userParts });

    try {
        const response = await ai.models.generateContent({
            model: MODEL,
            contents,
            config: { systemInstruction },
        });

        const reply = response.text?.trim() || "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";
        res.json({ reply });
    } catch (err) {
        console.error("AI treatment-chat error:", err);
        res.status(500).json({ error: "The AI consultant is temporarily unavailable. Please try again." });
    }
});

export default router;
