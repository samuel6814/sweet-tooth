import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:8000";
// In production the frontend (Vercel) and backend (Render) live on different
// domains, so the session cookie must be SameSite=None + Secure to be sent
// cross-site. Locally we serve over http, so keep the default (Lax) cookie.
const isCrossSite = baseURL.startsWith("https://");

export const auth = betterAuth({
    baseURL,
    // Origins allowed to make auth requests (CSRF protection).
    // Supports wildcards, so all *.vercel.app deployments are trusted.
    trustedOrigins: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://*.vercel.app",
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: isCrossSite
        ? {
              defaultCookieAttributes: {
                  sameSite: "none",
                  secure: true,
              },
          }
        : undefined,
    emailAndPassword: {  
        enabled: true
    },
    user: {
        additionalFields: {
            scan_history_id: {
                type: "string",
                required: false
            }
        }
    }
});
