import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_CsB7TRoA.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DL66U752.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$CheckCircle2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CheckCircle2;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "circle-check", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<circle cx="12" cy="12" r="10"></circle> <path d="m9 12 2 2 4-4"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/CheckCircle2.astro", void 0);

export { $$CheckCircle2 as $ };
