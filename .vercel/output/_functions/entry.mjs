import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CySa9bq6.mjs';
import { manifest } from './manifest_BipkNNKf.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/admin/dashboard.astro.mjs');
const _page4 = () => import('./pages/admin/project/_id_.astro.mjs');
const _page5 = () => import('./pages/admin.astro.mjs');
const _page6 = () => import('./pages/api/analyze.astro.mjs');
const _page7 = () => import('./pages/booking.astro.mjs');
const _page8 = () => import('./pages/clientportal.astro.mjs');
const _page9 = () => import('./pages/consulting.astro.mjs');
const _page10 = () => import('./pages/contact.astro.mjs');
const _page11 = () => import('./pages/customwebapps.astro.mjs');
const _page12 = () => import('./pages/design-process.astro.mjs');
const _page13 = () => import('./pages/digitalplanner.astro.mjs');
const _page14 = () => import('./pages/featured-build.astro.mjs');
const _page15 = () => import('./pages/inbox-zero.astro.mjs');
const _page16 = () => import('./pages/insights.astro.mjs');
const _page17 = () => import('./pages/insights/_---slug_.astro.mjs');
const _page18 = () => import('./pages/mvp-development.astro.mjs');
const _page19 = () => import('./pages/pdf/migration-guide.astro.mjs');
const _page20 = () => import('./pages/portal/dashboard.astro.mjs');
const _page21 = () => import('./pages/portal/onboarding.astro.mjs');
const _page22 = () => import('./pages/portal/signup.astro.mjs');
const _page23 = () => import('./pages/portal.astro.mjs');
const _page24 = () => import('./pages/privacy.astro.mjs');
const _page25 = () => import('./pages/projects.astro.mjs');
const _page26 = () => import('./pages/services.astro.mjs');
const _page27 = () => import('./pages/studio/architect.astro.mjs');
const _page28 = () => import('./pages/studio/artisan/echo-chamber.astro.mjs');
const _page29 = () => import('./pages/studio/artisan/slow-roast.astro.mjs');
const _page30 = () => import('./pages/studio/artisan.astro.mjs');
const _page31 = () => import('./pages/studio/curator.astro.mjs');
const _page32 = () => import('./pages/studio/disruptor/nexus.astro.mjs');
const _page33 = () => import('./pages/studio/disruptor.astro.mjs');
const _page34 = () => import('./pages/studio/titan/apex-capital.astro.mjs');
const _page35 = () => import('./pages/studio/titan/north-star.astro.mjs');
const _page36 = () => import('./pages/studio/titan.astro.mjs');
const _page37 = () => import('./pages/studio.astro.mjs');
const _page38 = () => import('./pages/terms.astro.mjs');
const _page39 = () => import('./pages/vaassist.astro.mjs');
const _page40 = () => import('./pages/web-design.astro.mjs');
const _page41 = () => import('./pages/website-health-checker.astro.mjs');
const _page42 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/admin/dashboard.astro", _page3],
    ["src/pages/admin/project/[id].astro", _page4],
    ["src/pages/admin/index.astro", _page5],
    ["src/pages/api/analyze.ts", _page6],
    ["src/pages/booking.astro", _page7],
    ["src/pages/clientportal.astro", _page8],
    ["src/pages/consulting.astro", _page9],
    ["src/pages/contact.astro", _page10],
    ["src/pages/customwebapps.astro", _page11],
    ["src/pages/design-process.astro", _page12],
    ["src/pages/digitalplanner.astro", _page13],
    ["src/pages/featured-build.astro", _page14],
    ["src/pages/inbox-zero.astro", _page15],
    ["src/pages/insights/index.astro", _page16],
    ["src/pages/insights/[...slug].astro", _page17],
    ["src/pages/mvp-development.astro", _page18],
    ["src/pages/pdf/migration-guide.astro", _page19],
    ["src/pages/portal/dashboard.astro", _page20],
    ["src/pages/portal/onboarding.astro", _page21],
    ["src/pages/portal/signup.astro", _page22],
    ["src/pages/portal/index.astro", _page23],
    ["src/pages/privacy.astro", _page24],
    ["src/pages/projects.astro", _page25],
    ["src/pages/services.astro", _page26],
    ["src/pages/studio/architect.astro", _page27],
    ["src/pages/studio/artisan/echo-chamber.astro", _page28],
    ["src/pages/studio/artisan/slow-roast.astro", _page29],
    ["src/pages/studio/artisan.astro", _page30],
    ["src/pages/studio/curator.astro", _page31],
    ["src/pages/studio/disruptor/nexus.astro", _page32],
    ["src/pages/studio/disruptor.astro", _page33],
    ["src/pages/studio/titan/apex-capital.astro", _page34],
    ["src/pages/studio/titan/north-star.astro", _page35],
    ["src/pages/studio/titan.astro", _page36],
    ["src/pages/studio/index.astro", _page37],
    ["src/pages/terms.astro", _page38],
    ["src/pages/vaassist.astro", _page39],
    ["src/pages/web-design.astro", _page40],
    ["src/pages/website-health-checker.astro", _page41],
    ["src/pages/index.astro", _page42]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8ef28764-2d7a-4a82-86cc-3eead0d0391b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
