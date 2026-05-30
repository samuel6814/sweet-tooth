# Product Requirements Document (PRD): Dental Vision API
**Date:** May 30, 2026
**Framework:** MfGA v2.1 (Strict MVP Mandate)
**Status:** Architecture Locked - Zero Feature Creep Tolerated

## 1. Executive Summary
This document outlines the strict Minimum Viable Product (MVP) for the Hackathon Dentist Application. The system is a decoupled architecture consisting of a standalone React frontend (hosted on Vercel) and a headless Laravel 13 API backend. 

The core mechanic utilizes Gemini AI (via the official Laravel AI SDK) to perform non-diagnostic visual analyses of dental imagery. This is supplemented by an automated product recommendation tool sourced from a local database, which is managed via the Moonshine CMS.

## 2. Infrastructure & Database Strategy
To optimize for speed and cost during the hackathon, the database tier is split:

* **Local Development (Backend):** `SQLite` (Zero-config, fast iteration).
* **Production (Backend):** `Neon Serverless PostgreSQL` (Hosted via Laravel Cloud / external).
* **Frontend:** `Vercel` (React SPA).

**CRITICAL CONSTRAINT:** All database migrations and Eloquent queries MUST be strictly database-agnostic. Do not use Postgres-specific raw queries (e.g., raw JSONB path operators) that will cause local SQLite instances to crash. Rely purely on Laravel's ORM and Schema Builder.

## 3. Tech Stack & Required Packages
* **PHP:** `8.5` (Strictly typed; no deprecated functions. Requires `ext-pdo_pgsql` and `ext-sqlite3`).
* **Framework:** `Laravel 13.x`

### Mandatory Packages
* **[Laravel Restify](https://laravel-restify.com/)** (`binaryk/laravel-restify`)
  * *Command:* `composer require binaryk/laravel-restify`
  * *Purpose:* Instantly turns Eloquent models into JSON:API compliant endpoints. Provides automatic routing and standard filtering.
* **[Laravel AI SDK](https://github.com/laravel/ai)** (`laravel/ai`)
  * *Command:* `composer require laravel/ai`
  * *Purpose:* First-party SDK for unified LLM interaction. We will use the Agent class with the Gemini model, utilizing structured outputs and internal Tools (`SearchProductsTool`) to guarantee deterministic JSON.
* **[Moonshine CMS](https://moonshine.cutcode.dev/)** (`moonshine/moonshine`)
  * *Command:* `composer require moonshine/moonshine`
  * *Purpose:* Lightning-fast admin panel for dentists to manage the `Product` database. Must be version `^3.13` or higher for security.

## 4. Strict Scope & User Stories (MVP)
1. **User - Upload & Analyze:** As a user, I can upload a photo of my teeth (`multipart/form-data`) from the React app so that I receive an instant, non-diagnostic visual assessment and relevant product recommendations.
2. **Frontend Dev - Deterministic Data:** As the frontend developer, I expect the `/api/restify/teeth-scans` endpoint to always return a strictly typed JSON object (even on AI failure) so that my UI components never break during the live demo.
3. **Dentist (Admin) - Product Management:** As an administrator, I can log into the Moonshine CMS backend to create, read, update, and delete dental products (e.g., floss, braces) so that they populate in the user's recommendation feed.

## 5. The Core Data Contract (JSON Schema)
The Gemini Agent is strictly configured via the Laravel AI SDK `structuredOutput` method to return this exact schema. The AI is **forbidden** from returning diagnostic medical claims.

```json
{
  "status": "success",
  "data": {
    "enamel_coloration": "uniform | localized_white_spots | localized_dark_spots",
    "gum_tissue_color": "light_pink | bright_red | dark_purple",
    "gum_inflammation_visible": boolean,
    "calculus_or_plaque_visible": boolean,
    "visible_chips_or_cracks": boolean,
    "crowding_or_spacing_issues": boolean,
    "gum_recession_signs": boolean,
    "visual_summary": "string (Max 2 sentences describing the observable state)",
    "recommended_products": [
      {
        "name": "string",
        "category": "string",
        "price": "float",
        "purchase_link": "string (URL)",
        "image_url": "string (URL)"
      }
    ]
  },
  "disclaimer": "Always cross-check visual observations with a professional dentist."
}

```

## 6. Security, Networking, & Fault Tolerance Guardrails

* **Rate Limiting:** The analysis endpoint is strictly throttled to **5 requests per minute, per IP**.
* **CORS Configuration:** `config/cors.php` must explicitly whitelist:
* `http://localhost:5173` (React Local)
* `http://localhost:3000` (React Local Alt)
* `https://*.vercel.app` (Production)


* **Data Retention:** Images are processed in temporary memory and **deleted immediately** post-analysis.
* **Graceful Degradation:** If the Gemini API times out (8-second strict limit) or throws an error, the Laravel backend will intercept and return a 200 OK fallback JSON state with `status: "fallback"` and safe default values.
* **Web Scraping:** Live web scraping is strictly forbidden.

## 7. Mandatory Environment Variables (Backend)

```env
# Database (Local)
DB_CONNECTION=sqlite

# Database (Production on Neon)
# DB_CONNECTION=pgsql
# DB_HOST=ep-example-host.us-east-2.aws.neon.tech
# DB_PORT=5432
# DB_DATABASE=neondb
# DB_USERNAME=your_user
# DB_PASSWORD=your_password

# AI 
GEMINI_API_KEY=your_gemini_api_key

# Filesystem (Temporary processing)
FILESYSTEM_DISK=local

```

---

**End of Document** - *Do not deviate from this blueprint.*
