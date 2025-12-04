import { c as createComponent, r as renderComponent, f as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BVdSWecw.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BWhIpZcS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Onboarding = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Onboarding | Client Portal" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-slate-950 px-4"> <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-lg"> <h1 class="text-2xl font-bold text-white mb-2">
Welcome to Empower! 🚀
</h1> <p class="text-slate-400 mb-8">
Let's get your profile set up so we can start your project.
</p> <form id="onboarding-form" class="space-y-6"> <div class="grid grid-cols-2 gap-4"> <div> <label for="full_name" class="block text-sm font-medium text-slate-400 mb-1">Full Name</label> <input type="text" id="full_name" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. Sarah Johnson"> </div> <div> <label for="company_name" class="block text-sm font-medium text-slate-400 mb-1">Company Name</label> <input type="text" id="company_name" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="e.g. Bloom & Wild"> </div> </div> <div class="grid grid-cols-2 gap-4"> <div> <label for="phone" class="block text-sm font-medium text-slate-400 mb-1">Phone Number</label> <input type="tel" id="phone" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="07700 900000"> </div> <div> <label for="address" class="block text-sm font-medium text-slate-400 mb-1">Registered Address (UK)</label> <textarea id="address" required rows="1" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="123 High St, London, SW1A 1AA"></textarea> </div> </div> <div> <label for="legal_requirements" class="block text-sm font-medium text-slate-400 mb-1">Additional Invoice Details</label> <p class="text-xs text-slate-500 mb-2">
Any specific PO numbers or billing contacts?
</p> <textarea id="legal_requirements" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" placeholder="PO Required: #12345"></textarea> </div> <button type="submit" class="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors">
Complete Setup
</button> </form> </div> <p id="error-msg" class="text-red-400 text-sm mt-4 text-center hidden"></p> </div> ` })} ${renderScript($$result, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/portal/onboarding.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/portal/onboarding.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/portal/onboarding.astro";
const $$url = "/portal/onboarding";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Onboarding,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
