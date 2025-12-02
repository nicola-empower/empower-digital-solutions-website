import { b as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from './astro/server_BWfhTkDV.mjs';
import 'piccolore';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const $$TechStackCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TechStackCard;
  const { name, icon: Icon, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="group relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-slate-700 overflow-hidden"> <div class="absolute top-0 left-0 w-1 h-full bg-empower-pink transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div> <div class="relative z-10"> <div class="mb-4 text-gray-400 group-hover:text-empower-pink transition-colors duration-300"> ${renderComponent($$result, "Icon", Icon, { "className": "w-10 h-10" })} </div> <h3 class="text-lg font-bold text-dark-violet dark:text-white group-hover:text-empower-pink transition-colors duration-300 mb-2"> ${name} </h3> <p class="text-sm text-gray-600 dark:text-gray-300"> ${description} </p> </div> </div>`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/TechStackCard.astro", void 0);

export { $$TechStackCard as $ };
