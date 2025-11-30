import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DuQYtnB5.mjs';
import { manifest } from './manifest_BT5fpNuz.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/analyze.astro.mjs');
const _page4 = () => import('./pages/booking.astro.mjs');
const _page5 = () => import('./pages/clientportal.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/customwebapps.astro.mjs');
const _page8 = () => import('./pages/design-process.astro.mjs');
const _page9 = () => import('./pages/digitalplanner.astro.mjs');
const _page10 = () => import('./pages/featured-build.astro.mjs');
const _page11 = () => import('./pages/inbox-zero.astro.mjs');
const _page12 = () => import('./pages/insights.astro.mjs');
const _page13 = () => import('./pages/insights/_---slug_.astro.mjs');
const _page14 = () => import('./pages/pdf/migration-guide.astro.mjs');
const _page15 = () => import('./pages/privacy.astro.mjs');
const _page16 = () => import('./pages/projects.astro.mjs');
const _page17 = () => import('./pages/services.astro.mjs');
const _page18 = () => import('./pages/terms.astro.mjs');
const _page19 = () => import('./pages/vaassist.astro.mjs');
const _page20 = () => import('./pages/web-design.astro.mjs');
const _page21 = () => import('./pages/webscraping.astro.mjs');
const _page22 = () => import('./pages/website-health-checker.astro.mjs');
const _page23 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/analyze.ts", _page3],
    ["src/pages/booking.astro", _page4],
    ["src/pages/clientportal.astro", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/customwebapps.astro", _page7],
    ["src/pages/design-process.astro", _page8],
    ["src/pages/digitalplanner.astro", _page9],
    ["src/pages/featured-build.astro", _page10],
    ["src/pages/inbox-zero.astro", _page11],
    ["src/pages/insights/index.astro", _page12],
    ["src/pages/insights/[...slug].astro", _page13],
    ["src/pages/pdf/migration-guide.astro", _page14],
    ["src/pages/privacy.astro", _page15],
    ["src/pages/projects.astro", _page16],
    ["src/pages/services.astro", _page17],
    ["src/pages/terms.astro", _page18],
    ["src/pages/vaassist.astro", _page19],
    ["src/pages/web-design.astro", _page20],
    ["src/pages/webscraping.astro", _page21],
    ["src/pages/website-health-checker.astro", _page22],
    ["src/pages/index.astro", _page23]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2b1071d3-674c-43a5-b623-fd95a8515c26",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
