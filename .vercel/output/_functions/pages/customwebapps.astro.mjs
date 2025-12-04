import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BVdSWecw.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BWhIpZcS.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Laptop, Brain, Calculator, Palette, ExternalLink, Banknote, BrainCircuit, HelpCircle, Check, FileText, Calendar, MessageSquare } from 'lucide-react';
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
      "trade-pro"
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
      "virtual-assistant",
      "automation-specialist",
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
    thumbnail: "/images/vowsuitethumbnail.png",
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
    thumbnail: "/images/Vaassistthumbnail.png",
    techStack: ["Vue.js", "Firebase", "Tailwind"],
    year: "2024",
    liveUrl: "/vaassist",
    status: "beta"
  },
  {
    slug: "client-portal",
    title: "Empower Client Portal",
    shortTagline: "Frictionless customer onboarding and file sharing.",
    thumbnail: "/images/clientportalthumbnail.png",
    techStack: ["React", "Supabase", "Stripe"],
    year: "2025",
    liveUrl: "/clientportal",
    status: "dev"
  },
  {
    slug: "project-dana",
    title: "Project DANA",
    shortTagline: "Secure legal document automation vault.",
    thumbnail: "/images/Danathumbnail.png",
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
    thumbnail: "/images/Medisyncthumbnail.png",
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
    thumbnail: "/images/Weddingthumbnail.png",
    techStack: ["OpenAI API", "Python", "React"],
    year: "2025",
    liveUrl: "#",
    status: "beta"
  },
  {
    slug: "project-voyager",
    title: "Project Voyager",
    shortTagline: "AI-driven travel itinerary generation.",
    thumbnail: "/images/Voyagerthumbnail.png",
    techStack: ["LangChain", "Next.js", "Mapbox"],
    year: "2025",
    liveUrl: "#",
    status: "dev"
  },
  {
    slug: "trade-pro",
    title: "TradePro",
    shortTagline: "AI tools for tradespeople: quoting and scheduling.",
    thumbnail: "/images/Tradeprothumbnail.png",
    techStack: ["React Native", "Firebase", "Stripe"],
    year: "2024",
    liveUrl: "https://empowervaservices.co.uk/uber-for-trades/",
    status: "live"
  },
  // FinTech & Logic
  {
    slug: "finance-ninja",
    title: "Finance Ninja",
    shortTagline: "Investment portfolio tracking and ROI analysis.",
    thumbnail: "/images/Financeninjathumbnail.png",
    techStack: ["Vue.js", "D3.js", "Plaid API"],
    year: "2024",
    liveUrl: "#",
    status: "beta"
  },
  {
    slug: "isa-time-machine",
    title: "ISA Time Machine",
    shortTagline: "Long-term savings projection algorithms.",
    thumbnail: "/images/Isathumbnail.png",
    techStack: ["React", "Chart.js", "Math.js"],
    year: "2024",
    liveUrl: "#",
    status: "live"
  },
  {
    slug: "quote-command",
    title: "Quote Command",
    shortTagline: "Dynamic proposal generation engine.",
    thumbnail: "/images/quotecommandthumbnail.png",
    techStack: ["Next.js", "Puppeteer", "Stripe"],
    year: "2024",
    liveUrl: "#",
    status: "live"
  },
  {
    slug: "automation-roi-calculator",
    title: "Automation ROI Calc",
    shortTagline: "Calculate the value of automating your workflows.",
    thumbnail: "/images/autoroithumbnail.png",
    techStack: ["React", "Tailwind"],
    year: "2023",
    liveUrl: "#",
    status: "live"
  },
  {
    slug: "automation-grader",
    title: "Automation Grader",
    shortTagline: "Assess your business automation maturity.",
    thumbnail: "/images/Autograderthumbnail.png",
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
    slug: "automation-specialist",
    title: "Empower Automation",
    shortTagline: "Custom Google Workspace Automation & Business Process Optimisation*",
    thumbnail: "/images/empowerautothumbnail.png",
    techStack: ["Astro", "React", "Tailwind"],
    year: "2024",
    liveUrl: "https://empower-automation.vercel.app/",
    status: "live"
  },
  {
    slug: "virtual-assistant",
    title: "Empower Virtual Assistant",
    shortTagline: "Virtual Assistant Operating System.",
    thumbnail: "/images/empowervathumbnail.png",
    techStack: ["Astro", "React", "Tailwind"],
    year: "2024",
    liveUrl: "https://virtual-assistant-services-7ynr.vercel.app/",
    status: "live"
  }
];

const $$EmpowerSystemsSales = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"> <!-- Hero Section --> <div class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 text-white relative overflow-hidden"> <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"> <h2 class="text-4xl md:text-6xl font-bold mb-6">
Stop Paying for<br> <span class="text-empower-pink">Software That Sucks</span> </h2> <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
I build custom web apps that actually solve your problems. No
                monthly fees. No feature limitations. Just systems that work the
                way <em>you</em> work.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center"> <a href="#demos" class="bg-white text-purple-900 px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all">
Show Me How It Works
</a> </div> </div> </div> <!-- Problem Section --> <div class="py-16 bg-gray-50 dark:bg-slate-800"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold mb-4">
Sound Familiar?
</h2> <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
After 3 years as a Virtual Assistant, I kept seeing the same
                    expensive problems...
</p> </div> <div class="grid md:grid-cols-3 gap-8"> <div class="text-center p-6 bg-white dark:bg-slate-700 rounded-xl shadow-sm"> <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result, "Banknote", Banknote, { "className": "w-8 h-8 text-red-500" })} </div> <h3 class="text-xl font-semibold mb-3">
Subscription Hell
</h3> <p class="text-gray-600 dark:text-gray-300">
Calendly, Dubsado, DocuSign, Dropbox... £200+ per month
                        for tools that don't even talk to each other.
</p> </div> <div class="text-center p-6 bg-white dark:bg-slate-700 rounded-xl shadow-sm"> <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result, "BrainCircuit", BrainCircuit, { "className": "w-8 h-8 text-red-500" })} </div> <h3 class="text-xl font-semibold mb-3">Client Confusion</h3> <p class="text-gray-600 dark:text-gray-300">
"Click this link for contracts, this one for files, this
                        one for booking..." Your clients are getting lost.
</p> </div> <div class="text-center p-6 bg-white dark:bg-slate-700 rounded-xl shadow-sm"> <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result, "HelpCircle", HelpCircle, { "className": "w-8 h-8 text-red-500" })} </div> <h3 class="text-xl font-semibold mb-3">
Generic Solutions
</h3> <p class="text-gray-600 dark:text-gray-300">
Your business is unique. Why are you using the same
                        tools as everyone else?
</p> </div> </div> </div> </div> <!-- Solution Section --> <div class="py-16 bg-white dark:bg-slate-900"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold mb-4">
What If Your Business Had Its Own App?
</h2> <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
One login. One dashboard. One monthly fee (zero). Everything
                    your clients need in one professional, branded space.
</p> </div> <div class="grid md:grid-cols-2 gap-12 items-center"> <div> <div class="space-y-6"> <div class="flex items-start"> <div class="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1 shrink-0"> ${renderComponent($$result, "Check", Check, { "className": "w-4 h-4 text-white" })} </div> <div> <h3 class="text-lg font-semibold mb-2">
Eliminate Monthly Subscriptions
</h3> <p class="text-gray-600 dark:text-gray-300">
Build once, own forever. No more £200+
                                    monthly bills eating your profits.
</p> </div> </div> <div class="flex items-start"> <div class="w-6 h-6 bg-empower-pink rounded-full flex items-center justify-center mr-4 mt-1 shrink-0"> ${renderComponent($$result, "Check", Check, { "className": "w-4 h-4 text-white" })} </div> <div> <h3 class="text-lg font-semibold mb-2">
Your Brand, Your Rules
</h3> <p class="text-gray-600 dark:text-gray-300">
Every pixel reflects your business. No more
                                    "Powered by [Insert Generic Tool]" footers.
</p> </div> </div> <div class="flex items-start"> <div class="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1 shrink-0"> ${renderComponent($$result, "Check", Check, { "className": "w-4 h-4 text-white" })} </div> <div> <h3 class="text-lg font-semibold mb-2">
Actually Built for Your Workflow
</h3> <p class="text-gray-600 dark:text-gray-300">
Not "close enough" - exactly right. Because
                                    I understand how real businesses actually
                                    work.
</p> </div> </div> </div> </div> <div class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8"> <div class="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6"> <div class="flex items-center mb-4"> <div class="w-8 h-8 bg-purple-600 rounded-full mr-3"></div> <h4 class="font-semibold">Your Client Portal</h4> </div> <div class="space-y-3"> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800 rounded"> <span class="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"> ${renderComponent($$result, "FileText", FileText, { "className": "w-4 h-4" })} Project Contract
</span> <span class="text-xs text-green-600 dark:text-green-400 font-bold">Signed ✓</span> </div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800 rounded"> <span class="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"> ${renderComponent($$result, "Calendar", Calendar, { "className": "w-4 h-4" })} Next Meeting
</span> <span class="text-xs text-purple-600 dark:text-purple-400 font-bold">Tomorrow 2pm</span> </div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800 rounded"> <span class="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"> ${renderComponent($$result, "MessageSquare", MessageSquare, { "className": "w-4 h-4" })} New Message
</span> <span class="text-xs text-empower-pink font-bold">2 mins ago</span> </div> </div> </div> </div> </div> </div> </div> <!-- Demo Section --> <div id="demos" class="py-16 bg-gray-50 dark:bg-slate-800"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"></div> <a href="#contact" class="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all font-bold">
Let's Build Your Demo
</a> </div> </section> <!-- Process Section --> <div id="how-it-works" class="py-16 bg-white dark:bg-slate-900"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold mb-4">
How We Make This Happen
</h2> <p class="text-xl text-gray-600 dark:text-gray-300">
No technical jargon. No surprises. Just a clear path to your
                custom solution.
</p> </div> <div class="grid md:grid-cols-4 gap-8"> <div class="text-center"> <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"> <span class="text-white font-bold text-xl">1</span> </div> <h3 class="text-lg font-semibold mb-3">Discovery Call</h3> <p class="text-gray-600 dark:text-gray-300">
We chat about your current setup, pain points, and what
                    "perfect" looks like for your business.
</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-empower-pink rounded-full flex items-center justify-center mx-auto mb-4"> <span class="text-white font-bold text-xl">2</span> </div> <h3 class="text-lg font-semibold mb-3">Custom Demo</h3> <p class="text-gray-600 dark:text-gray-300">
I build a working demo with your branding and workflow. You
                    see exactly what you're getting.
</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"> <span class="text-white font-bold text-xl">3</span> </div> <h3 class="text-lg font-semibold mb-3">Build & Test</h3> <p class="text-gray-600 dark:text-gray-300">
I build your system in phases. You test each part, give
                    feedback, and we refine as we go.
</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-empower-pink rounded-full flex items-center justify-center mx-auto mb-4"> <span class="text-white font-bold text-xl">4</span> </div> <h3 class="text-lg font-semibold mb-3">Launch & Support</h3> <p class="text-gray-600 dark:text-gray-300">
Your system goes live. I stick around to make sure
                    everything works perfectly.
</p> </div> </div> </div> </div> <!-- Investment Section --> <div id="pricing" class="py-16 bg-gray-50 dark:bg-slate-800"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold mb-4">Your Investment</h2> <p class="text-xl text-gray-600 dark:text-gray-300">
Custom doesn't mean expensive. It means exactly right for your
                business.
</p> </div> <div class="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8"> <div class="grid md:grid-cols-2 gap-8"> <div> <h3 class="text-2xl font-semibold mb-4">
Simple Business Systems
</h3> <p class="text-gray-600 dark:text-gray-300 mb-6">
Quote calculators, client portals, booking systems,
                        simple dashboards.
</p> <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
£5,000 - £15,000
</div> <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
One-time investment. No monthly fees. Ever.
</p> <ul class="space-y-2 text-gray-600 dark:text-gray-300"> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> Custom design
                            & branding
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> Mobile-responsive
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> Secure hosting
                            included
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> 3 months support
</li> </ul> </div> <div> <h3 class="text-2xl font-semibold mb-4">
Complex Business Systems
</h3> <p class="text-gray-600 dark:text-gray-300 mb-6">
Full client management, automation workflows,
                        integrations, multi-user systems.
</p> <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
£15,000 - £35,000
</div> <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
Compare to £200+/month subscriptions = ROI in year 1
</p> <ul class="space-y-2 text-gray-600 dark:text-gray-300"> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> Everything
                            in Simple, plus:
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> Advanced automation
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> Third-party
                            integrations
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> 6 months support
</li> </ul> </div> </div> <div class="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-600"> <p class="text-gray-600 dark:text-gray-300 mb-4">
Not sure which fits your needs?
</p> <a href="/contact" class="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all font-bold">
Let's Figure It Out Together
</a> </div> </div> </div> </div> <!-- CTA Section --> <div id="contact" class="py-16 bg-gradient-to-r from-slate-900 to-purple-900 text-white"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h2 class="text-3xl md:text-4xl font-bold mb-6">
Ready to Stop Paying for Software That Sucks?
</h2> <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
Let's have a chat about your business. No sales pitch - just a
            conversation about what's possible.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center"> <a href="/contact" class="bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
Book a Discovery Call
</a> <p class="text-gray-300 text-sm flex items-center gap-2">
Or email: <a href="mailto:nicola@empowerdigitalsolutions.co.uk" class="text-white hover:underline">nicola@empowerdigitalsolutions.co.uk</a> </p> </div> </div> </div>`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/EmpowerSystemsSales.astro", void 0);

const $$Customwebapps = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Custom Web Apps | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-slate-950 pt-32 pb-20 px-4 text-center" style="background-color: #020617;"> <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6"> <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
Engineered
</span> for Growth
</h1> <p class="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
We don't just build websites. We build <span class="text-white font-bold">business assets</span>. From AI agents to financial forecasting tools, explore our library of
      custom solutions.
</p> </section> <section class="bg-slate-950 pb-20" style="background-color: #020617;"> ${renderComponent($$result2, "ProjectShowcase", ProjectShowcase, { "allProjects": projects, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/ProjectShowcase.jsx", "client:component-export": "default" })} </section> ${renderComponent($$result2, "EmpowerSystemsSales", $$EmpowerSystemsSales, {})} ` })}`;
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
