import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DUhDXnwl.mjs';

const $$Astro$1 = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Headphones = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Headphones;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "headphones", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Headphones.astro", void 0);

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Mic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Mic;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "mic", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M12 19v3"></path> <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path> <rect x="9" y="2" width="6" height="13" rx="3"></rect> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Mic.astro", void 0);

export { $$Mic as $, $$Headphones as a };
