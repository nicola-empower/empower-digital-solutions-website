import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Upload, CheckCircle, Circle, Download, Folder } from 'lucide-react';

export default function ClientDashboard({ demoMode = false }) {
    const [loading, setLoading] = useState(!demoMode);
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'documents'
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (demoMode) {
            // Mock Data for Demo
            setProject({
                id: 'demo-123',
                name: 'Demo Brand Redesign',
                status: 'Active',
                progress: 65
            });
            setTasks([
                { id: 1, title: 'Initial Consultation', is_completed: true, type: 'admin_task' },
                { id: 2, title: 'Brand Strategy Deck', is_completed: true, type: 'admin_task' },
                { id: 3, title: 'Logo Concepts', is_completed: false, type: 'admin_task' },
                { id: 4, title: 'Fill out Onboarding Form', is_completed: true, type: 'client_task' },
                { id: 5, title: 'Upload Brand Assets', is_completed: false, type: 'client_task' },
                { id: 6, title: 'Approve Moodboard', is_completed: false, type: 'client_task' },
            ]);
            setDocuments([
                { id: 1, name: 'Contract_Signed.pdf', size: '1.2 MB', created_at: new Date().toISOString(), url: '#' },
                { id: 2, name: 'Brand_Guidelines_v1.pdf', size: '4.5 MB', created_at: new Date().toISOString(), url: '#' },
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

        // 1. Get Project for this client
        const { data: projects } = await supabase
            .from('projects')
            .select('*')
            .eq('client_id', session.user.id)
            .limit(1);

        if (projects && projects.length > 0) {
            const currentProject = projects[0];
            setProject(currentProject);

            // 2. Get Tasks
            const { data: projectTasks } = await supabase
                .from('tasks')
                .select('*')
                .eq('project_id', currentProject.id)
                .order('created_at', { ascending: true });
            setTasks(projectTasks || []);

            // 3. Get Documents
            const { data: projectDocs } = await supabase
                .from('documents')
                .select('*')
                .eq('project_id', currentProject.id)
                .order('created_at', { ascending: false });
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
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${project.id}/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('portal-files')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('portal-files')
                .getPublicUrl(filePath);

            // 3. Save to DB
            const { error: dbError } = await supabase.from('documents').insert({
                project_id: project.id,
                name: file.name,
                url: publicUrl,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                uploaded_by: (await supabase.auth.getUser()).data.user.id
            });

            if (dbError) throw dbError;

            // 4. Log Activity
            await supabase.from('activity_logs').insert({
                project_id: project.id,
                message: `Client uploaded file: ${file.name}`
            });

            alert("File uploaded successfully!");
            fetchProjectData(); // Refresh list
        } catch (error) {
            alert("Error uploading file: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const toggleTask = async (taskId, currentStatus) => {
        if (demoMode) {
            // Local only update for demo
            setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));
            return;
        }
        // Optimistic update
        setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));

        const { error } = await supabase
            .from('tasks')
            .update({ is_completed: !currentStatus })
            .eq('id', taskId);

        if (error) {
            alert("Error updating task");
            fetchProjectData(); // Revert on error
        } else {
            // Log if completed
            if (!currentStatus) {
                await supabase.from('activity_logs').insert({
                    project_id: project.id,
                    message: `Client completed task.` // Could be more specific
                });
            }
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Project...</div>;

    if (!project) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white flex-col gap-4">
            <h1 className="text-2xl font-bold">No Active Project Found</h1>
            <p className="text-slate-400">Please contact Nicola to initialize your project.</p>
            <button onClick={handleLogout} className="text-purple-400 hover:text-purple-300">Logout</button>
        </div>
    );

    const myActionPlan = tasks.filter(t => t.type === 'admin_task');
    const clientRequirements = tasks.filter(t => t.type === 'client_task');

    return (
        <div className="min-h-screen bg-slate-950 pt-12 px-6 pb-12">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                        <p className="text-slate-400 mt-2">Status: <span className="text-empower-pink font-bold">{project.status}</span></p>
                    </div>
                    <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors">Logout</button>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-slate-800 mb-8">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'overview' ? 'text-empower-pink border-b-2 border-empower-pink' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('documents')}
                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'documents' ? 'text-empower-pink border-b-2 border-empower-pink' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        File Centre
                    </button>
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* My Action Plan (Read Only for Client) */}
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-white">My Action Plan</h2>
                            </div>
                            <div className="space-y-4">
                                {myActionPlan.map(task => (
                                    <div key={task.id} className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
                                        {task.is_completed ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 text-slate-600 shrink-0" />}
                                        <span className={`text-sm ${task.is_completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{task.title}</span>
                                    </div>
                                ))}
                                {myActionPlan.length === 0 && <p className="text-slate-500 italic">No actions listed yet.</p>}
                            </div>
                        </div>

                        {/* Client Requirements (Interactive) */}
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Your Tasks</h2>
                            </div>
                            <div className="space-y-4">
                                {clientRequirements.map(task => (
                                    <div
                                        key={task.id}
                                        onClick={() => toggleTask(task.id, task.is_completed)}
                                        className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50 cursor-pointer hover:border-purple-500/50 transition-colors"
                                    >
                                        {task.is_completed ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 text-purple-500 shrink-0" />}
                                        <span className={`text-sm ${task.is_completed ? 'text-slate-500 line-through' : 'text-white'}`}>{task.title}</span>
                                    </div>
                                ))}
                                {clientRequirements.length === 0 && <p className="text-slate-500 italic">No tasks assigned to you.</p>}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Client Uploads */}
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <h2 className="text-xl font-bold text-white mb-6">Upload Files</h2>
                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-purple-500 transition-colors relative">
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-slate-800 rounded-full">
                                        <Upload className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-1">{uploading ? "Uploading..." : "Click or Drag to Upload"}</p>
                                        <p className="text-slate-500 text-sm">Support for images, PDF, and docs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* File List */}
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <h2 className="text-xl font-bold text-white mb-6">Shared Files</h2>
                            <div className="space-y-3">
                                {documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                                <Folder className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium text-sm">{doc.name}</p>
                                                <p className="text-xs text-slate-500">{doc.size} • {new Date(doc.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                                            <Download className="w-4 h-4" />
                                        </a>
                                    </div>
                                ))}
                                {documents.length === 0 && <p className="text-slate-500 italic">No documents shared yet.</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
