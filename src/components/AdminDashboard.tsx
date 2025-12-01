import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import InvoiceGenerator from './admin/InvoiceGenerator';

export default function AdminDashboard() {
    interface Client {
        id: string;
        full_name: string;
        email: string;
    }

    interface Project {
        id: string;
        created_at: string;
        client_id: string;
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

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ clients: 0, activeProjects: 0, pendingActions: 0 });
    const [projects, setProjects] = useState<Project[]>([]);
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const [formData, setFormData] = useState({
        clientId: '',
        name: '',
        workflow_type: 'Social Media',
        status: 'Pending'
    });

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

        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/admin";
    };

    const openNewClientModal = async () => {
        const { data: profiles } = await supabase.from('profiles').select('id, full_name, email');
        setClients(profiles || []);
        setShowModal(true);
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('projects').insert({
            client_id: formData.clientId,
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

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-slate-950 flex">
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Client Portal</h1>
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
                                onClick={() => setActiveTab('invoices')}
                                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'invoices' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                Invoice Generator
                            </button>
                        </div>
                        <button onClick={handleLogout} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">Logout</button>
                        <button onClick={openNewClientModal} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold">+ New Client</button>
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
                                                    <div className="font-bold text-white">{project.profiles?.full_name || 'Unknown'}</div>
                                                    <div className="text-sm text-slate-400">{project.profiles?.company_name || 'No Company'}</div>
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
                                                <td className="p-6 text-right">
                                                    <a href={`/admin/project/${project.id}`} className="text-purple-400 hover:text-purple-300 font-medium text-sm">Manage &rarr;</a>
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
                ) : (
                    <InvoiceGenerator />
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

            {/* New Client Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Initialise New Protocol</h2>
                        <form onSubmit={handleCreateProject} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Select Client</label>
                                <select
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    value={formData.clientId}
                                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                >
                                    <option value="">Select a client...</option>
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
        </div>
    );
}
