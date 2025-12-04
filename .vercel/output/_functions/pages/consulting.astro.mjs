import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from '../chunks/astro/server_BVdSWecw.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BWhIpZcS.mjs';
import { $ as $$ } from '../chunks/.Layout_dllh3QKV.mjs';
import { $ as $$Search } from '../chunks/Search_CHt6SgPu.mjs';
import { $ as $$CheckCircle2 } from '../chunks/CheckCircle2_DvgqXIkz.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Activity = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Activity;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "activity", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Activity.astro", void 0);

const $$Astro$1 = createAstro("https://empowerdigitalsolutions.co.uk");
const $$BrainCircuit = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BrainCircuit;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "brain-circuit", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path> <path d="M9 13a4.5 4.5 0 0 0 3-4"></path> <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path> <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path> <path d="M6 18a4 4 0 0 1-1.967-.516"></path> <path d="M12 13h4"></path> <path d="M12 18h6a2 2 0 0 1 2 2v1"></path> <path d="M12 8h8"></path> <path d="M16 8V5a2 2 0 0 1 2-2"></path> <circle cx="16" cy="13" r=".5"></circle> <circle cx="18" cy="3" r=".5"></circle> <circle cx="20" cy="21" r=".5"></circle> <circle cx="20" cy="8" r=".5"></circle> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/BrainCircuit.astro", void 0);

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Workflow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Workflow;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "workflow", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<rect width="8" height="8" x="3" y="3" rx="2"></rect> <path d="M7 11v4a2 2 0 0 0 2 2h4"></path> <rect width="8" height="8" x="13" y="13" rx="2"></rect> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Workflow.astro", void 0);

const $$Consulting = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Digital Consulting | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative pt-32 pb-20 px-6 overflow-hidden"> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 pointer-events-none"></div> <div class="max-w-5xl mx-auto relative z-10 text-center"> <div class="flex justify-center mb-8"> <div class="bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.2)]"> ${renderComponent($$result2, "BrainCircuit", $$BrainCircuit, { "class": "w-5 h-5 text-blue-400" })} <span class="font-mono text-blue-400 font-bold">Strategic Partnership</span> </div> </div> <h1 class="text-5xl md:text-7xl font-extrabold font-heading mb-6 leading-tight tracking-tight">
Stop Guessing. <br> <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Start Scaling.</span> </h1> <p class="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10">
Your business needs more than a website; it needs a digital
                roadmap. We audit, strategise, and streamline your digital
                presence to turn traffic into revenue.
</p> <div class="flex flex-col md:flex-row gap-4 justify-center"> <a href="/contact" class="bg-blue-600 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25">
Book a Strategy Call
</a> <a href="/website-health-checker" class="bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"> ${renderComponent($$result2, "Activity", $$Activity, { "class": "w-5 h-5" })}
Free Health Check
</a> </div> </div> </section>  <section class="py-24 px-6 bg-slate-950"> <div class="max-w-6xl mx-auto"> <div class="grid md:grid-cols-3 gap-8"> <!-- Service 1 --> <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors group"> <div class="bg-blue-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"> ${renderComponent($$result2, "Search", $$Search, { "class": "w-8 h-8 text-blue-400" })} </div> <h3 class="text-2xl font-bold text-white mb-4">
The Digital Audit
</h3> <p class="text-slate-400 leading-relaxed">
We look under the hood of your current setup. We
                        identify why you aren't ranking, where you're losing
                        customers, and exactly how to fix it.
</p> </div> <!-- Service 2 --> <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-colors group"> <div class="bg-purple-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"> ${renderComponent($$result2, "Workflow", $$Workflow, { "class": "w-8 h-8 text-purple-400" })} </div> <h3 class="text-2xl font-bold text-white mb-4">
Workflow Automation
</h3> <p class="text-slate-400 leading-relaxed">
Stop doing manual data entry. We help integrate your
                        tools (CRM, Email, Website) to save you hours of admin
                        time every week.
</p> </div> <!-- Service 3 --> <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-pink-500/50 transition-colors group"> <div class="bg-pink-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"> ${renderComponent($$result2, "BrainCircuit", $$BrainCircuit, { "class": "w-8 h-8 text-pink-400" })} </div> <h3 class="text-2xl font-bold text-white mb-4">
The 'Fractional CTO'
</h3> <p class="text-slate-400 leading-relaxed">
Think of us as your external technical director. We help
                        you make the right software choices so you don't waste
                        money on tech you don't need.
</p> </div> </div> </div> </section>  <section class="py-24 px-6 bg-slate-900"> <div class="max-w-5xl mx-auto"> <div class="flex flex-col md:flex-row gap-16 items-center"> <div class="md:w-1/2"> <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
Is your business trapped in 'Excel Hell'?
</h2> <p class="text-slate-400 text-lg mb-8">
Or maybe you're paying for expensive software features
                        you don't even use. We bridge the gap between your
                        business goals and the technology needed to achieve
                        them.
</p> <ul class="space-y-4"> <li class="flex items-center gap-3 text-slate-300"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-5 h-5 text-blue-500" })} <span>Streamline internal processes</span> </li> <li class="flex items-center gap-3 text-slate-300"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-5 h-5 text-blue-500" })} <span>Reduce software subscription bloat</span> </li> <li class="flex items-center gap-3 text-slate-300"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-5 h-5 text-blue-500" })} <span>Connect disjointed systems</span> </li> </ul> </div> <div class="md:w-1/2"> <div class="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl relative"> <div class="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
The Result
</div> <div class="space-y-6"> <div class="flex items-center justify-between border-b border-slate-800 pb-4"> <span class="text-slate-400">Efficiency</span> <span class="text-green-400 font-bold flex items-center gap-2"> ${renderComponent($$result2, "Activity", $$Activity, { "class": "w-4 h-4" })} +40%
</span> </div> <div class="flex items-center justify-between border-b border-slate-800 pb-4"> <span class="text-slate-400">Admin Time</span> <span class="text-green-400 font-bold flex items-center gap-2"> ${renderComponent($$result2, "Activity", $$Activity, { "class": "w-4 h-4" })} -15hrs/week
</span> </div> <div class="flex items-center justify-between"> <span class="text-slate-400">Tech Spend</span> <span class="text-green-400 font-bold flex items-center gap-2"> ${renderComponent($$result2, "Activity", $$Activity, { "class": "w-4 h-4" })} Optimised
</span> </div> </div> </div> </div> </div> </div> </section>  <section class="py-24 px-6 bg-slate-950 text-center relative overflow-hidden"> <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div> <div class="relative z-10 max-w-3xl mx-auto"> <h2 class="text-4xl md:text-5xl font-bold text-white mb-8 font-heading">
Ready to optimise your business?
</h2> <p class="text-slate-400 text-lg mb-10">
Let's identify the bottlenecks holding you back and build a
                system that scales.
</p> <a href="/contact" class="inline-block bg-blue-600 text-white font-bold py-5 px-12 rounded-full hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-500/30 text-lg transform hover:-translate-y-1">
Book a Consultation
</a> </div> </section> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/consulting.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/consulting.astro";
const $$url = "/consulting";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Consulting,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
