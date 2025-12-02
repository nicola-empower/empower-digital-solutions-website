import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BWfhTkDV.mjs';
import 'piccolore';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from '../chunks/supabase_RTjNtfxf.mjs';
import { FileText, CheckCircle, Circle, Upload, ExternalLink, Folder, Download } from 'lucide-react';
/* empty css                                        */
export { renderers } from '../renderers.mjs';

function ClientDashboard({ demoMode = false }) {
  const [loading, setLoading] = useState(!demoMode);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (demoMode) {
      setProject({
        id: "demo-123",
        name: "Demo Brand Redesign",
        status: "Active",
        progress: 65
      });
      setTasks([
        { id: 1, title: "Initial Consultation", is_completed: true, type: "admin_task" },
        { id: 2, title: "Brand Strategy Deck", is_completed: true, type: "admin_task" },
        { id: 3, title: "Logo Concepts", is_completed: false, type: "admin_task" },
        { id: 4, title: "Fill out Onboarding Form", is_completed: true, type: "client_task" },
        { id: 5, title: "Upload Brand Assets", is_completed: false, type: "client_task" },
        { id: 6, title: "Approve Moodboard", is_completed: false, type: "client_task" }
      ]);
      setDocuments([
        { id: 1, name: "Contract_Signed.pdf", size: "1.2 MB", created_at: (/* @__PURE__ */ new Date()).toISOString(), url: "#" },
        { id: 2, name: "Brand_Guidelines_v1.pdf", size: "4.5 MB", created_at: (/* @__PURE__ */ new Date()).toISOString(), url: "#" }
      ]);
      setLoading(false);
    } else {
      fetchProjectData();
    }
  }, [demoMode]);
  const fetchProjectData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = "/portal";
      return;
    }
    const { data: projects } = await supabase.from("projects").select("*").eq("client_id", session.user.id).limit(1);
    if (projects && projects.length > 0) {
      const currentProject = projects[0];
      setProject(currentProject);
      const { data: projectTasks } = await supabase.from("tasks").select("*").eq("project_id", currentProject.id).order("created_at", { ascending: true });
      setTasks(projectTasks || []);
      const { data: projectDocs } = await supabase.from("documents").select("*").eq("project_id", currentProject.id).order("created_at", { ascending: false });
      setDocuments(projectDocs || []);
    }
    setLoading(false);
  };
  const handleLogout = async () => {
    if (demoMode) {
      alert("This is just a demo! In the real portal, this logs you out.");
      return;
    }
    await supabase.auth.signOut();
    window.location.href = "/portal";
  };
  const handleFileUpload = async (e) => {
    if (demoMode) {
      alert("File upload is disabled in demo mode.");
      return;
    }
    const file = e.target.files[0];
    if (!file || !project) return;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${project.id}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("portal-files").upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("portal-files").getPublicUrl(filePath);
      const { error: dbError } = await supabase.from("documents").insert({
        project_id: project.id,
        name: file.name,
        url: publicUrl,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        uploaded_by: (await supabase.auth.getUser()).data.user.id
      });
      if (dbError) throw dbError;
      await supabase.from("activity_logs").insert({
        project_id: project.id,
        message: `Client uploaded file: ${file.name}`
      });
      alert("File uploaded successfully!");
      fetchProjectData();
    } catch (error) {
      alert("Error uploading file: " + error.message);
    } finally {
      setUploading(false);
    }
  };
  const toggleTask = async (taskId, currentStatus) => {
    if (demoMode) {
      setTasks(tasks.map((t) => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));
      return;
    }
    setTasks(tasks.map((t) => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));
    const { error } = await supabase.from("tasks").update({ is_completed: !currentStatus }).eq("id", taskId);
    if (error) {
      alert("Error updating task");
      fetchProjectData();
    } else {
      if (!currentStatus) {
        await supabase.from("activity_logs").insert({
          project_id: project.id,
          message: `Client completed task.`
          // Could be more specific
        });
      }
    }
  };
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [signingDoc, setSigningDoc] = useState(null);
  const [signatureName, setSignatureName] = useState("");
  const handleSignDocument = async (e) => {
    e.preventDefault();
    if (!signingDoc || !signatureName) return;
    try {
      const { error } = await supabase.from("documents").update({
        status: "signed",
        signed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", signingDoc.id);
      if (error) throw error;
      await supabase.from("activity_logs").insert({
        project_id: project.id,
        message: `Client digitally signed: ${signingDoc.name}`
      });
      alert("Document signed successfully!");
      setSignModalOpen(false);
      setSigningDoc(null);
      setSignatureName("");
      fetchProjectData();
    } catch (error) {
      alert("Error signing document: " + error.message);
    }
  };
  const openSignModal = (doc) => {
    setSigningDoc(doc);
    setSignModalOpen(true);
  };
  if (loading) return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-slate-950 flex items-center justify-center text-white", children: "Loading Project..." });
  const [profileData, setProfileData] = useState({
    full_name: "",
    company_name: "",
    phone: ""
  });
  useEffect(() => {
    if (!project && !loading) {
      fetchProfile();
    }
  }, [project, loading]);
  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setProfileData({
          full_name: data.full_name || "",
          company_name: data.company_name || "",
          phone: data.phone || ""
        });
      }
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("profiles").update({
      full_name: profileData.full_name,
      company_name: profileData.company_name,
      phone: profileData.phone
    }).eq("id", user.id);
    if (error) {
      alert("Error updating profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };
  if (!project) return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-slate-950 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Welcome to Empower! 🚀" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "We're getting your dashboard ready. In the meantime, please complete your profile so we can set up your project correctly." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-400 mb-1", children: "Full Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            required: true,
            className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500",
            value: profileData.full_name,
            onChange: (e) => setProfileData({ ...profileData, full_name: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-400 mb-1", children: "Company Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500",
            placeholder: "e.g. Acme Corp",
            value: profileData.company_name,
            onChange: (e) => setProfileData({ ...profileData, company_name: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-400 mb-1", children: "Phone Number" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500",
            value: profileData.phone,
            onChange: (e) => setProfileData({ ...profileData, phone: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mt-4",
          children: "Save Details"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-slate-800 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mb-4", children: "Need to sign out?" }),
      /* @__PURE__ */ jsx("button", { onClick: handleLogout, className: "text-slate-400 hover:text-white transition-colors text-sm", children: "Logout" })
    ] })
  ] }) });
  const myActionPlan = tasks.filter((t) => t.type === "admin_task");
  const clientRequirements = tasks.filter((t) => t.type === "client_task");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-950 pt-12 px-6 pb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white", children: project.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-400 mt-2", children: [
            "Status: ",
            /* @__PURE__ */ jsx("span", { className: "text-empower-pink font-bold", children: project.status })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleLogout, className: "text-slate-400 hover:text-white transition-colors", children: "Logout" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-8 border-b border-slate-800 mb-8", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveTab("overview"),
            className: `pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "overview" ? "text-empower-pink border-b-2 border-empower-pink" : "text-slate-500 hover:text-slate-300"}`,
            children: "Overview"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveTab("documents"),
            className: `pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "documents" ? "text-empower-pink border-b-2 border-empower-pink" : "text-slate-500 hover:text-slate-300"}`,
            children: "File Centre"
          }
        )
      ] }),
      activeTab === "overview" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-8 rounded-2xl border border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-amber-500/10 rounded-lg text-amber-500", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "My Action Plan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            myActionPlan.map((task) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50", children: [
              task.is_completed ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-emerald-500 shrink-0" }) : /* @__PURE__ */ jsx(Circle, { className: "w-5 h-5 text-slate-600 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: `text-sm ${task.is_completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: task.title })
            ] }, task.id)),
            myActionPlan.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-slate-500 italic", children: "No actions listed yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-8 rounded-2xl border border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-purple-500/10 rounded-lg text-purple-500", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "Your Tasks" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            clientRequirements.map((task) => /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => toggleTask(task.id, task.is_completed),
                className: "flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50 cursor-pointer hover:border-purple-500/50 transition-colors",
                children: [
                  task.is_completed ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-emerald-500 shrink-0" }) : /* @__PURE__ */ jsx(Circle, { className: "w-5 h-5 text-purple-500 shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: `text-sm ${task.is_completed ? "text-slate-500 line-through" : "text-white"}`, children: task.title })
                ]
              },
              task.id
            )),
            clientRequirements.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-slate-500 italic", children: "No tasks assigned to you." })
          ] })
        ] })
      ] }),
      activeTab === "documents" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-8 rounded-2xl border border-slate-800", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "Upload Files" }),
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-purple-500 transition-colors relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                onChange: handleFileUpload,
                disabled: uploading,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 bg-slate-800 rounded-full", children: /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-purple-400" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-white font-medium mb-1", children: uploading ? "Uploading..." : "Click or Drag to Upload" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm", children: "Support for images, PDF, and docs" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-8 rounded-2xl border border-slate-800", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "Shared Files" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            documents.map((doc) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: `p-2 rounded-lg ${doc.type === "link" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"}`, children: doc.type === "link" ? /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Folder, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-white font-medium text-sm", children: doc.name }),
                    doc.status === "pending_signature" && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 uppercase font-bold", children: "Sign Req." }),
                    doc.status === "signed" && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-bold", children: "Signed" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500", children: [
                    doc.type === "link" ? "External Link" : doc.size,
                    " • ",
                    new Date(doc.created_at).toLocaleDateString()
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                doc.status === "pending_signature" && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => openSignModal(doc),
                    className: "px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded hover:bg-amber-400 transition-colors",
                    children: "Sign"
                  }
                ),
                /* @__PURE__ */ jsx("a", { href: doc.url, target: "_blank", rel: "noopener noreferrer", className: "p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors", children: doc.type === "link" ? /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }) })
              ] })
            ] }, doc.id)),
            documents.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-slate-500 italic", children: "No documents shared yet." })
          ] })
        ] })
      ] })
    ] }),
    signModalOpen && signingDoc && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Digital Acceptance" }),
      /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-sm mb-6", children: [
        "By signing this document (",
        signingDoc.name,
        "), you agree to the terms and conditions outlined within it."
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSignDocument, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-400 mb-1", children: "Type Full Name to Sign" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 font-mono",
              placeholder: "e.g. Jane Doe",
              value: signatureName,
              onChange: (e) => setSignatureName(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSignModalOpen(false),
              className: "px-4 py-2 text-slate-400 hover:text-white transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold",
              children: "Confirm & Sign"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const $$Clientportal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden" data-astro-cid-nynju7iy> <div class="text-center text-white px-6 max-w-5xl mx-auto" data-astro-cid-nynju7iy> <div class="glass-effect inline-flex items-center px-4 py-2 rounded-full mb-8" data-astro-cid-nynju7iy> <span class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" data-astro-cid-nynju7iy></span> <span class="text-sm font-semibold" data-astro-cid-nynju7iy>Experience the Future of Agency Collaboration</span> </div> <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-astro-cid-nynju7iy>
Your Project,<br data-astro-cid-nynju7iy> <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-empower-pink" data-astro-cid-nynju7iy>
Crystal Clear.
</span> </h1> <p class="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed" data-astro-cid-nynju7iy>
No more email chains or lost files. We provide a dedicated, secure portal
      for every client to track progress, share assets, and stay in the loop.
</p> <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" data-astro-cid-nynju7iy> <a href="#demo" class="bg-white text-[#E5007E] px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105" data-astro-cid-nynju7iy>
Try the Interactive Demo
</a> <a href="/portal/signup" class="glass-effect text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all" data-astro-cid-nynju7iy>
Create Your Account
</a> </div> </div> </section> <section class="py-20 bg-white dark:bg-slate-900" data-astro-cid-nynju7iy> <div class="max-w-6xl mx-auto px-6" data-astro-cid-nynju7iy> <div class="text-center mb-16" data-astro-cid-nynju7iy> <h2 class="text-4xl md:text-5xl font-bold text-[#E5007E] dark:text-white mb-6" data-astro-cid-nynju7iy>
Why We Built This
</h2> <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-astro-cid-nynju7iy>
We believe in radical transparency. You shouldn't have to chase us for
        updates.
</p> </div> <div class="grid md:grid-cols-3 gap-8" data-astro-cid-nynju7iy> <div class="text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-lg" data-astro-cid-nynju7iy> <div class="text-5xl mb-6" data-astro-cid-nynju7iy>📂</div> <h3 class="text-2xl font-bold text-[#E5007E] dark:text-white mb-4" data-astro-cid-nynju7iy>
Centralised Files
</h3> <p class="text-gray-600 dark:text-gray-300" data-astro-cid-nynju7iy>
All your contracts, brand assets, and deliverables in one secure
          place. Never lose a file again.
</p> </div> <div class="text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-lg" data-astro-cid-nynju7iy> <div class="text-5xl mb-6" data-astro-cid-nynju7iy>✅</div> <h3 class="text-2xl font-bold text-[#E5007E] dark:text-white mb-4" data-astro-cid-nynju7iy>
Real-time Progress
</h3> <p class="text-gray-600 dark:text-gray-300" data-astro-cid-nynju7iy>
See exactly what we're working on with live checklists and status
          updates.
</p> </div> <div class="text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-lg" data-astro-cid-nynju7iy> <div class="text-5xl mb-6" data-astro-cid-nynju7iy>🔒</div> <h3 class="text-2xl font-bold text-[#E5007E] dark:text-white mb-4" data-astro-cid-nynju7iy>
Secure & Private
</h3> <p class="text-gray-600 dark:text-gray-300" data-astro-cid-nynju7iy>
Your data is protected with enterprise-grade security. Only you and
          our team have access.
</p> </div> </div> </div> </section> <section id="demo" class="py-20 bg-slate-950" data-astro-cid-nynju7iy> <div class="max-w-7xl mx-auto px-6" data-astro-cid-nynju7iy> <div class="text-center mb-12" data-astro-cid-nynju7iy> <h2 class="text-4xl md:text-5xl font-bold text-white mb-6" data-astro-cid-nynju7iy>
See It In Action
</h2> <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-astro-cid-nynju7iy>
This is the actual dashboard you'll use. Feel free to click around!
</p> </div> <div class="border border-slate-800 rounded-2xl overflow-hidden shadow-2xl" data-astro-cid-nynju7iy> ${renderComponent($$result, "ClientDashboard", ClientDashboard, { "client:visible": true, "demoMode": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/components/ClientDashboard", "client:component-export": "default", "data-astro-cid-nynju7iy": true })} </div> <div class="mt-16 text-center" data-astro-cid-nynju7iy> <h3 class="text-2xl font-bold text-white mb-4" data-astro-cid-nynju7iy>Ready to get started?</h3> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-nynju7iy> <a href="/portal/signup" class="bg-[#E5007E] text-white px-8 py-4 rounded-lg font-bold hover:bg-pink-700 transition-colors" data-astro-cid-nynju7iy>
Sign Up for Portal
</a> <a href="/contact" class="bg-slate-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-700 transition-colors" data-astro-cid-nynju7iy>
Contact Sales
</a> </div> </div> </div> </section>`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/clientportal.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/digital solutions/empower-digital-solutions/src/pages/clientportal.astro";
const $$url = "/clientportal";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Clientportal,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
