import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_Cn_gObOU.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const prerender = false;
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Manage Project ${id} | Empower Admin` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-slate-950 text-white p-8"> <div class="max-w-4xl mx-auto"> <a href="/admin/dashboard" class="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
&larr; Back to Dashboard
</a> <div class="bg-slate-900 rounded-xl border border-slate-800 p-8"> <h1 class="text-3xl font-bold mb-4">Manage Project</h1> <p class="text-slate-400 mb-8">
Project ID: <span class="font-mono bg-slate-800 px-2 py-1 rounded text-emerald-400">${id}</span> </p> <div class="bg-slate-950/50 border border-slate-800 rounded-lg p-12 text-center"> <p class="text-xl text-slate-300 font-semibold mb-2">
Project Management Interface
</p> <p class="text-slate-500">
This feature is currently under development.
</p> </div> </div> </div> </div> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/admin/project/[id].astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/admin/project/[id].astro";
const $$url = "/admin/project/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
