import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_CsB7TRoA.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BTdPXDjx.mjs';
import { Box, PenTool, Building2, Coffee, Zap } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$AestheticVault = createComponent(($$result, $$props, $$slots) => {
  const vibes = [
    {
      title: "THE ARCHITECT",
      slug: "architect",
      description: "Raw Code. Monospaced. Terminal Green. Function over form.",
      icon: Box,
      color: "text-green-500",
      border: "border-green-500/20 hover:border-green-500",
      bg: "hover:bg-green-500/5"
    },
    {
      title: "THE CURATOR",
      slug: "curator",
      description: "Modern Luxury. Massive Whitespace. Serif Headers. Silence.",
      icon: PenTool,
      color: "text-stone-400",
      border: "border-stone-200 hover:border-stone-400",
      bg: "hover:bg-stone-50"
    },
    {
      title: "THE TITAN",
      slug: "titan",
      description: "Corporate Trust. Helvetica. Navy Blue. Too big to fail.",
      icon: Building2,
      color: "text-blue-700",
      border: "border-blue-200 hover:border-blue-700",
      bg: "hover:bg-blue-50"
    },
    {
      title: "THE ARTISAN",
      slug: "artisan",
      description: "Warm Analog. Soft Serifs. Cream & Grain. Made by human hands.",
      icon: Coffee,
      color: "text-orange-600",
      border: "border-orange-200 hover:border-orange-600",
      bg: "hover:bg-orange-50"
    },
    {
      title: "THE DISRUPTOR",
      slug: "disruptor",
      description: "Cyberpunk. Hype. Neon. Break the rules.",
      icon: Zap,
      color: "text-purple-500",
      border: "border-purple-500/20 hover:border-purple-500",
      bg: "hover:bg-purple-500/5"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "The Aesthetic Vault | Studio" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-neutral-950 text-white py-20 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <div class="text-center mb-20"> <h1 class="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
The Aesthetic Vault
</h1> <p class="text-xl text-neutral-400 max-w-2xl mx-auto">
A collection of distinct design systems and brand
                    identities. Explore different "vibes" to find the perfect
                    voice for your next project.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${vibes.map((vibe) => renderTemplate`<div${addAttribute(`group relative p-8 rounded-2xl border ${vibe.border} ${vibe.bg} transition-all duration-500 bg-neutral-900/50 backdrop-blur-sm overflow-hidden`, "class")}> <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"> ${renderComponent($$result2, "vibe.icon", vibe.icon, { "className": `w-32 h-32 ${vibe.color}` })} </div> <div class="relative z-10"> <div${addAttribute(`inline-flex items-center justify-center p-3 rounded-xl bg-neutral-800/50 mb-6 ${vibe.color}`, "class")}> ${renderComponent($$result2, "vibe.icon", vibe.icon, { "className": "w-8 h-8" })} </div> <h2 class="text-3xl font-bold mb-3 tracking-tight"> ${vibe.title} </h2> <p class="text-neutral-400 mb-8 text-lg"> ${vibe.description} </p> </div> </div>`)} </div> </div> </main> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/aesthetic-vault.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/aesthetic-vault.astro";
const $$url = "/aesthetic-vault";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$AestheticVault,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
