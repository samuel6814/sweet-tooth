# Sweet Tooth - AI Dental Care Platform

A modern, high-performance web application designed to revolutionize dental care. This platform features a luxurious, visually engaging landing page and a dashboard that integrates with a server-side AI to analyze dental scans and recommend treatments.

##  Features

* **Interactive Landing Page:** Built with React, Framer Motion, and GSAP for a smooth, premium user experience.
* **AI Teeth Scanning (WIP):** A dedicated user dashboard that allows patients to upload dental scans. The server-side AI processes the scan and outputs immediate treatment insights (e.g., invisible braces, whitening, general dentistry).
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
* **Modern Styling:** Utilizes `styled-components` for modular, scoped, and maintainable CSS.

##  Tech Stack

**Client-Side:**
* [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
* [React Router](https://reactrouter.com/) (Client-side routing)
* [Styled Components](https://styled-components.com/) (CSS-in-JS)
* [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/) (Animations)
* [Lucide React](https://lucide.dev/) (Iconography)
* [Better Auth](https://better-auth.com/) (Authentication UI/SDK)

**Server-Side:**
* *Node*

##  File Structure

```text
.
├── client                  # Vite React Front-End
│   ├── public              # Static assets (images, 3D graphics)
│   ├── src
│   │   ├── components      # Reusable UI components (Navbar, Footer)
│   │   ├── pages
│   │   │   ├── auth        # Login/Register pages
│   │   │   ├── home        # Landing page components (Hero, Artistry, Experience)
│   │   │   └── user        # Dashboard and AI scanner interface
│   │   ├── App.jsx         # Root layout and global wrappers
│   │   └── main.jsx        # Entry point and Router configuration
│   ├── package.json
│   └── vite.config.js
└── server                  # Backend & AI Model (WIP)

git clone [https://github.com/yourusername/dental-ai-app.git](https://github.com/yourusername/dental-ai-app.git)
    cd dental-ai-app
    ```

2.  Navigate to the client directory and install dependencies:
```bash
    cd client
    npm install
    ```

3.  Start the development server:
```bash
    npm run dev
    ```

4.  Open your browser and navigate to the localhost URL provided in your terminal (usually `http://localhost:5173`).

## Design & Assets
The UI is inspired by high-end dental aesthetics, utilizing a primary color palette of deep blues (`#00658d`) and vibrant orange/coral accents (`#a93100`), paired with modern typography (`Bebas Neue` and `Hanken Grotesk`).