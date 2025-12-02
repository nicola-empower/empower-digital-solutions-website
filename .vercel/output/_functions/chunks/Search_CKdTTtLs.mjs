import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_CsB7TRoA.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DL66U752.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Search = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "search", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="m21 21-4.34-4.34"></path> <circle cx="11" cy="11" r="8"></circle> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Search.astro", void 0);

export { $$Search as $ };
