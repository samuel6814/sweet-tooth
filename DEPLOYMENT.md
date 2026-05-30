# Deployment Guide — Sweet Tooth

**Architecture**

- **Frontend** → Vercel (already live): https://sweet-tooth-nine.vercel.app/
- **Backend** → Render (Node/Express + Better Auth + Prisma)
- **Database** → Neon (PostgreSQL)
- **AI** → Google Gemini · **Image scan** → Laravel Cloud API

> ⚠️ The frontend and backend run on **different domains**, so the session
> cookie must be `SameSite=None; Secure`. This is already handled in
> `server/src/config/auth.js` and activates automatically whenever
> `BETTER_AUTH_URL` is an `https://` URL.

---

## 1. Deploy the backend to Render

1. Push your latest code to GitHub (`main`).
2. In the [Render dashboard](https://dashboard.render.com/) → **New → Web Service** → connect the `sweet-tooth` repo.
3. Configure the service:

   | Setting | Value |
   |---|---|
   | **Root Directory** | `server` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free (or higher) |

   `npm install` triggers the `postinstall` script (`prisma generate`), and
   `npm start` runs `node src/index.js`. Render injects `PORT` automatically —
   the app already reads `process.env.PORT`.

4. Add **Environment Variables** (Render → your service → *Environment*).
   Copy the values from your local `server/.env`:

   | Key | Value / Notes |
   |---|---|
   | `DATABASE_URL` | Neon pooled connection string |
   | `DIRECT_URL` | Neon direct connection string |
   | `BETTER_AUTH_SECRET` | your existing long random secret |
   | `BETTER_AUTH_URL` | **Your Render URL**, e.g. `https://sweet-tooth-api.onrender.com` |
   | `GEMINI_API_KEY` | Google Gemini API key (required for the AI consultant) |
   | `CLOUD_NAME` | Cloudinary cloud name |
   | `CLOUDINARY_URL` | Cloudinary URL |
   | `NODE_ENV` | `production` |

   > Do **not** set `PORT` — Render manages it.
   > `BETTER_AUTH_URL` **must** be the public `https://` Render URL (no trailing slash).
   > Getting it right is what flips cookies into cross-site (`SameSite=None`) mode.

5. Click **Create Web Service** and wait for the first deploy. Note the public URL
   (e.g. `https://sweet-tooth-api.onrender.com`).

### Database schema

The app uses the same Neon database as local development, so the tables already
exist. If you ever point at a **fresh** database, push the schema once:

```bash
cd server
npx prisma db push    # creates user / session / account / verification tables
```

### Verify the backend

```bash
curl -i https://YOUR-RENDER-URL.onrender.com/api/treatments/braces
# Expect HTTP 200 with JSON

curl -i -X POST https://YOUR-RENDER-URL.onrender.com/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -H "Origin: https://sweet-tooth-nine.vercel.app" \
  -d '{"email":"test@example.com","password":"password123"}'
# Expect HTTP 200 with a Set-Cookie containing "SameSite=None; Secure"
```

---

## 2. Point the frontend (Vercel) at the backend

1. Vercel dashboard → your project → **Settings → Environment Variables**.
2. Set (Production scope):

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://YOUR-RENDER-URL.onrender.com` (no trailing slash) |
   | `VITE_LARAVEL_API_URL` | `https://fix-my-teeth-main-p5gegx.free.laravel.cloud` |
   | `VITE_CLOUDINARY_UPLOAD_PRESET` | your preset |
   | `VITE_CLOUDINARY_CLOUD_NAME` | `dilugbs7g` |

   > Vite inlines `VITE_*` vars at **build time**, so you must **redeploy**
   > after changing them.

3. Trigger a redeploy: Vercel → **Deployments → ⋯ → Redeploy** (or push a commit).

### Vercel SPA routing

This is a client-side routed React app. Make sure deep links (e.g.
`/treatments/braces`, `/dashboard`) don't 404 on refresh. If they do, add a
`vercel.json` at the **client** root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

(If your Vercel project root is the repo root, set the project's **Root
Directory** to `client` in Vercel settings, with Build Command `npm run build`
and Output Directory `dist`.)

---

## 3. CORS / trusted origins (already configured)

No action needed — the backend already allows your frontend:

- **CORS** (`server/src/index.js`): allows `localhost` (any port) and all
  `*.vercel.app` origins, with `credentials: true`.
- **Better Auth `trustedOrigins`** (`server/src/config/auth.js`): includes
  `https://*.vercel.app`, which covers `sweet-tooth-nine.vercel.app`.

If you later add a **custom domain**, add it to `trustedOrigins` and to the CORS
allow-list, then redeploy the backend.

---

## 4. Post-deploy smoke test

On https://sweet-tooth-nine.vercel.app/ :

1. **Sign up / Log in** → you should land on `/dashboard` and stay logged in
   after a refresh (confirms cross-site cookies work).
2. **Settings** → change your name → *Save Changes* succeeds.
3. **Treatments → any treatment → AI chat** → send a message / upload a photo
   → you get a Gemini response (confirms `GEMINI_API_KEY` is set on Render).
4. **Start Free Scan** → upload a photo → results render (Laravel API).

---

## Common gotchas

| Symptom | Cause / Fix |
|---|---|
| Login works but refresh logs you out | `BETTER_AUTH_URL` not set to the `https` Render URL → cookie stays `SameSite=Lax`. Fix the env var and redeploy. |
| `Invalid origin` on auth calls | Frontend origin not in `trustedOrigins`. Add it and redeploy backend. |
| CORS error in console | Frontend origin not allowed in `server/src/index.js` CORS. Add it and redeploy. |
| AI chat returns 503 | `GEMINI_API_KEY` missing on Render. |
| First request after idle is slow | Render free tier cold-starts; upgrade the instance to avoid spin-down. |
| API calls hit `localhost:8000` in prod | `VITE_API_BASE_URL` not set on Vercel, or you didn't redeploy after setting it. |
