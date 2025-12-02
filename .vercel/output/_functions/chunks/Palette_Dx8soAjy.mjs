import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DUhDXnwl.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Palette = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Palette;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "palette", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path> <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle> <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle> <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle> <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Palette.astro", void 0);

export { $$Palette as $ };
