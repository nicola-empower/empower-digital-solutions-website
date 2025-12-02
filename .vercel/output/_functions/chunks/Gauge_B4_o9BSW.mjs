import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DUhDXnwl.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Gauge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Gauge;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "gauge", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="m12 14 4-4"></path> <path d="M3.34 19a10 10 0 1 1 17.32 0"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Gauge.astro", void 0);

export { $$Gauge as $ };
