import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BVdSWecw.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_DAze6MJw.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from '../../../chunks/supabase_RTjNtfxf.mjs';
import { FileText, Link, Upload, File, CheckCircle, Clock, ExternalLink, Trash2 } from 'lucide-react';
export { renderers } from '../../../renderers.mjs';

function ProjectManager({ projectId }) {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkData, setLinkData] = useState({ name: "", url: "" });
  useEffect(() => {
    fetchData();
  }, [projectId]);
  const fetchData = async () => {
    const { data: proj } = await supabase.from("projects").select("*, profiles(full_name, company_name, email)").eq("id", projectId).single();
    setProject(proj);
    const { data: docs } = await supabase.from("documents").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    setDocuments(docs || []);
    setLoading(false);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${projectId}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("portal-files").upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("portal-files").getPublicUrl(filePath);
      const { error: dbError } = await supabase.from("documents").insert({
        project_id: projectId,
        name: file.name,
        url: publicUrl,
        type: "file",
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        uploaded_by: (await supabase.auth.getUser()).data.user?.id,
        status: "shared"
      });
      if (dbError) throw dbError;
      fetchData();
    } catch (error) {
      alert("Error uploading file: " + error.message);
    } finally {
      setUploading(false);
    }
  };
  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("documents").insert({
        project_id: projectId,
        name: linkData.name,
        url: linkData.url,
        type: "link",
        status: "shared",
        uploaded_by: (await supabase.auth.getUser()).data.user?.id
      });
      if (error) throw error;
      setShowLinkModal(false);
      setLinkData({ name: "", url: "" });
      fetchData();
    } catch (error) {
      alert("Error adding link: " + error.message);
    }
  };
  const handleDelete = async (id, path) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await supabase.from("documents").delete().eq("id", id);
      fetchData();
    } catch (error) {
      alert("Error deleting item: " + error.message);
    }
  };
  if (loading) return /* @__PURE__ */ jsx("div", { className: "text-white", children: "Loading Project Details..." });
  if (!project) return /* @__PURE__ */ jsx("div", { className: "text-white", children: "Project not found." });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: project.name }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-slate-400", children: [
        /* @__PURE__ */ jsx("span", { children: project.profiles?.full_name }),
        /* @__PURE__ */ jsx("span", { children: "•" }),
        /* @__PURE__ */ jsx("span", { children: project.profiles?.company_name }),
        /* @__PURE__ */ jsx("span", { children: "•" }),
        /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-xs border border-emerald-500/20 uppercase font-bold", children: project.status })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 rounded-xl border border-slate-800 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-slate-800 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-purple-400" }),
          "File & Link Centre"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowLinkModal(true),
              className: "flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm",
              children: [
                /* @__PURE__ */ jsx(Link, { className: "w-4 h-4" }),
                "Add Link"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer ${uploading ? "opacity-50 cursor-not-allowed" : ""}`, children: [
            /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4" }),
            uploading ? "Uploading..." : "Upload File",
            /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", onChange: handleFileUpload, disabled: uploading })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-6", children: documents.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-center py-8", children: "No files or links shared yet." }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: documents.map((doc) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: `p-3 rounded-lg ${doc.type === "link" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"}`, children: doc.type === "link" ? /* @__PURE__ */ jsx(Link, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(File, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: doc.name }),
              doc.status === "signed" && /* @__PURE__ */ jsxs("span", { className: "px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold rounded border border-emerald-500/20 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
                " Signed"
              ] }),
              doc.status === "pending_signature" && /* @__PURE__ */ jsxs("span", { className: "px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] uppercase font-bold rounded border border-amber-500/20 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                " Awaiting Sign"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-xs text-slate-500 mt-1", children: [
              /* @__PURE__ */ jsx("span", { children: new Date(doc.created_at).toLocaleDateString() }),
              doc.size && /* @__PURE__ */ jsxs("span", { children: [
                "• ",
                doc.size
              ] }),
              doc.signed_at && /* @__PURE__ */ jsxs("span", { children: [
                "• Signed: ",
                new Date(doc.signed_at).toLocaleDateString()
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: doc.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors",
              title: "Open",
              children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(doc.id),
              className: "p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors",
              title: "Delete",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }, doc.id)) }) })
    ] }),
    showLinkModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Add External Link" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAddLink, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-400 mb-1", children: "Link Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500",
              placeholder: "e.g. Google Drive Folder",
              value: linkData.name,
              onChange: (e) => setLinkData({ ...linkData, name: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-400 mb-1", children: "URL" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              required: true,
              className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500",
              placeholder: "https://...",
              value: linkData.url,
              onChange: (e) => setLinkData({ ...linkData, url: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowLinkModal(false),
              className: "px-4 py-2 text-slate-400 hover:text-white transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold",
              children: "Add Link"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Astro = createAstro("https://empowerdigitalsolutions.co.uk");
const prerender = false;
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Manage Project | Empower Admin` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-slate-950 text-white p-8"> <div class="max-w-5xl mx-auto"> <a href="/admin/dashboard" class="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
&larr; Back to Dashboard
</a> ${renderComponent($$result2, "ProjectManager", ProjectManager, { "client:load": true, "projectId": id || "", "client:component-hydration": "load", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/admin/ProjectManager", "client:component-export": "default" })} </div> </div> ` })}`;
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
