import { c as createComponent, r as renderComponent, f as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BVdSWecw.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C8uQLyEH.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Client Portal | Empower Digital Solutions" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-slate-950 px-4"> <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md"> <h1 class="text-2xl font-bold text-white mb-6 text-center">
Client Portal
</h1> <p class="text-slate-400 text-center mb-8">
Login to view your project status and documents.
</p> <form id="portal-login-form" class="space-y-4"> <div> <label for="email" class="block text-sm font-medium text-slate-400 mb-1">Email</label> <input type="email" id="email" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"> </div> <div> <label for="password" class="block text-sm font-medium text-slate-400 mb-1">Password</label> <input type="password" id="password" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"> </div> <button type="submit" class="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors">
Access Portal
</button> </form> <div class="mt-6 text-center"> <p class="text-slate-400 text-sm">
New client?
<a href="/portal/signup" class="text-purple-400 hover:text-purple-300 font-bold">Create an account</a> </p> </div> <p id="error-msg" class="text-red-400 text-sm mt-4 text-center hidden"></p> </div> </div> ` })} ${renderScript($$result, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/portal/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/portal/index.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/portal/index.astro";
const $$url = "/portal";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
