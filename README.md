# Empower Digital Solutions

A modern, high-performance website for **Empower Digital Solutions**, built to showcase custom web applications, digital services, and the founder's expertise. This project replaces the legacy HTML site with a robust **Astro** architecture, integrated with **React** for interactivity and **Tailwind CSS** for styling.

##  Tech Stack

-   **Framework:** [Astro](https://astro.build) (v5)
-   **UI Library:** [React](https://react.dev) (v19)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com) (v4)
-   **Backend:** [Supabase](https://supabase.com) (Auth & Database)
-   **Icons:** [Lucide React](https://lucide.dev) & [Lucide Astro](https://lucide.dev)
-   **Fonts:** Montserrat (Headings), Open Sans (Body) via Google Fonts
-   **Deployment:** Vercel

##  Key Features

-   **High Performance:** Static Site Generation (SSG) with Astro for lightning-fast load times.
-   **Modern Design:** Custom dark/light theme, glassmorphism effects, and responsive layouts.
-   **Fully Responsive:** Optimised for all devices, from mobile phones to large desktops.
-   **Client Portal:** Secure login for clients to view project status, tasks, and files (Supabase Auth).
-   **Admin Dashboard:** Internal tool for managing projects and clients.
-   **Production Ready:**
    -   **SEO:** Sitemap and Robots.txt configured.
    -   **Analytics:** Integrated Vercel Analytics.
    -   **PWA:** Installable as a native app with Web Manifest.
-   **Custom Components:**
    -   Interactive **Project Showcase** with filtering.
    -   **"Inbox Zero" Terminal Demo** (React).
    -   **Theme Toggle** for dark/light mode preference.
    -   **Auto-Scrolling Carousels** for feature showcases.
-   **Dedicated Pages:**
    -   **Home:** Hero section, portfolio grid, testimonials, and trust signals.
    -   **Services:** "Fork in the Road" gateway to Web Design or Consulting.
    -   **Web Design:** Bespoke website and platform development.
    -   **Consulting:** Digital strategy, fractional CTO, and audits.
    -   **MVP Development:** Tiered pricing for internal tools and SaaS products.
    -   **Client Portal:** Secure area for client project management.
    -   **About:** Founder's story and core values.
    -   **Contact:** Integrated contact form.
    -   **Migration Guide:** Digital protocol for domain migration (Web & PDF).
    -   **404:** Custom "Lost in the Digital Void" error page.

##  Project Structure

```text
/
├── public/             # Static assets (images, PDFs, favicon)
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, Cards)
│   ├── data/           # Static data files (projects.ts)
│   ├── layouts/        # Page layouts (Layout.astro)
│   ├── lib/            # Utility functions (supabase.ts)
│   ├── pages/          # Route definitions (index.astro, about.astro, etc.)
│   └── styles/         # Global CSS and Tailwind configuration
└── package.json        # Project dependencies and scripts
```

## Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

##  Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

##  License

© 2025 Empower Digital Solutions. All Rights Reserved.
