import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "./config/auth.js";
import { toNodeHandler } from "better-auth/node";

import clinicsRoutes from "./routes/clinics.routes.js";
import treatmentsRoutes from "./routes/treatments.routes.js";



const app = express();
const port = process.env.PORT || 8000;

// Allow localhost (any port) and all *.vercel.app deployments
app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser requests (curl, server-to-server) with no Origin
        if (!origin) return callback(null, true);

        const isLocalhost = /^https?:\/\/localhost(:\d+)?$/.test(origin);
        const isVercel = /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/.test(origin);

        if (isLocalhost || isVercel) {
            return callback(null, true);
        }

        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true
}));

// BetterAuth handler — must be mounted BEFORE express.json() so it can
// read the raw request body. toNodeHandler bridges Express <-> Web Request.
app.all("/api/auth/*splat", toNodeHandler(auth));

// JSON body parser for the rest of the app (after the auth handler)
app.use(express.json());

// ---------------------------------------------------------
// ROUTES
// ---------------------------------------------------------

app.use("/api/clinics", clinicsRoutes);
app.use("/api/treatments", treatmentsRoutes);

app.get("/api/scans", async (req, res) => {
    res.json([
        { id: 1, date: "May 15, 2026", score: 85, issues: ["Mild crowding on lower anterior"], improvements: ["No new cavities detected"] },
    ]);
});

app.get("/api/notifications", async (req, res) => {
    res.json([
        { id: 1, title: "Monthly Scan Due", message: "Upload a fresh photo of your teeth.", time: "2 hours ago", type: "alert", unread: true },
    ]);
});

app.listen(port, () => {
    console.log(`Dental Care API running on http://localhost:${port}`);
});
