import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_DxiAvFAF.mjs';
/* empty css                                            */
import { $ as $$ArrowLeft } from '../../../chunks/ArrowLeft_ePT7UvX8.mjs';
import { $ as $$ShoppingBag } from '../../../chunks/ShoppingBag_CqN2GxPF.mjs';
import { $ as $$Coffee } from '../../../chunks/Coffee_CjzvGsRu.mjs';
import { $ as $$Heart } from '../../../chunks/Heart_D5xQ6byx.mjs';
import { $ as $$Clock, a as $$Sun } from '../../../chunks/Sun_Ctc1I_9n.mjs';
export { renderers } from '../../../renderers.mjs';

const $$SlowRoast = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Slow Roast | The Artisan Vault", "data-astro-cid-dzpokdmg": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="grain-overlay" data-astro-cid-dzpokdmg></div> <main class="bg-[#fff9f0] text-[#5c4033] min-h-screen selection:bg-[#d97706] selection:text-white relative" data-astro-cid-dzpokdmg> <!-- Navigation --> <nav class="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center" data-astro-cid-dzpokdmg> <a href="/studio/artisan" class="flex items-center gap-2 font-sans-artisan text-sm uppercase tracking-widest hover:text-[#d97706] transition-colors" data-astro-cid-dzpokdmg> ${renderComponent($$result2, "ArrowLeft", $$ArrowLeft, { "class": "w-4 h-4", "data-astro-cid-dzpokdmg": true })} Back to Vault
</a> <div class="font-serif-artisan italic text-xl" data-astro-cid-dzpokdmg>Slow Roast</div> <div class="relative" data-astro-cid-dzpokdmg> ${renderComponent($$result2, "ShoppingBag", $$ShoppingBag, { "class": "w-6 h-6 hover:text-[#d97706] transition-colors cursor-pointer", "data-astro-cid-dzpokdmg": true })} <div class="absolute -top-1 -right-1 w-4 h-4 bg-[#d97706] rounded-full text-white text-[10px] flex items-center justify-center font-bold" data-astro-cid-dzpokdmg>
2
</div> </div> </nav> <!-- HERO SECTION --> <section class="min-h-screen flex flex-col justify-center items-center p-6 relative" data-astro-cid-dzpokdmg> <div class="max-w-4xl mx-auto text-center relative z-10" data-astro-cid-dzpokdmg> <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5c4033] text-[#fff9f0] mb-8" data-astro-cid-dzpokdmg> ${renderComponent($$result2, "Coffee", $$Coffee, { "class": "w-8 h-8", "data-astro-cid-dzpokdmg": true })} </div> <h1 class="font-serif-artisan text-6xl md:text-8xl mb-6 text-[#3e2723]" data-astro-cid-dzpokdmg>
Mornings,<br data-astro-cid-dzpokdmg>Reclaimed.
</h1> <div class="relative w-full max-w-2xl mx-auto aspect-video mb-12 rounded-lg overflow-hidden shadow-2xl shadow-[#5c4033]/20 rotate-1 hover:rotate-0 transition-transform duration-700" data-astro-cid-dzpokdmg> <img src="/images/artisan-hero.png" alt="Pour over coffee" class="w-full h-full object-cover" data-astro-cid-dzpokdmg> <div class="absolute inset-0 bg-[#5c4033]/10 mix-blend-multiply" data-astro-cid-dzpokdmg></div> </div> <p class="font-sans-artisan text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 text-[#795548]" data-astro-cid-dzpokdmg>
We don't automate our roast. We listen to the beans. Small
                    batch coffee for people who sit down to drink it.
</p> <button class="bg-[#d97706] text-white px-8 py-3 rounded-full font-sans-artisan font-semibold hover:bg-[#b45309] transition-colors shadow-lg shadow-orange-900/10" data-astro-cid-dzpokdmg>
Shop The Roast
</button> </div> </section> <!-- FEATURES --> <section class="py-24 px-6 bg-white/50" data-astro-cid-dzpokdmg> <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-dzpokdmg> <div class="bg-white p-8 rounded-2xl border border-[#5c4033]/10 text-center hover:border-[#d97706]/30 transition-colors" data-astro-cid-dzpokdmg> ${renderComponent($$result2, "Heart", $$Heart, { "class": "w-8 h-8 mx-auto mb-4 text-[#d97706]", "data-astro-cid-dzpokdmg": true })} <h3 class="font-serif-artisan text-xl font-semibold mb-2" data-astro-cid-dzpokdmg>
Fair Trade
</h3> <p class="font-sans-artisan text-sm opacity-70" data-astro-cid-dzpokdmg>
Farmers first. Always.
</p> </div> <div class="bg-white p-8 rounded-2xl border border-[#5c4033]/10 text-center hover:border-[#d97706]/30 transition-colors" data-astro-cid-dzpokdmg> ${renderComponent($$result2, "Clock", $$Clock, { "class": "w-8 h-8 mx-auto mb-4 text-[#d97706]", "data-astro-cid-dzpokdmg": true })} <h3 class="font-serif-artisan text-xl font-semibold mb-2" data-astro-cid-dzpokdmg>
Small Batch
</h3> <p class="font-sans-artisan text-sm opacity-70" data-astro-cid-dzpokdmg>
Roasted every Tuesday.
</p> </div> <div class="bg-white p-8 rounded-2xl border border-[#5c4033]/10 text-center hover:border-[#d97706]/30 transition-colors" data-astro-cid-dzpokdmg> ${renderComponent($$result2, "Sun", $$Sun, { "class": "w-8 h-8 mx-auto mb-4 text-[#d97706]", "data-astro-cid-dzpokdmg": true })} <h3 class="font-serif-artisan text-xl font-semibold mb-2" data-astro-cid-dzpokdmg>
Perfect Grind
</h3> <p class="font-sans-artisan text-sm opacity-70" data-astro-cid-dzpokdmg>
Consistent every time.
</p> </div> </div> </section> <!-- MARQUEE --> <div class="w-full overflow-hidden py-6 border-t border-b border-[#5c4033]/10 bg-[#fff9f0]" data-astro-cid-dzpokdmg> <div class="animate-[marquee_40s_linear_infinite] whitespace-nowrap font-serif-artisan italic text-xl text-[#8d6e63]" data-astro-cid-dzpokdmg>
ETHIOPIA YIRGACHEFFE ~ COLOMBIA HUILA ~ GUATEMALA ANTIGUA ~
                BRAZIL SANTOS ~ ETHIOPIA YIRGACHEFFE ~ COLOMBIA HUILA ~
                GUATEMALA ANTIGUA ~ BRAZIL SANTOS
</div> </div> </main> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/studio/artisan/slow-roast.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/studio/artisan/slow-roast.astro";
const $$url = "/studio/artisan/slow-roast";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$SlowRoast,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
