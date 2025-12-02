import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DUhDXnwl.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Type = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Type;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "type", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M12 4v16"></path> <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"></path> <path d="M9 20h6"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Type.astro", void 0);

export { $$Type as $ };
