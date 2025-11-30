import{s as a}from"./supabase.D2FDowrI.js";const{data:{session:d}}=await a.auth.getSession();d||(window.location.href="/admin");const r=document.getElementById("logout-btn");r&&r.addEventListener("click",async()=>{await a.auth.signOut(),window.location.href="/admin"});async function o(){const{data:s,error:n}=await a.from("leads").select("*").order("created_at",{ascending:!1}),e=document.getElementById("leads-table-body");if(e){if(n){e.innerHTML=`<tr><td colspan="6" class="px-6 py-4 text-center text-red-400">Error loading leads: ${n.message}</td></tr>`;return}if(!s||s.length===0){e.innerHTML='<tr><td colspan="6" class="px-6 py-4 text-center text-slate-500">No leads found.</td></tr>';return}e.innerHTML=s.map(t=>`
      <tr class="hover:bg-slate-800/50 transition-colors">
        <td class="px-6 py-4 text-sm">${new Date(t.created_at).toLocaleDateString()}</td>
        <td class="px-6 py-4 font-medium text-white">${t.name}</td>
        <td class="px-6 py-4 text-sm">${t.email}</td>
        <td class="px-6 py-4 text-sm"><span class="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs">${t.service||"General"}</span></td>
        <td class="px-6 py-4 text-sm max-w-xs truncate" title="${t.message}">${t.message}</td>
        <td class="px-6 py-4">
           <span class="bg-green-900/30 text-green-300 px-2 py-1 rounded text-xs uppercase font-bold">New</span>
        </td>
      </tr>
    `).join("")}}o();
