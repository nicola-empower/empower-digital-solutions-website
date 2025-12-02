import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_CsB7TRoA.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DL66U752.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$ArrowRight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArrowRight;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "arrow-right", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/ArrowRight.astro", void 0);

export { $$ArrowRight as $ };
