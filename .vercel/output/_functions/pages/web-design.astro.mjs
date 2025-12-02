import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from '../chunks/astro/server_CsB7TRoA.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BTdPXDjx.mjs';
import { a as $$Zap, $ as $$Shield } from '../chunks/Zap_C6m3207Q.mjs';
import { $ as $$Search } from '../chunks/Search_CKdTTtLs.mjs';
import { $ as $$ } from '../chunks/.Layout_DL66U752.mjs';
import { $ as $$CheckCircle2 } from '../chunks/CheckCircle2_vd_DPFBn.mjs';
import { $ as $$Gauge } from '../chunks/Gauge_C-iSKhd-.mjs';
import { $ as $$ArrowRight } from '../chunks/ArrowRight_BmtYR66u.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$4 = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Database = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Database;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "database", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse> <path d="M3 5V19A9 3 0 0 0 21 19V5"></path> <path d="M3 12A9 3 0 0 0 21 12"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Database.astro", void 0);

const $$Astro$3 = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Layers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layers;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "layers", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path> <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path> <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Layers.astro", void 0);

const $$Astro$2 = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Lock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Lock;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "lock", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Lock.astro", void 0);

const $$Astro$1 = createAstro("https://empowerdigitalsolutions.co.uk");
const $$XCircle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$XCircle;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "circle-x", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<circle cx="12" cy="12" r="10"></circle> <path d="m15 9-6 6"></path> <path d="m9 9 6 6"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/XCircle.astro", void 0);

const $$TechComparison = createComponent(($$result, $$props, $$slots) => {
  const features = [
    {
      icon: $$Zap,
      title: "Performance & Speed",
      generic: "Slows down as you add plugins/apps.",
      empower: "Guaranteed 100/100 Lighthouse Scores.",
      winner: "empower"
    },
    {
      icon: $$Shield,
      title: "Security",
      generic: "Vulnerable to SQL injections & plugin hacks.",
      empower: "Static Architecture. Unhackable by design.",
      winner: "empower"
    },
    {
      icon: $$Search,
      title: "SEO Ranking",
      generic: "Bloated code confuses Google bots.",
      empower: "Semantic HTML that Google loves.",
      winner: "empower"
    },
    {
      icon: $$Layers,
      title: "Design Flexibility",
      generic: "Trapped by the theme's limitations.",
      empower: "If you can dream it, we can code it.",
      winner: "empower"
    },
    {
      icon: $$Lock,
      title: "Ownership",
      generic: "You rent it (Monthly platform fees).",
      empower: "You own the code. No monthly subscriptions.",
      winner: "empower"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 px-4 bg-slate-950"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold text-white font-heading mb-4">Code vs. Config</h2> <p class="text-slate-400">Why engineering beats templates every time.</p> </div> <div class="hidden md:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"> <div class="grid grid-cols-3 bg-slate-950/50 border-b border-slate-800 p-6"> <div class="text-slate-500 font-bold uppercase text-xs tracking-wider">Feature</div> <div class="text-slate-400 font-bold text-lg">Generic Page Builders</div> <div class="text-white font-bold text-lg flex items-center gap-2"> <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
Empower Engineering
</span> <span class="bg-purple-900/30 text-purple-400 text-xs px-2 py-1 rounded-full border border-purple-500/30">
RECOMMENDED
</span> </div> </div> <div class="divide-y divide-slate-800"> ${features.map((item) => renderTemplate`<div class="grid grid-cols-3 p-6 hover:bg-slate-800/30 transition-colors group"> <div class="flex items-center gap-3 text-white font-medium"> <div class="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-purple-400 transition-colors"> ${renderComponent($$result, "item.icon", item.icon, { "class": "w-5 h-5" })} </div> ${item.title} </div> <div class="flex items-center gap-3 text-slate-400 text-sm"> ${renderComponent($$result, "XCircle", $$XCircle, { "class": "w-5 h-5 text-red-900/50 shrink-0" })} ${item.generic} </div> <div class="flex items-center gap-3 text-white text-sm font-bold"> ${renderComponent($$result, "CheckCircle2", $$CheckCircle2, { "class": "w-5 h-5 text-green-500 shrink-0" })} ${item.empower} </div> </div>`)} </div> </div> <div class="md:hidden space-y-6"> ${features.map((item) => renderTemplate`<div class="bg-slate-900 border border-slate-800 rounded-xl p-6"> <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800"> ${renderComponent($$result, "item.icon", item.icon, { "class": "w-6 h-6 text-purple-500" })} <h3 class="text-xl font-bold text-white">${item.title}</h3> </div> <div class="space-y-4"> <div class="flex gap-3 text-slate-500 text-sm opacity-70"> ${renderComponent($$result, "XCircle", $$XCircle, { "class": "w-5 h-5 text-red-500 shrink-0" })} <p>${item.generic}</p> </div> <div class="flex gap-3 text-white text-sm font-bold bg-purple-900/10 p-3 rounded-lg border border-purple-500/20"> ${renderComponent($$result, "CheckCircle2", $$CheckCircle2, { "class": "w-5 h-5 text-green-500 shrink-0" })} <p>${item.empower}</p> </div> </div> </div>`)} </div> </div> </section>`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/TechComparison.astro", void 0);

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$WebDesign = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WebDesign;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Bespoke Web Design | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative pt-32 pb-20 px-6 overflow-hidden"> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none"></div> <div class="max-w-5xl mx-auto relative z-10 text-center"> <!-- Speedometer Visual --> <div class="flex justify-center mb-8"> <div class="bg-slate-900/80 backdrop-blur-sm border border-green-500/30 px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.2)]"> ${renderComponent($$result2, "Gauge", $$Gauge, { "class": "w-5 h-5 text-green-400" })} <span class="font-mono text-green-400 font-bold">Lighthouse Score: 100/100</span> </div> </div> <h1 class="text-5xl md:text-7xl font-extrabold font-heading mb-6 leading-tight tracking-tight">
Bespoke Web Design <br> <span class="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-500">& Engineering</span> </h1> <p class="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10">
We don't use templates. We write code that <span class="text-white font-semibold">ranks, converts, and scales.</span> </p> <div class="flex flex-col md:flex-row gap-4 justify-center"> <a href="#tiers" class="bg-empower-pink text-white font-bold py-4 px-8 rounded-full hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-500/25">
View Service Tiers
</a> <a href="/contact" class="bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all">
Book a Discovery Call
</a> </div> </div> </section>  <section class="py-20 px-6 bg-white dark:bg-slate-900"> <div class="max-w-4xl mx-auto text-center"> <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-6">
Stop Renting. Start Owning.
</h2> <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
Most agencies will sell you a WordPress theme or a Squarespace template.
        It looks fine today, but in a year, it’s slow, bloated, and looks like
        everyone else's.
</p> <div class="grid md:grid-cols-3 gap-8 text-left"> <div class="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700"> ${renderComponent($$result2, "Zap", $$Zap, { "class": "w-10 h-10 text-empower-pink mb-4" })} <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
Zero Bloat
</h3> <p class="text-slate-600 dark:text-slate-400">
Hand-coded using modern frameworks like Astro. It loads instantly.
</p> </div> <div class="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700"> ${renderComponent($$result2, "Lock", $$Lock, { "class": "w-10 h-10 text-empower-pink mb-4" })} <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
Unhackable
</h3> <p class="text-slate-600 dark:text-slate-400">
Static architecture means there is no database for hackers to break
            into.
</p> </div> <div class="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700"> ${renderComponent($$result2, "Database", $$Database, { "class": "w-10 h-10 text-empower-pink mb-4" })} <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
Yours Forever
</h3> <p class="text-slate-600 dark:text-slate-400">
You own the code. No monthly platform fees or subscriptions.
</p> </div> </div> </div> </section>  <section id="tiers" class="py-24 px-6 bg-slate-50 dark:bg-slate-950"> <div class="max-w-6xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
Choose Your Engine
</h2> <p class="text-slate-600 dark:text-slate-400">
Scalable solutions for every stage of business growth.
</p> </div> <div class="grid lg:grid-cols-3 gap-8 items-start"> <!-- Tier 1 --> <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"> <div class="bg-slate-100 dark:bg-slate-800 w-fit px-4 py-1 rounded-full text-xs font-bold text-slate-600 dark:text-slate-400 mb-6">
ESSENTIAL
</div> <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
The Digital Business Card
</h3> <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">
For Consultants, Speakers, & Local Trades.
</p> <div class="h-px bg-slate-100 dark:bg-slate-800 mb-6"></div> <p class="text-slate-700 dark:text-slate-300 mb-6">
A high-speed, single-page or 3-page site that establishes immediate
            credibility.
</p> <ul class="space-y-3 mb-8"> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-green-500 mr-2" })} Brand Identity
              Integration
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-green-500 mr-2" })} Contact Form &
              Map
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-green-500 mr-2" })} Speed Optimization
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-green-500 mr-2" })} Hosting Setup
</li> </ul> <a href="/contact" class="block w-full py-3 px-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-center rounded-lg transition-colors">
Get Started
</a> </div> <!-- Tier 2 --> <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border-2 border-empower-pink relative transform scale-105 z-10"> <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-empower-pink text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
MOST POPULAR
</div> <div class="bg-pink-50 dark:bg-pink-900/20 w-fit px-4 py-1 rounded-full text-xs font-bold text-empower-pink mb-6">
STANDARD
</div> <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
The Growth Engine
</h3> <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">
For Growing Service Businesses & Agencies.
</p> <div class="h-px bg-slate-100 dark:bg-slate-800 mb-6"></div> <p class="text-slate-700 dark:text-slate-300 mb-6">
A multi-page ecosystem designed to capture leads and demonstrate
            authority.
</p> <ul class="space-y-3 mb-8"> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-empower-pink mr-2" })} CMS for Blog/Case
              Studies
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-empower-pink mr-2" })} Lead Magnets
              & Funnels
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-empower-pink mr-2" })} SEO Architecture
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-empower-pink mr-2" })} Custom Animations
</li> </ul> <a href="/contact" class="block w-full py-3 px-6 bg-empower-pink hover:bg-pink-600 text-white font-bold text-center rounded-lg transition-colors shadow-lg">
Build My Engine
</a> </div> <!-- Tier 3 --> <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"> <div class="bg-purple-50 dark:bg-purple-900/20 w-fit px-4 py-1 rounded-full text-xs font-bold text-purple-600 dark:text-purple-400 mb-6">
PREMIUM
</div> <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
The Interactive Experience
</h3> <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">
For High-end Brands & Luxury Real Estate.
</p> <div class="h-px bg-slate-100 dark:bg-slate-800 mb-6"></div> <p class="text-slate-700 dark:text-slate-300 mb-6">
A cinematic, motion-heavy experience that feels like a native app.
</p> <ul class="space-y-3 mb-8"> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-purple-500 mr-2" })} Framer Motion
              Animations
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-purple-500 mr-2" })} Video Backgrounds
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-purple-500 mr-2" })} 3D Elements
</li> <li class="flex items-center text-sm text-slate-600 dark:text-slate-400"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-4 h-4 text-purple-500 mr-2" })} "Scrollytelling"
              Layouts
</li> </ul> <a href="/contact" class="block w-full py-3 px-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-center rounded-lg transition-colors">
Discuss Custom Build
</a> </div> </div> </div> </section>  ${renderComponent($$result2, "TechComparison", $$TechComparison, {})}  <section class="py-24 px-6 bg-white dark:bg-slate-900"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
Transparent Engineering Process
</h2> <p class="text-slate-600 dark:text-slate-400">
No black boxes. You see exactly what we're building.
</p> </div> <div class="grid md:grid-cols-4 gap-8"> <div class="relative"> <div class="text-6xl font-bold text-slate-100 dark:text-slate-800 absolute -top-8 -left-4 z-0">
01
</div> <div class="relative z-10"> <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
Discovery
</h3> <p class="text-slate-600 dark:text-slate-400 text-sm">
We map your user's journey and business goals before drawing a
              single pixel.
</p> </div> </div> <div class="relative"> <div class="text-6xl font-bold text-slate-100 dark:text-slate-800 absolute -top-8 -left-4 z-0">
02
</div> <div class="relative z-10"> <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
Wireframing
</h3> <p class="text-slate-600 dark:text-slate-400 text-sm">
You see the "skeleton" of the site to approve the logic and flow.
</p> </div> </div> <div class="relative"> <div class="text-6xl font-bold text-slate-100 dark:text-slate-800 absolute -top-8 -left-4 z-0">
03
</div> <div class="relative z-10"> <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
Development
</h3> <p class="text-slate-600 dark:text-slate-400 text-sm">
We build in a live staging environment. You watch the site come
              alive in real-time.
</p> </div> </div> <div class="relative"> <div class="text-6xl font-bold text-slate-100 dark:text-slate-800 absolute -top-8 -left-4 z-0">
04
</div> <div class="relative z-10"> <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
Launch
</h3> <p class="text-slate-600 dark:text-slate-400 text-sm">
We handle the DNS, SSL, and final testing. You just pop the
              champagne.
</p> </div> </div> </div> </div> </section>  <section class="py-20 px-6 bg-slate-50 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700"> <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12"> <div class="flex-1"> <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
Trapped in WordPress?
</h2> <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
We specialize in extracting businesses from slow, legacy platforms. We
          migrate your content, protect your SEO rankings, and switch you to a
          modern stack without downtime.
</p> <a href="/Empower-DNS-Guide.pdf" class="inline-flex items-center text-empower-pink font-bold hover:text-pink-700 transition-colors">
Download Migration Protocol ${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "class": "w-4 h-4 ml-2" })} </a> </div> <div class="flex-1 flex justify-center"> <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 max-w-sm"> <div class="flex items-center gap-4 mb-4"> <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-full"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-6 h-6 text-green-600 dark:text-green-400" })} </div> <div> <h4 class="font-bold text-slate-900 dark:text-white">
Zero Downtime
</h4> <p class="text-xs text-slate-500">Seamless transition</p> </div> </div> <div class="flex items-center gap-4"> <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-full"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-6 h-6 text-green-600 dark:text-green-400" })} </div> <div> <h4 class="font-bold text-slate-900 dark:text-white">
SEO Protected
</h4> <p class="text-xs text-slate-500">Rankings maintained</p> </div> </div> </div> </div> </div> </section>  <section class="py-24 px-6 bg-slate-950 text-center relative overflow-hidden"> <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none"></div> <div class="relative z-10 max-w-3xl mx-auto"> <h2 class="text-4xl md:text-5xl font-bold text-white mb-8 font-heading">
Ready to build an asset, not just a website?
</h2> <a href="/contact" class="inline-block bg-empower-pink text-white font-bold py-5 px-12 rounded-full hover:bg-pink-600 transition-all shadow-xl hover:shadow-pink-500/30 text-lg transform hover:-translate-y-1">
Book a Discovery Call
</a> </div> </section> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/web-design.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/web-design.astro";
const $$url = "/web-design";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$WebDesign,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
