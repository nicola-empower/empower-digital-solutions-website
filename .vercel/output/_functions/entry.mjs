import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cj4NicbU.mjs';
import { manifest } from './manifest_DxpesQ_A.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/analyze.astro.mjs');
const _page3 = () => import('./pages/booking.astro.mjs');
const _page4 = () => import('./pages/clientportal.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/customwebapps.astro.mjs');
const _page7 = () => import('./pages/design-process.astro.mjs');
const _page8 = () => import('./pages/digitalplanner.astro.mjs');
const _page9 = () => import('./pages/inbox-zero.astro.mjs');
const _page10 = () => import('./pages/insights.astro.mjs');
const _page11 = () => import('./pages/insights/_---slug_.astro.mjs');
const _page12 = () => import('./pages/pdf/migration-guide.astro.mjs');
const _page13 = () => import('./pages/privacy.astro.mjs');
const _page14 = () => import('./pages/projects.astro.mjs');
const _page15 = () => import('./pages/services.astro.mjs');
const _page16 = () => import('./pages/terms.astro.mjs');
const _page17 = () => import('./pages/vaassist.astro.mjs');
const _page18 = () => import('./pages/web-design.astro.mjs');
const _page19 = () => import('./pages/webscraping.astro.mjs');
const _page20 = () => import('./pages/website-health-checker.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/analyze.ts", _page2],
    ["src/pages/booking.astro", _page3],
    ["src/pages/clientportal.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/customwebapps.astro", _page6],
    ["src/pages/design-process.astro", _page7],
    ["src/pages/digitalplanner.astro", _page8],
    ["src/pages/inbox-zero.astro", _page9],
    ["src/pages/insights/index.astro", _page10],
    ["src/pages/insights/[...slug].astro", _page11],
    ["src/pages/pdf/migration-guide.astro", _page12],
    ["src/pages/privacy.astro", _page13],
    ["src/pages/projects.astro", _page14],
    ["src/pages/services.astro", _page15],
    ["src/pages/terms.astro", _page16],
    ["src/pages/vaassist.astro", _page17],
    ["src/pages/web-design.astro", _page18],
    ["src/pages/webscraping.astro", _page19],
    ["src/pages/website-health-checker.astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d5695a08-8fa3-4ca4-8498-d89c14289bec",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
