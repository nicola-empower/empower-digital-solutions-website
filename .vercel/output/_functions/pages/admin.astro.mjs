import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DxiAvFAF.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from '../chunks/supabase_RTjNtfxf.mjs';
export { renderers } from '../renderers.mjs';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    console.log("AdminLogin component mounted and ready");
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: error2 } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error2) {
        throw error2;
      }
      console.log("Login successful", data);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-slate-400 mb-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            className: "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empower-pink focus:ring-1 focus:ring-empower-pink transition-colors",
            placeholder: "admin@empower.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-slate-400 mb-1", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            id: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            className: "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empower-pink focus:ring-1 focus:ring-empower-pink transition-colors",
            placeholder: "••••••••"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-empower-pink text-white hover:bg-vibrant-magenta shadow-lg hover:shadow-empower-pink/25"}`,
          children: loading ? "Authenticating..." : "Login to Dashboard"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center animate-pulse", children: error }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs", children: "Secure Admin Access • Empower Digital Solutions" }) })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Login | Empower Digital Solutions" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-slate-950 px-4"> <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md relative overflow-hidden">  <div class="absolute top-0 right-0 w-32 h-32 bg-empower-pink/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div> <div class="absolute bottom-0 left-0 w-32 h-32 bg-deep-purple/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div> <h1 class="text-2xl font-bold text-white mb-6 text-center relative z-10">
Admin Access
</h1> <div class="relative z-10"> ${renderComponent($$result2, "AdminLogin", AdminLogin, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/AdminLogin", "client:component-export": "default" })} </div> </div> </div> ` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
