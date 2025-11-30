import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './astro/server_BhDW_YFo.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_B-ocv1Hb.mjs';

const $$Astro = createAstro();
const $$ShieldCheck = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ShieldCheck;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "shield-check", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/ShieldCheck.astro", void 0);

export { $$ShieldCheck as $ };
