# Empower Digital Solutions

A modern, high-performance website for **Empower Digital Solutions**, built to showcase custom web applications, digital services, and the founder's expertise. This project replaces the legacy HTML site with a robust **Astro** architecture, integrated with **React** for interactivity and **Tailwind CSS** for styling.

##  Tech Stack

-   **Framework:** [Astro](https://astro.build) (v5)
-   **UI Library:** [React](https://react.dev) (v19)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com) (v4)
-   **Icons:** [Lucide React](https://lucide.dev) & [Lucide Astro](https://lucide.dev)
-   **Fonts:** Montserrat (Headings), Open Sans (Body) via Google Fonts
-   **Deployment:** Vercel

##  Key Features

-   **High Performance:** Static Site Generation (SSG) with Astro for lightning-fast load times.
-   **Modern Design:** Custom dark/light theme, glassmorphism effects, and responsive layouts.
-   **Fully Responsive:** Optimized for all devices, from mobile phones to large desktops.
-   **Custom Components:**
    -   Interactive **Project Showcase** with filtering.
    -   **"Inbox Zero" Terminal Demo** (React).
    -   **Theme Toggle** for dark/light mode preference.
-   **Dedicated Pages:**
    -   **Home:** Hero section, portfolio grid, testimonials.
    -   **Services:** Detailed service offerings with FAQ and migration guide.
    -   **Custom Apps:** Showcase of bespoke web applications.
    -   **About:** Founder's story and core values.
    -   **Contact:** Integrated contact form.
    -   **Migration Guide:** Digital protocol for domain migration (Web & PDF).

##  Project Structure

```text
/
├── public/             # Static assets (images, PDFs, favicon)
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, Cards)
│   ├── data/           # Static data files (projects.ts)
│   ├── layouts/        # Page layouts (Layout.astro)
│   ├── pages/          # Route definitions (index.astro, about.astro, etc.)
│   └── styles/         # Global CSS and Tailwind configuration
└── package.json        # Project dependencies and scripts
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
