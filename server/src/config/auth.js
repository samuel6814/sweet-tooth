import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8000",
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
