# Sweet Tooth Backend & Integration Strategy

## 1. Core Tech Stack

| Component | Technology |
|------------|------------|
| Database | Neon (Serverless PostgreSQL) |
| Authentication | BetterAuth (Handles sessions, OAuth, and email/password securely) |
| Image Storage | Cloudinary (Handles image transformation, optimization, and secure storage) |
| AI Engine | Google Gemini API (Processes dental scans and provides natural language feedback) |

---

## 2. Infrastructure Flow

### A. Authentication & Session Flow

#### BetterAuth Integration
- BetterAuth manages the user schema in Neon.

#### Flow
1. User logs in.
2. BetterAuth issues a secure, HTTP-only session cookie.
3. Session cookies provide improved security compared to `localStorage`.
4. Token rotation is handled automatically.

#### Middleware Protection
- Every request to:
  - `/api/user/*`
  - `/api/scans/*`

  is protected using BetterAuth middleware to ensure only authenticated sessions can access resources.

---

### B. The Scan-to-AI Pipeline ("Scan Flow")

#### 1. Frontend Upload
- The React frontend uses the **Cloudinary Upload Widget** with signed uploads.
- Images are uploaded directly to Cloudinary.
- This bypasses the backend and reduces server load.

#### 2. Database Synchronization
After a successful upload, Cloudinary returns:

- `image_url`
- `public_id`

The frontend sends this information to the backend:

```http
POST /api/scans/init
```

#### 3. Analysis via Gemini

The backend:

1. Receives the `image_url`.
2. Calls the Gemini API using a vision-enabled model:
   - `gemini-1.5-flash`
   - `gemini-1.5-pro`

##### Prompt Engineering

```text
You are a professional dental consultant.

Analyze this image for:
- Plaque
- Alignment
- General oral health

Return a structured JSON object containing:
- score (1-100)
- observations (array)
- recommendations (array)
```

#### 4. Result Storage

The backend:

1. Parses Gemini's JSON response.
2. Saves the analysis results to Neon.
3. Triggers a frontend notification indicating completion.

---

## 3. API & Connectivity Architecture

| Service | Responsibility | Connectivity Logic |
|----------|---------------|-------------------|
| BetterAuth | Users & Authentication | Server-side session verification |
| Cloudinary | Image Storage | Client-side direct upload; URL stored in database |
| Neon | Data Storage | PostgreSQL accessed via Prisma or Drizzle ORM |
| Gemini API | AI Intelligence | Server-side POST request to Google AI Studio |

---

## 4. Implementation Steps (To-Do List)

### Phase 1: Authentication & Database

- [ ] Set up Neon database connection string.
- [ ] Configure BetterAuth with Neon as the database adapter.
- [ ] Create user schema:
  - email
  - name
  - scan_history_id

---

### Phase 2: Media & Intelligence

- [ ] Integrate Cloudinary Upload Widget in:

```text
src/pages/features/NewScan.jsx
```

- [ ] Create server-side endpoint:

```http
POST /api/analyze
```

#### Endpoint Responsibilities

1. Receive the `image_url` from Cloudinary.
2. Send the image to Gemini API with the dental analysis prompt.
3. Save the Gemini JSON response to Neon.

---

### Phase 3: Frontend Synchronization

- [ ] Use the `useAuth` hook from BetterAuth in `UserLayout` to determine authentication state.
- [ ] Update `UserNavbar` with conditional rendering:
  - Profile
  - Log In
  - Log Out
- [ ] Build a dashboard results-listener component that:
  - Queries scan history from Neon.
  - Displays completed analyses after processing.

---

## 5. Security & Best Practices

### API Key Protection

**Never expose:**

- Gemini API Key
- Cloudinary API Secret

All AI processing must occur on the Node.js backend.

---

### Environment Variables

Store secrets in `.env`:

```env
CLOUDINARY_URL=
GEMINI_API_KEY=
NEON_DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

### Rate Limiting

Implement rate limiting on:

```http
POST /api/analyze
```

This prevents:

- Abuse of the Gemini API
- Excessive usage costs
- Unauthorized request spamming

---

## High-Level Architecture Diagram

```text
┌──────────────┐
│ React Client │
└──────┬───────┘
       │
       │ Upload Image
       ▼
┌──────────────┐
│ Cloudinary   │
└──────┬───────┘
       │ image_url
       ▼
┌──────────────┐
│ Node.js API  │
└───┬─────┬────┘
    │     │
    │     ▼
    │  Gemini API
    │  (Dental Analysis)
    │
    ▼
┌──────────────┐
│ Neon DB      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Dashboard UI │
└──────────────┘

Authentication Flow:
User → BetterAuth → Session Cookie → Protected API Routes
```
