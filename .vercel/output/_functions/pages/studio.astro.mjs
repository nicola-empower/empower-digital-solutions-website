import { b as createAstro, c as createComponent, r as renderComponent, m as maybeRenderHead, a as renderTemplate, e as addAttribute } from '../chunks/astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DxiAvFAF.mjs';
import { $ as $$Box } from '../chunks/Box_C4QoUlxC.mjs';
import { $ as $$ } from '../chunks/.Layout_DUhDXnwl.mjs';
import { $ as $$Building2 } from '../chunks/Building2_BBPOb7i1.mjs';
import { $ as $$Coffee } from '../chunks/Coffee_CjzvGsRu.mjs';
import { $ as $$Zap } from '../chunks/Zap_DusnH4HQ.mjs';
import { $ as $$ArrowRight } from '../chunks/ArrowRight_BxApZKdg.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$PenTool = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PenTool;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "pen-tool", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path> <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path> <path d="m2.3 2.3 7.286 7.286"></path> <circle cx="11" cy="11" r="2"></circle> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/PenTool.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const vibes = [
    {
      title: "THE ARCHITECT",
      slug: "architect",
      description: "Raw Code. Monospaced. Terminal Green. Function over form.",
      icon: $$Box,
      color: "text-green-500",
      border: "border-green-500/20 hover:border-green-500",
      bg: "hover:bg-green-500/5"
    },
    {
      title: "THE CURATOR",
      slug: "curator",
      description: "Modern Luxury. Massive Whitespace. Serif Headers. Silence.",
      icon: $$PenTool,
      color: "text-stone-400",
      border: "border-stone-200 hover:border-stone-400",
      bg: "hover:bg-stone-50"
    },
    {
      title: "THE TITAN",
      slug: "titan",
      description: "Corporate Trust. Helvetica. Navy Blue. Too big to fail.",
      icon: $$Building2,
      color: "text-blue-700",
      border: "border-blue-200 hover:border-blue-700",
      bg: "hover:bg-blue-50"
    },
    {
      title: "THE ARTISAN",
      slug: "artisan",
      description: "Warm Analog. Soft Serifs. Cream & Grain. Made by human hands.",
      icon: $$Coffee,
      color: "text-orange-600",
      border: "border-orange-200 hover:border-orange-600",
      bg: "hover:bg-orange-50"
    },
    {
      title: "THE DISRUPTOR",
      slug: "disruptor",
      description: "Cyberpunk. Hype. Neon. Break the rules.",
      icon: $$Zap,
      color: "text-purple-500",
      border: "border-purple-500/20 hover:border-purple-500",
      bg: "hover:bg-purple-500/5"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "The Aesthetic Vault | Studio" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-neutral-950 text-white py-20 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <div class="text-center mb-20"> <h1 class="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-500">
The Aesthetic Vault
</h1> <p class="text-xl text-neutral-400 max-w-2xl mx-auto">
A collection of distinct design systems and brand
                    identities. Explore different "vibes" to find the perfect
                    voice for your next project.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${vibes.map((vibe) => renderTemplate`<a${addAttribute(`/studio/${vibe.slug}`, "href")}${addAttribute(`group relative p-8 rounded-2xl border ${vibe.border} ${vibe.bg} transition-all duration-500 bg-neutral-900/50 backdrop-blur-sm overflow-hidden`, "class")}> <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"> ${renderComponent($$result2, "vibe.icon", vibe.icon, { "class": `w-32 h-32 ${vibe.color}` })} </div> <div class="relative z-10"> <div${addAttribute(`inline-flex items-center justify-center p-3 rounded-xl bg-neutral-800/50 mb-6 ${vibe.color}`, "class")}> ${renderComponent($$result2, "vibe.icon", vibe.icon, { "class": "w-8 h-8" })} </div> <h2 class="text-3xl font-bold mb-3 tracking-tight"> ${vibe.title} </h2> <p class="text-neutral-400 mb-8 text-lg"> ${vibe.description} </p> <div${addAttribute(`inline-flex items-center font-medium ${vibe.color}`, "class")}>
Enter Vault${" "} ${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "class": "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" })} </div> </div> </a>`)} </div> </div> </main> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/studio/index.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/studio/index.astro";
const $$url = "/studio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
