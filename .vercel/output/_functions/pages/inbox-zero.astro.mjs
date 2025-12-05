import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BVdSWecw.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BDkAKW32.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Filter, Loader2, Play, Mail, AlertTriangle, Clock } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function InboxZeroDemo() {
  const [status, setStatus] = useState("idle");
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    inbox: 15284,
    unread: 8921,
    time: "2h 30m",
    missed: 42
  });
  const addLog = async (message, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, message]);
        const terminal = document.getElementById("terminal-body");
        if (terminal) terminal.scrollTop = terminal.scrollHeight;
        resolve();
      }, delay);
    });
  };
  const runSimulation = async (e) => {
    e.preventDefault();
    if (status === "running") return;
    setStatus("running");
    setLogs([]);
    await addLog({ text: "> Initializing G-Suite API Connection...", color: "text-slate-400" }, 100);
    await addLog({ text: "> Authenticating User: nicola@empower...", color: "text-slate-400" }, 400);
    await addLog({ text: "> [SUCCESS] Connection Established.", color: "text-green-400" }, 300);
    await addLog({ text: "> Scanning Inbox (15,284 threads)...", color: "text-blue-400" }, 600);
    await addLog({ text: "> [RULE 1] Identifying 'Invoice' & 'Quote' keywords...", color: "text-yellow-400" }, 500);
    await addLog({ text: "  >> Found 421 Finance Threads. Applying Label: [FINANCE]", color: "text-slate-500" }, 300);
    await addLog({ text: "> [RULE 2] Identifying 'Enquiry' keywords...", color: "text-yellow-400" }, 500);
    await addLog({ text: "  >> Found 58 Potential Leads. Applying Label: [PRIORITY]", color: "text-slate-500" }, 300);
    await addLog({ text: "> [RULE 3] Batch Archiving Newsletters > 90 Days...", color: "text-yellow-400" }, 600);
    await addLog({ text: "  >> Archived 12,501 Threads.", color: "text-slate-500" }, 400);
    await addLog({ text: "> [COMPLETE] Inbox Zero Achieved.", color: "text-green-400 font-bold" }, 200);
    await addLog({ text: "> Generating Report...", color: "text-blue-400" }, 500);
    setStats({
      inbox: 0,
      unread: 0,
      time: "< 10m",
      missed: 0
    });
    setStatus("complete");
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Filter, { className: "w-5 h-5 text-pink-500" }),
        " Script Configuration"
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: runSimulation, children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm text-slate-400", children: "Archive Threshold" }),
          /* @__PURE__ */ jsxs("select", { className: "w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-pink-500 transition-colors", children: [
            /* @__PURE__ */ jsx("option", { children: "Older than 90 Days" }),
            /* @__PURE__ */ jsx("option", { children: "Older than 60 Days" }),
            /* @__PURE__ */ jsx("option", { children: "Older than 30 Days" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm text-slate-400", children: "Active Rules" }),
          ["Auto-Label Finance Docs", "Highlight New Leads", "Archive Newsletters"].map((rule, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800", children: [
            /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-300", children: rule })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: status === "running",
            className: `w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${status === "running" ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-900/20"}`,
            children: status === "running" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
              " Processing..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Play, { className: "w-5 h-5" }),
              " Run Automation"
            ] })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx(StatCard, { label: "Inbox Count", value: stats.inbox, icon: Mail, color: status === "complete" ? "text-green-400" : "text-white" }),
        /* @__PURE__ */ jsx(StatCard, { label: "Unread", value: stats.unread, icon: AlertTriangle, color: status === "complete" ? "text-green-400" : "text-pink-400" }),
        /* @__PURE__ */ jsx(StatCard, { label: "Daily Time", value: stats.time, icon: Clock, color: "text-blue-400" }),
        /* @__PURE__ */ jsx(StatCard, { label: "Missed Leads", value: stats.missed, icon: AlertTriangle, color: status === "complete" ? "text-green-400" : "text-amber-400" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#0f172a] rounded-xl border border-slate-700 overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-amber-500" }),
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ml-4 text-xs font-mono text-slate-400", children: "run_inbox_zero.js — Node — 84x24" })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "terminal-body", className: "p-6 font-mono text-sm h-[300px] overflow-y-auto space-y-2 scroll-smooth", children: [
          status === "idle" && /* @__PURE__ */ jsxs("div", { className: "text-slate-500", children: [
            "> System Ready.",
            /* @__PURE__ */ jsx("br", {}),
            "> Waiting for user input...",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: "_" })
          ] }),
          logs.map((log, index) => /* @__PURE__ */ jsx("div", { className: `${log.color} break-all`, children: log.text }, index)),
          status === "running" && /* @__PURE__ */ jsx("div", { className: "animate-pulse text-pink-500", children: "_" })
        ] })
      ] })
    ] })
  ] });
}
function StatCard({ label, value, icon: Icon, color }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2 opacity-70", children: [
      /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-slate-300" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-slate-300", children: label })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `text-2xl font-bold font-mono transition-all duration-500 ${color}`, children: value.toLocaleString() })
  ] });
}

const $$InboxZero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Inbox Zero Automation | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-slate-900 min-h-screen text-white relative overflow-hidden"> <!-- Background Effects --> <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none"></div> <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[120px] pointer-events-none"></div> <div class="max-w-7xl mx-auto px-6 py-20 relative z-10"> <header class="text-center mb-16"> <div class="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"> <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
Google Apps Script Automation
</div> <h1 class="text-4xl md:text-6xl font-bold font-montserrat mb-6 leading-tight">
From 15,000 Emails to <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Zero.</span> </h1> <p class="text-lg text-slate-300 max-w-2xl mx-auto font-opensans">
A bespoke automation script that reclaimed 7 hours a week for a business owner drowning in digital noise.
</p> </header> <section class="mb-24"> ${renderComponent($$result2, "InboxZeroDemo", InboxZeroDemo, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/InboxZeroDemo.jsx", "client:component-export": "default" })} </section> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"> <div class="bg-white/5 border border-red-500/30 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"> <div class="flex items-center gap-4 mb-6"> <div class="p-3 bg-red-500/20 rounded-lg text-red-400"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> </div> <h2 class="text-2xl font-bold font-montserrat">The Chaos</h2> </div> <ul class="space-y-4 text-slate-300 font-opensans leading-relaxed"> <li class="flex gap-3"> <span class="text-red-500 mt-1">•</span>
15,000+ historical emails with zero folder structure.
</li> <li class="flex gap-3"> <span class="text-red-500 mt-1">•</span>
Critical leads buried under years of newsletters.
</li> <li class="flex gap-3"> <span class="text-red-500 mt-1">•</span>
Client reporting "high anxiety" every time they opened Gmail.
</li> </ul> </div> <div class="bg-white/5 border border-green-500/30 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"> <div class="flex items-center gap-4 mb-6"> <div class="p-3 bg-green-500/20 rounded-lg text-green-400"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg> </div> <h2 class="text-2xl font-bold font-montserrat">The Logic</h2> </div> <ul class="space-y-4 text-slate-300 font-opensans leading-relaxed"> <li class="flex gap-3"> <span class="text-green-500 mt-1">•</span> <span><strong>Smart-Filter Algorithm:</strong> Scanned headers for 'Invoice', 'Quote', and 'Contract' to auto-label financial docs.</span> </li> <li class="flex gap-3"> <span class="text-green-500 mt-1">•</span> <span><strong>Lead Rescue:</strong> Identified emails from new domains containing 'Enquiry' and moved them to 'Priority'.</span> </li> <li class="flex gap-3"> <span class="text-green-500 mt-1">•</span> <span><strong>The Great Purge:</strong> Safely archived 12k+ newsletter/promo emails older than 90 days.</span> </li> </ul> </div> </div> <section class="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-10 md:p-16 text-center border border-white/10 relative overflow-hidden"> <div class="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div> <div class="relative z-10"> <h2 class="text-3xl font-bold mb-6 font-montserrat">Automation isn't just code. It's sanity.</h2> <p class="text-purple-100 mb-8 max-w-2xl mx-auto text-lg">
This script runs silently every night at 3 AM. The client wakes up to a clean inbox, every single day.
</p> <a href="/contact" class="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-purple-50 transition-colors shadow-lg shadow-purple-900/50">
Automate My Busywork
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg> </a> </div> </section> </div> </main> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/inbox-zero.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/inbox-zero.astro";
const $$url = "/inbox-zero";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$InboxZero,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
