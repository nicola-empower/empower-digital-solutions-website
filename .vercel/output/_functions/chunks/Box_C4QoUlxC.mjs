import { b as createAstro, c as createComponent, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DUhDXnwl.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Box = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Box;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "box", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path> <path d="m3.3 7 8.7 5 8.7-5"></path> <path d="M12 22V12"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Box.astro", void 0);

export { $$Box as $ };
