import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import DocumentGenerator from './admin/DocumentGenerator';
import { FileText, Upload, Link as LinkIcon, Trash2, ExternalLink, File, CheckCircle, Clock, Pencil, User, Building } from 'lucide-react';

export default function AdminDashboard() {
    interface Client {
        id: string;
        full_name: string;
        email: string;
        company_name?: string;
        phone?: string;
        address?: string;
    }

    interface Project {
        id: string;
        created_at: string;
        client_id: string | null;
        name: string;
        workflow_type: string;
        status: string;
        progress: number;
        profiles?: {
            full_name: string;
            company_name: string;
        };
    }

    interface ActivityLog {
        id: string;
        created_at: string;
        message: string;
        projects?: {
            name: string;
        };
    }

    interface GeneratedDocument {
        id: string;
        client_name: string;
        document_type: string;
        total_amount: number;
        created_at: string;
        client_id?: string;
    }

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ clients: 0, activeProjects: 0, pendingActions: 0 });
    const [projects, setProjects] = useState<Project[]>([]);
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [recentDocs, setRecentDocs] = useState<GeneratedDocument[]>([]);
    const [assigningDocId, setAssigningDocId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const [formData, setFormData] = useState({
        clientId: '',
        name: '',
        workflow_type: 'Social Media',
        status: 'Pending'
    });
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedProjectToAssign, setSelectedProjectToAssign] = useState<string | null>(null);
    const [assignClientId, setAssignClientId] = useState('');

    // Client Edit State
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [showClientModal, setShowClientModal] = useState(false);
    const [clientForm, setClientForm] = useState({ full_name: '', company_name: '', email: '', phone: '', address: '' });


    useEffect(() => {
        checkAuthAndFetchData();
    }, []);

    const checkAuthAndFetchData = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            window.location.href = "/admin";
            return;
        }

        // Fetch Stats
        const { count: clientCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: activeCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'Active');
        const { count: pendingCount } = await supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('is_completed', false).eq('type', 'client_task');

        setStats({
            clients: clientCount || 0,
            activeProjects: activeCount || 0,
            pendingActions: pendingCount || 0
        });

        // Fetch Projects
        const { data: projectsData } = await supabase
            .from('projects')
            .select('*, profiles(full_name, company_name)')
            .order('created_at', { ascending: false });
        setProjects(projectsData || []);

        // Fetch Activity
        const { data: activityData } = await supabase
            .from('activity_logs')
            .select('*, projects(name)')
            .order('created_at', { ascending: false })
            .limit(5);
        setActivities(activityData || []);

        // Fetch Recent Documents
        const { data: docsData } = await supabase
            .from('generated_documents')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
        setRecentDocs(docsData || []);

        // Fetch Clients for Assignment
        const { data: profiles } = await supabase.from('profiles').select('*');
        setClients(profiles || []);
        setLoading(false);
    };

    // Real-time Subscriptions
    useEffect(() => {
        const channel = supabase
            .channel('admin-dashboard-live')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_logs' }, async (payload) => {
                const newLog = payload.new as ActivityLog;
                setActivities(prev => [newLog, ...prev]);
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'profiles' }, (payload) => {
                const newClient = payload.new as Client;
                setStats(prev => ({ ...prev, clients: prev.clients + 1 }));
                setActivities(prev => [{
                    id: `new-client-${Date.now()}`,
                    created_at: new Date().toISOString(),
                    message: `🎉 New Client Signup: ${newClient.full_name || newClient.email || 'Unknown User'}`,
                    projects: { name: 'System Event' }
                }, ...prev]);
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                const newMsg = payload.new;
                setActivities(prev => [{
                    id: `new-msg-${Date.now()}`,
                    created_at: new Date().toISOString(),
                    message: `📩 New Message received via Client Portal.`,
                    projects: { name: 'Inbox' }
                }, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleAssignDocument = async (docId: string, clientId: string) => {
        if (!clientId) return;

        const { error } = await supabase
            .from('generated_documents')
            .update({ client_id: clientId })
            .eq('id', docId);

        if (error) {
            alert('Error assigning document: ' + error.message);
        } else {
            // 2. Find Client's Active Project to share the file to
            const { data: projects } = await supabase
                .from('projects')
                .select('id')
                .eq('client_id', clientId)
                .order('created_at', { ascending: false })
                .limit(1);

            if (projects && projects.length > 0) {
                const projectId = projects[0].id;

                // Fetch the document details to copy
                const { data: docData } = await supabase
                    .from('generated_documents')
                    .select('*')
                    .eq('id', docId)
                    .single();

                if (docData && docData.file_url) {
                    // Determine if signature is required based on type
                    const needsSignature = ['Quote', 'Proposal', 'Contract'].includes(docData.document_type);

                    // Get public URL
                    const { data: { publicUrl } } = supabase.storage.from('portal-files').getPublicUrl(docData.file_url);

                    // Insert into documents table for Client Portal
                    await supabase.from('documents').insert({
                        project_id: projectId,
                        name: `${docData.document_type} - ${docData.client_name}.pdf`,
                        url: publicUrl,
                        type: 'file',
                        is_signature_required: needsSignature,
                        status: needsSignature ? 'pending_signature' : 'shared',
                        uploaded_by: (await supabase.auth.getUser()).data.user?.id
                    });
                }
            }

            // Refresh docs
            const { data: docsData } = await supabase
                .from('generated_documents')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);
            setRecentDocs(docsData || []);
            setAssigningDocId(null);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/admin";
    };

    const openNewClientModal = async () => {
        const { data: profiles } = await supabase.from('profiles').select('*');
        setClients(profiles || []);
        setShowModal(true);
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('projects').insert({
            client_id: formData.clientId || null,
            name: formData.name,
            workflow_type: formData.workflow_type,
            status: formData.status,
            progress: 0
        });

        if (error) {
            alert("Error: " + error.message);
        } else {
            await supabase.from('activity_logs').insert({
                message: "Admin initialised new protocol."
            });
            setShowModal(false);
            checkAuthAndFetchData(); // Refresh data
        }
    };

    const openAssignModal = (projectId: string) => {
        setSelectedProjectToAssign(projectId);
        setAssignClientId('');
        setShowAssignModal(true);
    };

    const handleAssignProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProjectToAssign || !assignClientId) return;

        const { error } = await supabase
            .from('projects')
            .update({ client_id: assignClientId })
            .eq('id', selectedProjectToAssign);

        if (error) {
            alert("Error assigning project: " + error.message);
        } else {
            await supabase.from('activity_logs').insert({
                message: "Admin assigned project to client."
            });
            setShowAssignModal(false);
            setSelectedProjectToAssign(null);
            checkAuthAndFetchData();
        }
    };

    const handleDeleteProject = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete project: ${name}? This action cannot be undone.`)) return;

        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) {
            alert("Error deleting project: " + error.message);
        } else {
            setProjects(projects.filter(p => p.id !== id));
            checkAuthAndFetchData();
        }
    };

    const handleDeleteClient = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete client: ${name}? This will also delete their assigned projects.`)) return;

        const { error } = await supabase.from('profiles').delete().eq('id', id);
        if (error) {
            alert("Error deleting client: " + error.message);
        } else {
            setClients(clients.filter(c => c.id !== id));
            checkAuthAndFetchData();
        }
    };

    const openEditClient = (client: Client) => {
        setEditingClient(client);
        setClientForm({
            full_name: client.full_name || '',
            company_name: client.company_name || '',
            email: client.email || '',
            phone: client.phone || '',
            address: client.address || ''
        });
        setShowClientModal(true);
    };

    const handleUpdateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingClient) return;

        console.log('Updating client:', editingClient.id, clientForm);

        const { data, error } = await supabase
            .from('profiles')
            .update({
                full_name: clientForm.full_name,
                company_name: clientForm.company_name,
                email: clientForm.email,
                phone: clientForm.phone,
                address: clientForm.address
            })
            .eq('id', editingClient.id)
            .select()
            .single();

        if (error) {
            console.error('Update error:', error);
            alert("Error updating client: " + error.message);
        } else {
            console.log('Update success:', data);

            // Optimistic update of local state to prevent "revert" visual bug
            setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...data } : c));

            setShowClientModal(false);
            setEditingClient(null);

            // Still re-fetch to be safe
            checkAuthAndFetchData();
        }
    };


    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-slate-950 flex">
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-slate-400">Welcome back, Administrator.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab('clients')}
                                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'clients' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                Clients
                            </button>
                            <button
                                onClick={() => setActiveTab('documents')}
                                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'documents' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                Documents
                            </button>
                        </div>
                        <button onClick={handleLogout} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">Logout</button>
                        <button onClick={openNewClientModal} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold">+ New Project</button>
                    </div>
                </div>

                {activeTab === 'dashboard' ? (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Clients</h3>
                                <p className="text-4xl font-bold text-white">{stats.clients}</p>
                            </div>
                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Active Projects</h3>
                                <p className="text-4xl font-bold text-white">{stats.activeProjects}</p>
                            </div>
                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Pending Actions</h3>
                                <p className="text-4xl font-bold text-white">{stats.pendingActions}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Recent Documents */}
                            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-white">Recent Documents</h2>
                                    <button onClick={() => setActiveTab('documents')} className="text-sm text-purple-400 hover:text-purple-300">Create New &rarr;</button>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recentDocs.length === 0 ? (
                                        <p className="text-slate-500 text-center py-4">No documents generated yet.</p>
                                    ) : (
                                        recentDocs.map(doc => (
                                            <div key={doc.id} className="flex justify-between items-center bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                                <div>
                                                    <div className="font-bold text-white">{doc.client_name}</div>
                                                    <div className="text-xs text-slate-400 flex gap-2">
                                                        <span className="capitalize">{doc.document_type}</span>
                                                        <span>•</span>
                                                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="font-bold text-emerald-500">
                                                        £{doc.total_amount?.toLocaleString()}
                                                    </div>
                                                    {doc.client_id ? (
                                                        <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">Assigned</span>
                                                    ) : (
                                                        assigningDocId === doc.id ? (
                                                            <select
                                                                autoFocus
                                                                className="bg-slate-800 text-white text-xs rounded px-2 py-1 border border-slate-700 focus:outline-none focus:border-purple-500"
                                                                onChange={(e) => handleAssignDocument(doc.id, e.target.value)}
                                                                onBlur={() => setAssigningDocId(null)}
                                                                defaultValue=""
                                                            >
                                                                <option value="" disabled>Select Client...</option>
                                                                {clients.map(c => (
                                                                    <option key={c.id} value={c.id}>{c.full_name}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <button
                                                                onClick={() => setAssigningDocId(doc.id)}
                                                                className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors"
                                                            >
                                                                Assign
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                                <div className="p-6 border-b border-slate-800">
                                    <h2 className="text-xl font-bold text-white">System Activity</h2>
                                </div>
                                <div className="p-4 space-y-3">
                                    {activities.map((log) => (
                                        <div key={log.id} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">System Alert</span>
                                                <span className="text-xs text-slate-500">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed">{log.message}</p>
                                        </div>
                                    ))}
                                    {activities.length === 0 && (
                                        <p className="text-slate-500 text-sm text-center py-4">No recent activity.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Portfolios Table */}
                        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                            <div className="p-6 border-b border-slate-800">
                                <h2 className="text-xl font-bold text-white">All Portfolios</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                                            <th className="p-6 font-medium">Client</th>
                                            <th className="p-6 font-medium">Workflow</th>
                                            <th className="p-6 font-medium">Progress</th>
                                            <th className="p-6 font-medium">Status</th>
                                            <th className="p-6 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {projects.map((project) => (
                                            <tr key={project.id} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="p-6">
                                                    <div className="font-bold text-white">
                                                        {project.profiles?.full_name || <span className="text-slate-500 italic">Unassigned (Draft)</span>}
                                                    </div>
                                                    <div className="text-sm text-slate-400">{project.profiles?.company_name || ''}</div>
                                                </td>
                                                <td className="p-6">
                                                    <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">
                                                        {project.workflow_type || 'General'}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 h-2 bg-slate-800 rounded-full w-24 overflow-hidden">
                                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                                        </div>
                                                        <span className="text-sm text-slate-400">{project.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                                        project.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                                            'bg-slate-800 text-slate-400'
                                                        }`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right flex justify-end gap-3 items-center">
                                                    <a href={`/admin/project/${project.id}`} className="text-purple-400 hover:text-purple-300 font-medium text-sm">Manage &rarr;</a>
                                                    {!project.client_id && (
                                                        <button
                                                            onClick={() => openAssignModal(project.id)}
                                                            className="text-emerald-400 hover:text-emerald-300 font-medium text-sm"
                                                        >
                                                            Assign
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDeleteProject(project.id, project.name)} className="text-red-400 hover:text-red-300 ml-2" title="Delete Project"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {projects.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-slate-500">No active projects found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : activeTab === 'clients' ? (
                    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Client Management</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                                        <th className="p-6 font-medium">Name</th>
                                        <th className="p-6 font-medium">Company</th>
                                        <th className="p-6 font-medium">Contact</th>
                                        <th className="p-6 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {clients.map(client => (
                                        <tr key={client.id} className="hover:bg-slate-800/50">
                                            <td className="p-6 font-bold text-white">{client.full_name || 'N/A'}</td>
                                            <td className="p-6 text-slate-300">{client.company_name || '-'}</td>
                                            <td className="p-6 text-slate-400">
                                                <div className="text-sm">{client.email}</div>
                                                <div className="text-xs">{client.phone}</div>
                                            </td>
                                            <td className="p-6 text-right flex justify-end gap-3">
                                                <button onClick={() => openEditClient(client)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-blue-400" title="Edit Client"><Pencil className="w-4 h-4" /></button>
                                                <button onClick={() => handleDeleteClient(client.id, client.full_name)} className="p-2 bg-slate-800 hover:bg-red-900/20 rounded text-red-400" title="Delete Client"><Trash2 className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <DocumentGenerator />
                )}
            </div>

            {/* Live Updates Sidebar */}
            <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 hidden xl:block">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-white">Live Updates</h2>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-4">
                    {activities.map((log) => (
                        <div key={log.id} className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">System Alert</span>
                                <span className="text-xs text-slate-500">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed">{log.message}</p>
                            {log.projects?.name && <p className="text-xs text-slate-500 mt-2">Project: {log.projects.name}</p>}
                        </div>
                    ))}
                    {activities.length === 0 && (
                        <p className="text-slate-500 text-sm text-center py-4">No recent activity.</p>
                    )}
                </div>
            </div>

            {/* New Project Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Initialise New Protocol</h2>
                        <form onSubmit={handleCreateProject} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Select Client</label>
                                <select
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    value={formData.clientId}
                                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                >
                                    <option value="">Unassigned (Draft)</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.full_name} ({client.email})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Q4 Marketing Campaign"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Workflow Type</label>
                                    <select
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                        value={formData.workflow_type}
                                        onChange={(e) => setFormData({ ...formData, workflow_type: e.target.value })}
                                    >
                                        <option>Social Media</option>
                                        <option>Web Design</option>
                                        <option>Consulting</option>
                                        <option>Automation</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Initial Status</label>
                                    <select
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option>Pending</option>
                                        <option>Active</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">Abort</button>
                                <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors">Initialise</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assign Project Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Assign Project to Client</h2>
                        <form onSubmit={handleAssignProject} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Select Client</label>
                                <select
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    value={assignClientId}
                                    onChange={(e) => setAssignClientId(e.target.value)}
                                >
                                    <option value="">Select a client...</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.full_name} ({client.email})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowAssignModal(false)} className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors">Assign</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Client Modal */}
            {showClientModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Edit Client Profile</h2>
                        <form onSubmit={handleUpdateClient} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                <input value={clientForm.full_name} onChange={e => setClientForm({ ...clientForm, full_name: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
                                <input value={clientForm.company_name} onChange={e => setClientForm({ ...clientForm, company_name: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                <input value={clientForm.email} onChange={e => setClientForm({ ...clientForm, email: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                                <input value={clientForm.phone} onChange={e => setClientForm({ ...clientForm, phone: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Address</label>
                                <input value={clientForm.address} onChange={e => setClientForm({ ...clientForm, address: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowClientModal(false)} className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
