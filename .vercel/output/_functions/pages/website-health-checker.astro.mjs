import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CsB7TRoA.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CE1yIfM6.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Server, Globe, Loader2, ArrowRight, AlertTriangle, Smartphone, Monitor, Activity, CheckCircle, BarChart3, X } from 'lucide-react';
import { $ as $$Gauge } from '../chunks/Gauge_C-iSKhd-.mjs';
import { $ as $$CheckCircle2 } from '../chunks/CheckCircle2_vd_DPFBn.mjs';
import { $ as $$MousePointerClick } from '../chunks/MousePointerClick_DDcP3fLe.mjs';
export { renderers } from '../renderers.mjs';

const HealthChecker = () => {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("wordpress");
  const [siteSize, setSiteSize] = useState("small");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [strategy, setStrategy] = useState("mobile");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDesktop = window.innerWidth >= 1024;
      setStrategy(isDesktop ? "desktop" : "mobile");
    }
  }, []);
  const analyzeWebsite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(10);
    try {
      setProgress(30);
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategy })
      });
      setProgress(60);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
      setProgress(100);
    } catch (err) {
      setError(err.message || "Something went wrong. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };
  const getZone = (score) => {
    if (score < 50) return { name: "Red Zone Rescue", color: "text-red-500", bg: "bg-red-500", border: "border-red-500", range: "0-49" };
    if (score < 90) return { name: "Amber Zone Audit", color: "text-amber-500", bg: "bg-amber-500", border: "border-amber-500", range: "50-89" };
    return { name: "Green Zone Polish", color: "text-green-500", bg: "bg-green-500", border: "border-green-500", range: "90-100" };
  };
  const calculatePackage = (data) => {
    const scores = [data.score, data.seoScore, data.accessibilityScore];
    const minScore = Math.min(...scores);
    let recommendation2 = {};
    if (minScore < 50) {
      recommendation2 = {
        title: "Critical Site Rescue",
        description: "Your site has foundational issues affecting ranking and user experience. Immediate rescue work is recommended.",
        package: "Rescue Package",
        basePrice: 300,
        action: "Book Rescue"
      };
    } else if (minScore < 90) {
      recommendation2 = {
        title: "Full Optimisation",
        description: "Your site is functional but losing ground to faster competitors. A comprehensive tune-up will push you into the green.",
        package: "Optimisation Package",
        basePrice: 150,
        action: "Book Optimisation"
      };
    } else {
      recommendation2 = {
        title: "Perfectionist Polish",
        description: "Excellent health! A final polish will clear any minor warnings and help you maintain that perfect 100.",
        package: "Polish Package",
        basePrice: 75,
        action: "Book Polish"
      };
    }
    let multiplier = 1;
    if (siteSize === "medium") multiplier *= 1.5;
    if (siteSize === "large") {
      recommendation2.priceDisplay = "Custom Quote";
      return recommendation2;
    }
    if (platform !== "wordpress") multiplier *= 0.75;
    const finalPrice = Math.round(recommendation2.basePrice * multiplier);
    recommendation2.priceDisplay = `£${finalPrice}`;
    return recommendation2;
  };
  const ScoreCard = ({ title, score, icon: Icon }) => {
    const zone = getZone(score);
    return /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
        " ",
        title
      ] }),
      /* @__PURE__ */ jsx("div", { className: `w-20 h-20 rounded-full border-4 flex items-center justify-center mb-2 ${zone.color} ${zone.border}`, children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-black", children: Math.round(score) }) }),
      /* @__PURE__ */ jsxs("span", { className: `text-xs font-bold px-2 py-1 rounded-full text-white ${zone.bg}`, children: [
        zone.name.split(" ")[0],
        " Zone"
      ] })
    ] });
  };
  const recommendation = result ? calculatePackage(result) : null;
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-5xl mx-auto p-4 md:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-slate-100 dark:border-slate-700 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-linear-to-r from-empower-pink to-purple-600" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white", children: "Website Health Check" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-slate-500 dark:text-slate-400 mb-8", children: "Get a comprehensive analysis of your site's Performance, SEO, and Accessibility." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: analyzeWebsite, className: "space-y-6 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: "Website URL" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                placeholder: "https://yourwebsite.com",
                value: url,
                onChange: (e) => setUrl(e.target.value),
                required: true,
                className: "w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-empower-pink outline-none transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: "Platform" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Server, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: platform,
                  onChange: (e) => setPlatform(e.target.value),
                  className: "w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-empower-pink outline-none appearance-none cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "wordpress", children: "WordPress" }),
                    /* @__PURE__ */ jsx("option", { value: "wix", children: "Wix" }),
                    /* @__PURE__ */ jsx("option", { value: "squarespace", children: "Squarespace" }),
                    /* @__PURE__ */ jsx("option", { value: "shopify", children: "Shopify" }),
                    /* @__PURE__ */ jsx("option", { value: "custom", children: "Custom / Other" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: "Site Size" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Globe, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: siteSize,
                  onChange: (e) => setSiteSize(e.target.value),
                  className: "w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-empower-pink outline-none appearance-none cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "small", children: "Small (1-10 Pages)" }),
                    /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium (11-50 Pages)" }),
                    /* @__PURE__ */ jsx("option", { value: "large", children: "Large (50+ Pages)" })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-empower-pink hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg",
            children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "animate-spin w-6 h-6" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Analysing... ",
                progress,
                "%"
              ] })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { children: "Run Full Diagnosis" }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-slate-400", children: [
          "Running ",
          strategy,
          " analysis based on your current device."
        ] })
      ] }),
      loading && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-slate-100 rounded-full overflow-hidden mb-2", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-full bg-empower-pink transition-all duration-500 ease-out",
            style: { width: `${progress}%` }
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-slate-400 text-sm animate-pulse", children: "We are analysing your webpage, this may take a few moments." })
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 shrink-0" }),
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: error })
      ] })
    ] }),
    result && /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700", children: [
          /* @__PURE__ */ jsx("div", { className: `p-3 rounded-lg ${strategy === "mobile" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`, children: strategy === "mobile" ? /* @__PURE__ */ jsx(Smartphone, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Monitor, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg text-slate-900 dark:text-white capitalize", children: [
              strategy,
              " Analysis"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: strategy === "mobile" ? "Simulated Moto G4 • 4G Network" : "Simulated Desktop • Wired Connection" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
          /* @__PURE__ */ jsx(ScoreCard, { title: "Speed", score: result.score, icon: Activity }),
          /* @__PURE__ */ jsx(ScoreCard, { title: "SEO", score: result.seoScore, icon: Globe }),
          /* @__PURE__ */ jsx(ScoreCard, { title: "UX", score: result.accessibilityScore, icon: CheckCircle })
        ] }),
        result.aiInsight && /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2 text-empower-pink font-bold text-xs uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(Monitor, { className: "w-4 h-4" }),
            " AI Insight"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed", children: [
            '"',
            result.aiInsight,
            '"'
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-empower-pink/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row gap-10 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/10", children: [
              /* @__PURE__ */ jsx(BarChart3, { className: "w-4 h-4" }),
              "AI Diagnosis Complete"
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-bold mb-4", children: recommendation.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl", children: recommendation.description }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Platform:" }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-bold capitalize", children: platform })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Size:" }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-bold capitalize", children: siteSize })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-96 bg-white text-slate-900 p-8 rounded-2xl shadow-xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center border-b border-slate-100 pb-6 mb-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 uppercase font-bold tracking-widest mb-2", children: "Recommended Solution" }),
              /* @__PURE__ */ jsx("h4", { className: "text-2xl font-black text-empower-pink", children: recommendation.package })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "text-5xl font-black mb-1", children: recommendation.priceDisplay }),
              recommendation.priceDisplay !== "Custom Quote" && /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-sm font-medium", children: "One-time investment" })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setShowModal(true),
                className: "w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2",
                children: [
                  recommendation.action,
                  " ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowModal(false),
          className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center", children: "Let's Fix This." }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-600 dark:text-slate-300 mb-8 text-center text-sm", children: [
          "Enter your email to request the ",
          /* @__PURE__ */ jsx("strong", { children: recommendation.package }),
          " for ",
          /* @__PURE__ */ jsx("strong", { children: url }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("form", { action: "https://formspree.io/f/movngvvy", method: "POST", className: "space-y-4", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "subject", value: `New Lead: ${recommendation.package}` }),
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "url", value: url }),
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "platform", value: platform }),
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "siteSize", value: siteSize }),
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "package", value: recommendation.package }),
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "price", value: recommendation.priceDisplay }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider", children: "Your Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "name",
                required: true,
                placeholder: "John Doe",
                className: "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-empower-pink outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                required: true,
                placeholder: "you@company.com",
                className: "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-empower-pink outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full bg-empower-pink text-white font-bold py-4 rounded-lg hover:bg-pink-700 transition-colors shadow-lg mt-2", children: "Confirm Request" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-slate-50 dark:bg-slate-900/50 p-4 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700", children: "We'll analyse your report and get back to you within 24 hours." })
    ] }) })
  ] });
};

const $$WebsiteHealthChecker = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Website Health Checker | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative pt-32 pb-20 px-6 overflow-hidden"> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none"> <div class="container mx-auto max-w-5xl text-center relative z-10"> <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
Is Your Website <span class="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-empower-pink">Losing You Customers?</span> </h1> <p class="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
A slow or poorly optimised site can be invisible to Google and
          frustrating for visitors. Find out how healthy your website is with
          our free, instant analysis tool.
</p> </div> </div> <!-- Tool Section --> <section class="py-12 px-4 bg-white dark:bg-slate-950"> ${renderComponent($$result2, "HealthChecker", HealthChecker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/HealthChecker", "client:component-export": "default" })} <p class="text-center text-sm text-slate-400 mt-8">
Powered by Google PageSpeed Insights API v5
</p> </section> <!-- SEO Content Section --> <section class="py-20 bg-slate-50 dark:bg-slate-900"> <div class="container mx-auto px-6 max-w-4xl"> <h2 class="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">
Unlock Your Website's <span class="text-empower-pink">True Potential</span> </h2> <div class="space-y-12"> <div class="flex flex-col md:flex-row gap-6 items-start"> <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-2xl text-purple-600 dark:text-purple-400 shrink-0"> ${renderComponent($$result2, "Gauge", $$Gauge, { "class": "w-8 h-8" })} </div> <div> <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">
Why Website Performance Matters
</h3> <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
In today's digital landscape, speed and user experience are
                everything. A slow website doesn't just annoy visitors - it
                directly impacts your search engine ranking. Google prioritises
                sites that offer a fast, seamless experience. Our Health Checker
                uses the same core metrics as Google to give you a real-world
                score.
</p> </div> </div> <div class="flex flex-col md:flex-row gap-6 items-start"> <div class="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-2xl text-empower-pink shrink-0"> ${renderComponent($$result2, "CheckCircle2", $$CheckCircle2, { "class": "w-8 h-8" })} </div> <div> <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">
Get More Than Just a Score
</h3> <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
Unlike other tools, our checker provides a tailored, actionable
                plan. We translate complex technical data into clear,
                easy-to-understand recommendations. Our report gives you the
                knowledge to make impactful improvements and enhance your SEO.
</p> </div> </div> <div class="flex flex-col md:flex-row gap-6 items-start"> <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0"> ${renderComponent($$result2, "MousePointerClick", $$MousePointerClick, { "class": "w-8 h-8" })} </div> <div> <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">
How to Use the Free Analysis Tool
</h3> <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
Simply enter your full website URL into the tool above and click
                "Run Full Diagnosis". Within seconds, you'll receive a detailed
                report for mobile and desktop, along with a custom action plan
                to help you boost your scores.
</p> </div> </div> </div> </div> </section> </section> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/website-health-checker.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/website-health-checker.astro";
const $$url = "/website-health-checker";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$WebsiteHealthChecker,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
