import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BrvUMNAk.mjs';
import 'piccolore';
import { Search, CheckCircle, LayoutTemplate, Code, Rocket, Atom, Palette, FileCode, Server, Cloud, ArrowRight } from 'lucide-react';
import { $ as $$Layout } from '../chunks/Layout_BDQ9EGuR.mjs';
import { $ as $$TechStackCard } from '../chunks/TechStackCard_BKmAzVKO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$DesignProcess = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DesignProcess;
  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "A bespoke brochure website typically takes 2-4 weeks. Complex web applications vary based on scope. We provide a strict timeline during our Discovery phase."
    },
    {
      question: "Will I be able to update the text myself?",
      answer: "Absolutely. We build with 'Content Management' in mind. We can connect your site to a headless CMS, allowing you to edit blog posts and text without touching code."
    },
    {
      question: "Do you offer support after launch?",
      answer: "Yes. We offer monthly maintenance packages to keep your site secure, backed up, and updated with fresh content."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "How We Work | Engineering-Led Web Design | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-slate-900 text-white py-24 relative overflow-hidden"> <div class="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20"></div> <div class="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900"></div> <div class="container mx-auto px-6 relative z-10 text-center"> <h1 class="text-4xl md:text-6xl font-bold font-heading mb-6">How We Work</h1> <p class="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto font-light">
A transparent, engineering-led approach to digital products. <br class="hidden md:block"> <span class="text-empower-pink font-semibold">No black boxes. No jargon. Just results.</span> </p> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-6 max-w-4xl text-center"> <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Design with Intent. Build for Speed.</h2> <p class="text-lg text-slate-600 leading-relaxed">
Many agencies rush straight to code. We don't. We believe that a high-performance website is
<span class="font-bold text-empower-pink">20% coding and 80% planning</span>. 
        We follow a strict 4-stage methodology to ensure your project is delivered on time, on budget, and exactly to spec.
</p> </div> </section>  <section class="py-20 bg-slate-50 relative overflow-hidden"> <div class="container mx-auto px-6 max-w-6xl relative"> <!-- Vertical Line (Desktop) --> <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-purple-200 transform -translate-x-1/2"></div> <div class="space-y-12 md:space-y-24"> <!-- Phase 1 --> <div class="relative flex flex-col md:flex-row items-center md:flex-row-reverse"> <div class="absolute left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-empower-pink text-white shadow-lg border-4 border-white"> ${renderComponent($$result2, "Search", Search, { "className": "w-6 h-6" })} </div> <div class="w-full md:w-1/2 p-6 md:p-12"> <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-empower-pink hover:-translate-y-1 transition-transform duration-300 md:mr-12"> <span class="text-sm font-bold text-empower-pink uppercase tracking-wider mb-2 block">Phase 1: Discovery & Strategy</span> <h3 class="text-2xl font-bold text-slate-900 mb-4">"The Blueprint"</h3> <p class="text-slate-600 mb-6 leading-relaxed">
Before opening a code editor, we sit down to understand your business. We don't just ask what you want it to look like; we ask what you need it to do.
</p> <ul class="space-y-2"> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Competitor Analysis & Market Research
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
SEO Audit of your current presence
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Definition of User Personas
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Sitemap & Information Architecture planning
</li> </ul> </div> </div> <div class="w-full md:w-1/2"></div> </div> <!-- Phase 2 --> <div class="relative flex flex-col md:flex-row items-center"> <div class="absolute left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-empower-pink text-white shadow-lg border-4 border-white"> ${renderComponent($$result2, "LayoutTemplate", LayoutTemplate, { "className": "w-6 h-6" })} </div> <div class="w-full md:w-1/2 p-6 md:p-12"> <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-empower-pink hover:-translate-y-1 transition-transform duration-300 md:ml-12"> <span class="text-sm font-bold text-empower-pink uppercase tracking-wider mb-2 block">Phase 2: Design & Prototyping</span> <h3 class="text-2xl font-bold text-slate-900 mb-4">"The Visuals"</h3> <p class="text-slate-600 mb-6 leading-relaxed">
We move into high-fidelity design using modern tools like Figma. You will see exactly how your site will look on mobile, tablet, and desktop before a single line of code is written.
</p> <ul class="space-y-2"> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Wireframing (The skeleton of the site)
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
High-Fidelity UI Design
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Interactive Prototypes
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Feedback Loops & Revisions
</li> </ul> </div> </div> <div class="w-full md:w-1/2"></div> </div> <!-- Phase 3 --> <div class="relative flex flex-col md:flex-row items-center md:flex-row-reverse"> <div class="absolute left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-empower-pink text-white shadow-lg border-4 border-white"> ${renderComponent($$result2, "Code", Code, { "className": "w-6 h-6" })} </div> <div class="w-full md:w-1/2 p-6 md:p-12"> <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-empower-pink hover:-translate-y-1 transition-transform duration-300 md:mr-12"> <span class="text-sm font-bold text-empower-pink uppercase tracking-wider mb-2 block">Phase 3: Development & Engineering</span> <h3 class="text-2xl font-bold text-slate-900 mb-4">"The Engine Room"</h3> <p class="text-slate-600 mb-6 leading-relaxed">
This is where we differ from the rest. We don't rely on bloated drag-and-drop builders. We hand-code your site using modern frameworks to ensure it is lightning fast, secure, and accessible.
</p> <ul class="space-y-2"> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Custom Development (HTML5, Tailwind CSS, Astro/React)
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Performance Optimization (Targeting 100/100 Google Lighthouse scores)
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Accessibility Compliance (WCAG 2.1)
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
CMS Integration
</li> </ul> </div> </div> <div class="w-full md:w-1/2"></div> </div> <!-- Phase 4 --> <div class="relative flex flex-col md:flex-row items-center"> <div class="absolute left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-empower-pink text-white shadow-lg border-4 border-white"> ${renderComponent($$result2, "Rocket", Rocket, { "className": "w-6 h-6" })} </div> <div class="w-full md:w-1/2 p-6 md:p-12"> <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-empower-pink hover:-translate-y-1 transition-transform duration-300 md:ml-12"> <span class="text-sm font-bold text-empower-pink uppercase tracking-wider mb-2 block">Phase 4: Launch & Growth</span> <h3 class="text-2xl font-bold text-slate-900 mb-4">"The Liftoff"</h3> <p class="text-slate-600 mb-6 leading-relaxed">
Launch day is just the beginning. We rigorously test across devices and browsers to ensure a flawless experience. Once live, we hand you the keys and the training manual.
</p> <ul class="space-y-2"> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Cross-browser & Mobile Testing
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Search Engine Indexing
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Security Headers & SSL Setup
</li> <li class="flex items-start text-sm text-slate-700"> ${renderComponent($$result2, "CheckCircle", CheckCircle, { "className": "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" })}
Client Training Session & Handoff
</li> </ul> </div> </div> <div class="w-full md:w-1/2"></div> </div> </div> </div> </section>  <section class="py-20 bg-slate-900 text-white"> <div class="container mx-auto px-6"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold mb-4">Built on Modern Foundations</h2> <p class="text-lg text-purple-200 max-w-2xl mx-auto">
We avoid legacy technology. Your project will be built on the same infrastructure used by the world's fastest tech companies.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"> ${renderComponent($$result2, "TechStackCard", $$TechStackCard, { "name": "Astro", "icon": Rocket, "description": "The web framework for content-driven websites. Lightning fast and SEO optimised." })} ${renderComponent($$result2, "TechStackCard", $$TechStackCard, { "name": "React", "icon": Atom, "description": "A JavaScript library for building interactive user interfaces and complex web apps." })} ${renderComponent($$result2, "TechStackCard", $$TechStackCard, { "name": "Tailwind CSS", "icon": Palette, "description": "A utility-first CSS framework for bespoke, pixel-perfect layouts." })} ${renderComponent($$result2, "TechStackCard", $$TechStackCard, { "name": "TypeScript", "icon": FileCode, "description": "Strongly typed JavaScript for scalable, robust, and error-free codebases." })} ${renderComponent($$result2, "TechStackCard", $$TechStackCard, { "name": "Node.js", "icon": Server, "description": "JavaScript runtime for building fast, scalable network applications and APIs." })} ${renderComponent($$result2, "TechStackCard", $$TechStackCard, { "name": "Vercel", "icon": Cloud, "description": "Edge-network deployment for instant global loading and reliability." })} </div> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-6 max-w-3xl"> <div class="text-center mb-12"> <h2 class="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2> </div> <div class="space-y-4"> ${faqs.map((faq) => renderTemplate`<details class="group bg-slate-50 rounded-xl overflow-hidden border border-slate-200 open:border-empower-pink transition-colors"> <summary class="flex items-center justify-between p-6 cursor-pointer font-bold text-slate-800 hover:text-empower-pink transition-colors select-none"> ${faq.question} <span class="transform group-open:rotate-180 transition-transform duration-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="m6 9 6 6 6-6"></path></svg> </span> </summary> <div class="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4"> ${faq.answer} </div> </details>`)} </div> </div> </section>  <section class="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white text-center"> <div class="container mx-auto px-6"> <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to build something better?</h2> <a href="/contact" class="inline-flex items-center bg-empower-pink text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-vibrant-magenta hover:scale-105 transition-all text-lg tracking-wide">
Start Your Discovery Phase ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "w-5 h-5 ml-2" })} </a> </div> </section> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/design-process.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/design-process.astro";
const $$url = "/design-process";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DesignProcess,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
