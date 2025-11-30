import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BhDW_YFo.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_ClrL5xxS.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Laptop, Brain, Calculator, Palette, ExternalLink } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const categories = [
  {
    id: "saas",
    label: "SaaS & Portals",
    icon: Laptop,
    description: "Scalable platforms, secure vaults, and booking engines.",
    projects: [
      "vowsuite",
      "va-assist",
      "client-portal",
      "project-dana",
      "medi-sync"
    ]
  },
  {
    id: "ai",
    label: "AI & Automation",
    icon: Brain,
    description: "Generative AI agents and automated workflow scripts.",
    projects: [
      "ai-wedding-planner",
      "project-voyager",
      "trade-pro",
      "inbox-zero",
      "automated-invoice-process"
    ]
  },
  {
    id: "fintech",
    label: "FinTech & Logic",
    icon: Calculator,
    description: "ROI calculators, tax forecasting, and financial modeling.",
    projects: [
      "finance-ninja",
      "isa-time-machine",
      "quote-command",
      "automation-roi-calculator",
      "automation-grader"
    ]
  },
  {
    id: "web",
    label: "High-Performance Web",
    icon: Palette,
    description: "Award-winning design, motion graphics, and 100/100 performance.",
    projects: [
      "cairn-architects",
      "zen-den",
      "aura",
      "urban-stay",
      "bistro-44"
    ]
  }
];
function ProjectShowcase({ allProjects }) {
  const [activeCategory, setActiveCategory] = useState("saas");
  const getProjectsForCategory = (catId) => {
    const category = categories.find((c) => c.id === catId);
    return category.projects.map((slug) => allProjects.find((p) => p.slug === slug)).filter(Boolean);
  };
  const currentProjects = getProjectsForCategory(activeCategory);
  return /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-3 space-y-2", children: categories.map((cat) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setActiveCategory(cat.id),
        className: `w-full text-left p-4 rounded-xl transition-all duration-300 border ${activeCategory === cat.id ? "bg-purple-900/20 border-purple-500 text-white" : "bg-transparent border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(cat.icon, { className: `w-5 h-5 ${activeCategory === cat.id ? "text-purple-400" : "text-slate-500"}` }),
            /* @__PURE__ */ jsx("span", { className: "font-bold", children: cat.label })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs opacity-70 pl-8 hidden md:block", children: cat.description })
        ]
      },
      cat.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-9", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: currentProjects.map((project) => /* @__PURE__ */ jsxs("div", { className: "group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:-translate-y-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-48 overflow-hidden relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-slate-900 to-transparent z-10 opacity-60" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: project.thumbnail,
            alt: project.title,
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 z-20", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold uppercase rounded border ${project.status === "live" ? "bg-green-900/80 border-green-500 text-green-300" : "bg-amber-900/80 border-amber-500 text-amber-300"}`, children: project.status }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors", children: project.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-4 line-clamp-2", children: project.shortTagline }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: project.techStack.slice(0, 3).map((tech) => /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-purple-300 bg-purple-900/20 px-2 py-1 rounded", children: tech }, tech)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t border-slate-800", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 font-mono", children: project.year }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: project.liveUrl && project.liveUrl !== "#" && /* @__PURE__ */ jsxs(
            "a",
            {
              href: project.liveUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "flex items-center gap-1 text-sm font-bold text-white hover:text-purple-400 transition-colors",
              children: [
                "Live Demo ",
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
              ]
            }
          ) })
        ] })
      ] })
    ] }, project.slug)) }) })
  ] }) });
}

const projects = [
  // SaaS & Portals
  {
    slug: "vowsuite",
    title: "VowSuite",
    shortTagline: "Full-stack wedding planning ecosystem.",
    thumbnail: "/images/project_placeholder.png",
    // Placeholder or use existing if available
    techStack: ["React", "Node.js", "PostgreSQL"],
    year: "2024",
    liveUrl: "https://empowervaservices.co.uk/wedding-webapp/",
    status: "live"
  },
  {
    slug: "va-assist",
    title: "VAAssist",
    shortTagline: "Task management for virtual assistants.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Vue.js", "Firebase", "Tailwind"],
    year: "2024",
    liveUrl: "/vaassist",
    status: "beta"
  },
  {
    slug: "client-portal",
    title: "Empower Client Portal",
    shortTagline: "Frictionless customer onboarding and file sharing.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["React", "Supabase", "Stripe"],
    year: "2025",
    liveUrl: "/clientportal",
    status: "dev"
  },
  {
    slug: "project-dana",
    title: "Project DANA",
    shortTagline: "Secure legal document automation vault.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Next.js", "AWS", "Python"],
    year: "2025",
    liveUrl: "/digitalplanner",
    status: "concept"
  },
  {
    slug: "urban-stay",
    title: "Urban Stay",
    shortTagline: "Direct booking engine for rental properties.",
    thumbnail: "/images/urbanstaythumbnail.png",
    techStack: ["Next.js", "Vercel", "Stripe"],
    year: "2024",
    liveUrl: "https://urban-stay-seven.vercel.app/",
    status: "live"
  },
  {
    slug: "bistro-44",
    title: "Bistro 44",
    shortTagline: "Restaurant reservation and table management.",
    thumbnail: "/images/bistro44thumbnail.png",
    techStack: ["Astro", "React", "Tailwind"],
    year: "2024",
    liveUrl: "https://portfolio-nicola-berry.vercel.app/?project=bistro-44",
    status: "live"
  },
  {
    slug: "medi-sync",
    title: "Medi-Sync",
    shortTagline: "HIPAA-compliant health management portal.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["React", "Node.js", "MongoDB"],
    year: "2024",
    liveUrl: "#",
    status: "concept"
  },
  // AI & Automation
  {
    slug: "ai-wedding-planner",
    title: "AI Wedding Planner",
    shortTagline: "Generative AI for wedding itineraries and vows.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["OpenAI API", "Python", "React"],
    year: "2025",
    liveUrl: "#",
    status: "beta"
  },
  {
    slug: "project-voyager",
    title: "Project Voyager",
    shortTagline: "AI-driven travel itinerary generation.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["LangChain", "Next.js", "Mapbox"],
    year: "2025",
    liveUrl: "#",
    status: "dev"
  },
  {
    slug: "trade-pro",
    title: "TradePro",
    shortTagline: "AI tools for tradespeople: quoting and scheduling.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["React Native", "Firebase", "Stripe"],
    year: "2024",
    liveUrl: "https://empowervaservices.co.uk/uber-for-trades/",
    status: "live"
  },
  {
    slug: "inbox-zero",
    title: "Inbox Zero",
    shortTagline: "Email processing and classification engine.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Python", "Gmail API", "OpenAI"],
    year: "2024",
    liveUrl: "/inbox-zero",
    status: "internal"
  },
  {
    slug: "automated-invoice-process",
    title: "AutoInvoice",
    shortTagline: "End-to-end automated invoicing workflow.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Zapier", "Python", "Xero API"],
    year: "2023",
    liveUrl: "#",
    status: "live"
  },
  // FinTech & Logic
  {
    slug: "finance-ninja",
    title: "Finance Ninja",
    shortTagline: "Investment portfolio tracking and ROI analysis.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Vue.js", "D3.js", "Plaid API"],
    year: "2024",
    liveUrl: "#",
    status: "beta"
  },
  {
    slug: "isa-time-machine",
    title: "ISA Time Machine",
    shortTagline: "Long-term savings projection algorithms.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["React", "Chart.js", "Math.js"],
    year: "2024",
    liveUrl: "#",
    status: "live"
  },
  {
    slug: "quote-command",
    title: "Quote Command",
    shortTagline: "Dynamic proposal generation engine.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Next.js", "Puppeteer", "Stripe"],
    year: "2024",
    liveUrl: "#",
    status: "live"
  },
  {
    slug: "automation-roi-calculator",
    title: "Automation ROI Calc",
    shortTagline: "Calculate the value of automating your workflows.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["React", "Tailwind"],
    year: "2023",
    liveUrl: "#",
    status: "live"
  },
  {
    slug: "automation-grader",
    title: "Automation Grader",
    shortTagline: "Assess your business automation maturity.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Typeform", "Zapier", "Notion"],
    year: "2023",
    liveUrl: "#",
    status: "live"
  },
  // High-Performance Web
  {
    slug: "cairn-architects",
    title: "Cairn Architects",
    shortTagline: "Minimalist architecture portfolio.",
    thumbnail: "/images/cairnthumbnail.png",
    techStack: ["Astro", "React", "Tailwind"],
    year: "2024",
    liveUrl: "https://cairn-architects.vercel.app/",
    status: "live"
  },
  {
    slug: "zen-den",
    title: "The Zen Den",
    shortTagline: "Wellness studio booking and info site.",
    thumbnail: "/images/Zendenthumbnail.png",
    techStack: ["Next.js", "Framer Motion", "Tailwind"],
    year: "2024",
    liveUrl: "https://zen-den-azure.vercel.app/",
    status: "live"
  },
  {
    slug: "aura",
    title: "Aura",
    shortTagline: "Luxury brand e-commerce experience.",
    thumbnail: "/images/aurathumbnail.png",
    techStack: ["Shopify", "Liquid", "Tailwind"],
    year: "2024",
    liveUrl: "https://aura-nine-ochre.vercel.app/",
    status: "live"
  },
  {
    slug: "memory-match-game",
    title: "Memory Match",
    shortTagline: "Interactive browser-based game.",
    thumbnail: "/images/project_placeholder.png",
    techStack: ["Vanilla JS", "CSS3", "HTML5"],
    year: "2023",
    liveUrl: "#",
    status: "live"
  }
];

const $$Customwebapps = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Custom Web Apps | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-slate-950 pt-32 pb-20 px-4 text-center" style="background-color: #020617;"> <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6"> <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
Engineered
</span> for Growth
</h1> <p class="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
We don't just build websites. We build <span class="text-white font-bold">business assets</span>. 
      From AI agents to financial forecasting tools, explore our library of custom solutions.
</p> </section> <section class="bg-slate-950 pb-20" style="background-color: #020617;"> ${renderComponent($$result2, "ProjectShowcase", ProjectShowcase, { "allProjects": projects, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/ProjectShowcase.jsx", "client:component-export": "default" })} </section> <section class="py-20 bg-purple-900/20 border-t border-purple-900/50" style="background-color: rgba(88, 28, 135, 0.2); border-color: rgba(88, 28, 135, 0.5);"> <div class="max-w-4xl mx-auto text-center px-4"> <h2 class="text-3xl font-bold text-white mb-6">See a solution that fits your business?</h2> <p class="text-slate-300 mb-8">
We can clone, customize, or rebuild any of these architectures for your specific needs.
</p> <a href="/contact" class="inline-block bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-purple-100 transition-colors">
Discuss Your Project
</a> </div> </section> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/customwebapps.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/customwebapps.astro";
const $$url = "/customwebapps";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Customwebapps,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
