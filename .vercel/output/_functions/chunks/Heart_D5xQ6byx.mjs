import { c as createComponent, b as createAstro, r as renderComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$ } from './.Layout_DUhDXnwl.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$Heart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Heart;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "heart", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/node_modules/lucide-astro/dist/Heart.astro", void 0);

export { $$Heart as $ };
