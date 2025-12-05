import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Upload, Link as LinkIcon, Trash2, ExternalLink, File, CheckCircle, Clock, Pencil, Save, X, MessageSquare, Key, Eye, EyeOff, Send, Plus } from 'lucide-react';

interface ProjectManagerProps {
    projectId: string;
}

export default function ProjectManager({ projectId }: ProjectManagerProps) {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<any>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview'); // overview, files, messages, credentials

    // Link Modal State
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkData, setLinkData] = useState({ name: '', url: '' });

    // Edit Project State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', status: '', workflow_type: '', client_id: '' });
    const [clients, setClients] = useState<any[]>([]);

    // Messaging State
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Tasks State & Brief Logic
    const [tasks, setTasks] = useState<any[]>([]);
    const [isEditingBrief, setIsEditingBrief] = useState(false);
    const [briefForm, setBriefForm] = useState({ description: '', actionPlan: '', clientReqs: '' });
    const [savingBrief, setSavingBrief] = useState(false);

    // Credentials State
    const [credentials, setCredentials] = useState<any[]>([]);
    const [showCredModal, setShowCredModal] = useState(false);
    const [credForm, setCredForm] = useState({ service_name: '', username: '', password_value: '', notes: '' });
    const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        fetchData();
        fetchClients();
    }, [projectId]);

    useEffect(() => {
        if (activeTab === 'messages') {
            fetchMessages();
            // Subscribe to new messages
            const channel = supabase
                .channel('public:messages')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `project_id=eq.${projectId}` }, (payload) => {
                    setMessages(current => [...current, payload.new]);
                    scrollToBottom();
                })
                .subscribe();
            return () => { supabase.removeChannel(channel); };
        }
        if (activeTab === 'credentials') {
            fetchCredentials();
        }
    }, [activeTab, projectId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchClients = async () => {
        const { data } = await supabase.from('profiles').select('id, full_name, email');
        if (data) setClients(data);
    };

    const fetchData = async () => {
        // 1. Fetch Project Details
        const { data: proj } = await supabase
            .from('projects')
            .select('*, profiles(full_name, company_name, email)')
            .eq('id', projectId)
            .single();
        setProject(proj);
        if (proj) {
            setEditForm({
                name: proj.name,
                status: proj.status,
                workflow_type: proj.workflow_type || 'Social Media',
                client_id: proj.client_id || ''
            });
        }

        // 2. Fetch Documents
        const { data: docs } = await supabase
            .from('documents')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: false });
        setDocuments(docs || []);

        // 3. Fetch Tasks for Brief
        const { data: taskData } = await supabase
            .from('tasks')
            .select('*')
            .eq('project_id', projectId)
            .order('order_index', { ascending: true })
            .order('created_at', { ascending: true });
        setTasks(taskData || []);

        setLoading(false);
    };

    const fetchMessages = async () => {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: true });
        setMessages(data || []);
        setTimeout(scrollToBottom, 100);
    };

    const fetchCredentials = async () => {
        const { data } = await supabase
            .from('credentials')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: false });
        setCredentials(data || []);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const { error } = await supabase.from('messages').insert({
            project_id: projectId,
            sender_id: (await supabase.auth.getUser()).data.user?.id,
            content: newMessage,
            is_read: false
        });

        if (error) {
            alert("Error sending message: " + error.message);
        } else {
            setNewMessage('');
        }
    };

    const handleAddCredential = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('credentials').insert({
            project_id: projectId,
            ...credForm
        });

        if (error) {
            alert("Error adding credential: " + error.message);
        } else {
            setShowCredModal(false);
            setCredForm({ service_name: '', username: '', password_value: '', notes: '' });
            fetchCredentials();
        }
    };

    const togglePasswordVisibility = (id: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${projectId}/${fileName}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('portal-files')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get URL
            const { data: { publicUrl } } = supabase.storage
                .from('portal-files')
                .getPublicUrl(filePath);

            // Insert DB
            const { error: dbError } = await supabase.from('documents').insert({
                project_id: projectId,
                name: file.name,
                url: publicUrl,
                type: 'file',
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                uploaded_by: (await supabase.auth.getUser()).data.user?.id,
                status: 'shared'
            });

            if (dbError) throw dbError;

            fetchData();
        } catch (error: any) {
            alert('Error uploading file: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleAddLink = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('documents').insert({
                project_id: projectId,
                name: linkData.name,
                url: linkData.url,
                type: 'link',
                status: 'shared',
                uploaded_by: (await supabase.auth.getUser()).data.user?.id
            });

            if (error) throw error;

            setShowLinkModal(false);
            setLinkData({ name: '', url: '' });
            fetchData();
        } catch (error: any) {
            alert('Error adding link: ' + error.message);
        }
    };

    const handleDeleteDocument = async (id: string) => {
        if (!confirm('Are you sure you delete this document?')) return;
        try {
            await supabase.from('documents').delete().eq('id', id);
            fetchData();
        } catch (error: any) {
            alert('Error deleting item: ' + error.message);
        }
    };

    const handleDeleteCredential = async (id: string) => {
        if (!confirm('Are you sure you delete this credential?')) return;
        try {
            await supabase.from('credentials').delete().eq('id', id);
            fetchCredentials();
        } catch (error: any) {
            alert('Error deleting credential: ' + error.message);
        }
    };


    const handleUpdateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('projects')
                .update({
                    name: editForm.name,
                    status: editForm.status,
                    workflow_type: editForm.workflow_type,
                    client_id: editForm.client_id || null
                })
                .eq('id', projectId);

            if (error) throw error;

            setShowEditModal(false);
            fetchData();
        } catch (error: any) {
            alert('Error updating project: ' + error.message);
        }
    };

    const handleDeleteProject = async () => {
        if (!confirm('Are you sure you want to delete this ENTIRE project? This cannot be undone.')) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', projectId);
            if (error) throw error;

            // Redirect to dashboard
            window.location.href = '/admin/dashboard';
        } catch (error: any) {
            alert('Error deleting project: ' + error.message);
        }
    };

    // --- BRIEF / TASK LOGIC ---

    const handleEditBrief = () => {
        // Populate form from current tasks
        const adminTasks = tasks.filter(t => t.type === 'admin_task').map(t => t.title).join('\n');
        const clientTasks = tasks.filter(t => t.type === 'client_task').map(t => t.title).join('\n');

        setBriefForm({
            description: project.description || '', // Assuming description column exists or we just use it for UI
            actionPlan: adminTasks,
            clientReqs: clientTasks
        });
        setIsEditingBrief(true);
    };

    const handleSaveBrief = async () => {
        setSavingBrief(true);
        try {
            // Update Project Description (if we had a column, skipping for now as explicit col not requested, using name)
            // But user screenshot shows "Project Description" field. 
            // We'll skip validating description persistence for now unless we add column.

            // Sync Tasks
            // 1. Delete all existing tasks (or smart sync blocks implementation size). 
            //    "Smart sync" matching strings is complex. 
            //    Delete all + Insert new is safest for "Text area source of truth" but wipes completion status.
            //    BETTER: Match by title.

            const processLines = async (text: string, type: 'admin_task' | 'client_task') => {
                const lines = text.split('\n').map(l => l.trim()).filter(l => l);

                // Get existing of this type
                const existing = tasks.filter(t => t.type === type);

                // Find removed
                const toDelete = existing.filter(t => !lines.includes(t.title));
                if (toDelete.length > 0) {
                    await supabase.from('tasks').delete().in('id', toDelete.map(t => t.id));
                }

                // Upsert (Add new, keep existing status)
                let order = 0;
                for (const line of lines) {
                    const match = existing.find(t => t.title === line);
                    if (match) {
                        // Update order only
                        if (match.order_index !== order) {
                            await supabase.from('tasks').update({ order_index: order }).eq('id', match.id);
                        }
                    } else {
                        // Insert new
                        await supabase.from('tasks').insert({
                            project_id: projectId,
                            title: line,
                            type: type,
                            is_completed: false,
                            order_index: order
                        });
                    }
                    order++;
                }
            };

            await processLines(briefForm.actionPlan, 'admin_task');
            await processLines(briefForm.clientReqs, 'client_task');

            // Log
            await supabase.from('activity_logs').insert({
                project_id: projectId,
                message: 'Admin updated project brief and scope.'
            });

            setIsEditingBrief(false);
            fetchData(); // Refresh

        } catch (error: any) {
            alert('Error saving brief: ' + error.message);
        } finally {
            setSavingBrief(false);
        }
    };

    if (loading) return <div className="text-white">Loading Project Details...</div>;
    if (!project) return <div className="text-white">Project not found.</div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        {project.name}
                        <button onClick={() => setShowEditModal(true)} className="p-1 text-slate-400 hover:text-white transition-colors">
                            <Pencil className="w-5 h-5" />
                        </button>
                    </h1>
                    <div className="flex items-center gap-4 text-slate-400">
                        <span>{project.profiles?.full_name || 'Unassigned'}</span>
                        <span>•</span>
                        <span>{project.profiles?.company_name || '-'}</span>
                        <span>•</span>
                        <span className={`px-2 py-0.5 rounded text-xs border uppercase font-bold ${project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                            project.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                            {project.status}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleDeleteProject}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-bold"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete Project
                </button>
            </div>

            {/* Tabs */}
            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-800 bg-slate-900/50 p-2 rounded-t-xl overflow-x-auto">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 px-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('files')}
                    className={`pb-2 px-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'files' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    Files & Links
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`pb-2 px-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'messages' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    Messages
                </button>
                <button
                    onClick={() => setActiveTab('credentials')}
                    className={`pb-2 px-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'credentials' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    The Vault
                </button>
            </div>

            {/* CONTENT AREA */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden min-h-[400px]">

                {activeTab === 'overview' && (
                    <div className="p-6">
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">Project Brief</h2>
                                    <p className="text-slate-400 text-sm">Define scope and requirements</p>
                                </div>
                                {!isEditingBrief ? (
                                    <button
                                        onClick={handleEditBrief}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-purple-400 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider border border-slate-700"
                                    >
                                        <Pencil className="w-4 h-4" /> Edit Scope
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditingBrief(false)}
                                            className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveBrief}
                                            disabled={savingBrief}
                                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-bold"
                                        >
                                            <Save className="w-4 h-4" /> {savingBrief ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {!isEditingBrief ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Action Plan View */}
                                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                                        <div className="flex items-center gap-2 mb-4 text-amber-500 font-bold uppercase text-xs tracking-wider">
                                            <div className="w-2 h-4 bg-amber-500 rounded-full"></div>
                                            My Action Plan
                                        </div>
                                        <ul className="space-y-3">
                                            {tasks.filter(t => t.type === 'admin_task').map(task => (
                                                <li key={task.id} className="flex items-start gap-3 text-slate-300 text-sm">
                                                    {task.is_completed ? (
                                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    ) : (
                                                        <Clock className="w-5 h-5 text-slate-600 shrink-0" />
                                                    )}
                                                    <span className={task.is_completed ? 'line-through text-slate-500' : ''}>{task.title}</span>
                                                </li>
                                            ))}
                                            {tasks.filter(t => t.type === 'admin_task').length === 0 && <li className="text-slate-600 italic">No tasks defined.</li>}
                                        </ul>
                                    </div>

                                    {/* Client Req View */}
                                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                                        <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold uppercase text-xs tracking-wider">
                                            <div className="w-2 h-4 bg-blue-500 rounded-full"></div>
                                            Client Requirements
                                        </div>
                                        <ul className="space-y-3">
                                            {tasks.filter(t => t.type === 'client_task').map(task => (
                                                <li key={task.id} className="flex items-start gap-3 text-slate-300 text-sm">
                                                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${task.is_completed ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                                                    <span className={task.is_completed ? 'line-through text-slate-500' : ''}>{task.title}</span>
                                                </li>
                                            ))}
                                            {tasks.filter(t => t.type === 'client_task').length === 0 && <li className="text-slate-600 italic">No requirements defined.</li>}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Edit Mode */}
                                    <div>
                                        <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">My Action Plan (One per line)</label>
                                        <textarea
                                            className="w-full h-[300px] bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-amber-500 font-mono text-sm leading-relaxed"
                                            value={briefForm.actionPlan}
                                            onChange={e => setBriefForm({ ...briefForm, actionPlan: e.target.value })}
                                            placeholder="- Create Homepage Design&#10;- Setup Database&#10;- API Integration"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Client Requirements (One per line)</label>
                                        <textarea
                                            className="w-full h-[300px] bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-blue-500 font-mono text-sm leading-relaxed"
                                            value={briefForm.clientReqs}
                                            onChange={e => setBriefForm({ ...briefForm, clientReqs: e.target.value })}
                                            placeholder="- Brand Guidelines PDF&#10;- Logo (SVG)&#10;- Content for About Us"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Progress Bar */}
                            {!isEditingBrief && (
                                <div className="mt-8 bg-slate-900/50 rounded-xl p-6 border border-slate-800/50">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Progress</span>
                                        <span className="text-2xl font-bold text-white">{Math.round((tasks.filter(t => t.is_completed).length / (tasks.length || 1)) * 100)}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600"
                                            style={{ width: `${(tasks.filter(t => t.is_completed).length / (tasks.length || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'files' && (
                    <>
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-purple-400" />
                                File & Link Centre
                            </h2>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowLinkModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                    Add Link
                                </button>
                                <label className={`flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <Upload className="w-4 h-4" />
                                    {uploading ? 'Uploading...' : 'Upload File'}
                                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                </label>
                            </div>
                        </div>
                        <div className="p-6">
                            {documents.length === 0 ? (
                                <p className="text-slate-500 text-center py-8">No files or links shared yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {documents.map(doc => (
                                        <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg ${doc.type === 'link' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                                    {doc.type === 'link' ? <LinkIcon className="w-5 h-5" /> : <File className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-white font-medium">{doc.name}</p>
                                                        {doc.status === 'signed' && (
                                                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold rounded border border-emerald-500/20 flex items-center gap-1">
                                                                <CheckCircle className="w-3 h-3" /> Signed
                                                            </span>
                                                        )}
                                                        {doc.status === 'pending_signature' && (
                                                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] uppercase font-bold rounded border border-amber-500/20 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" /> Awaiting Sign
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-3 text-xs text-slate-500 mt-1">
                                                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                                                        {doc.size && <span>• {doc.size}</span>}
                                                        {doc.signed_at && <span>• Signed: {new Date(doc.signed_at).toLocaleDateString()}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                                    title="Open"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleDeleteDocument(doc.id)}
                                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'messages' && (
                    <div className="flex flex-col h-[600px]">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.length === 0 ? (
                                <div className="text-center text-slate-500 py-10">No messages yet. Start the conversation!</div>
                            ) : (
                                messages.map(msg => {
                                    const isMe = msg.sender_id === project.client_id; // In Admin view, "Me" is effectively the Client? No, Admin is current user.
                                    // Actually, we need to know who is who. 
                                    // Admin isn't 'client_id'.
                                    // Let's assume Admin sender_id != project.client_id usually.
                                    // BUT, we defined sender_id.
                                    // Let's assume for now: if sender_id === project.client_id it's THEM (left), else it's US (right).
                                    const isClient = msg.sender_id === project.client_id;

                                    return (
                                        <div key={msg.id} className={`flex ${!isClient ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] p-3 rounded-lg ${!isClient ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                                                <p>{msg.content}</p>
                                                <span className="text-[10px] opacity-70 block text-right mt-1">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 bg-slate-950 border-t border-slate-800">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-slate-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                />
                                <button type="submit" className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'credentials' && (
                    <>
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Key className="w-5 h-5 text-emerald-400" />
                                The Vault
                            </h2>
                            <button
                                onClick={() => setShowCredModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-bold"
                            >
                                <Plus className="w-4 h-4" />
                                Add Credential
                            </button>
                        </div>
                        <div className="p-6">
                            {credentials.length === 0 ? (
                                <p className="text-slate-500 text-center py-8">No credentials stored yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {credentials.map(cred => (
                                        <div key={cred.id} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-white">{cred.service_name}</h3>
                                                <button onClick={() => handleDeleteCredential(cred.id)} className="text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-slate-500">Username:</span>
                                                    <span className="text-slate-300 font-mono select-all text-right">{cred.username}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-500">Password:</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-300 font-mono">{visiblePasswords[cred.id] ? cred.password_value : '••••••••'}</span>
                                                        <button onClick={() => togglePasswordVisibility(cred.id)} className="text-slate-500 hover:text-white">
                                                            {visiblePasswords[cred.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                {cred.notes && (
                                                    <div className="pt-2 border-t border-slate-800 mt-2">
                                                        <p className="text-xs text-slate-500 italic">{cred.notes}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>

            {/* Link Modal */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Add External Link</h3>
                        <form onSubmit={handleAddLink} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Link Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="e.g. Google Drive Folder"
                                    value={linkData.name}
                                    onChange={e => setLinkData({ ...linkData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">URL</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="https://..."
                                    value={linkData.url}
                                    onChange={e => setLinkData({ ...linkData, url: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowLinkModal(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
                                >
                                    Add Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Credential Modal */}
            {showCredModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Add to The Vault</h3>
                        <form onSubmit={handleAddCredential} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Service Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. WordPress Admin, Gmail"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                    value={credForm.service_name}
                                    onChange={e => setCredForm({ ...credForm, service_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Username / Email</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                    value={credForm.username}
                                    onChange={e => setCredForm({ ...credForm, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                                <input
                                    type="text" // Shown as text so they can check it
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                                    value={credForm.password_value}
                                    onChange={e => setCredForm({ ...credForm, password_value: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Notes (Optional)</label>
                                <textarea
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 h-24 resize-none"
                                    value={credForm.notes}
                                    onChange={e => setCredForm({ ...credForm, notes: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCredModal(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold"
                                >
                                    Save to Vault
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 w-full max-w-lg shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white">Edit Project Details</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleUpdateProject} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Assigned Client</label>
                                <select
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                    value={editForm.client_id}
                                    onChange={e => setEditForm({ ...editForm, client_id: e.target.value })}
                                >
                                    <option value="">Unassigned</option>
                                    {clients.map(c => (
                                        <option key={c.id} value={c.id}>{c.full_name} ({c.email})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Workflow Type</label>
                                    <select
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                        value={editForm.workflow_type}
                                        onChange={e => setEditForm({ ...editForm, workflow_type: e.target.value })}
                                    >
                                        <option>Social Media</option>
                                        <option>Web Design</option>
                                        <option>Consulting</option>
                                        <option>Automation</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                                    <select
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                        value={editForm.status}
                                        onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                                    >
                                        <option>Pending</option>
                                        <option>Active</option>
                                        <option>Completed</option>
                                        <option>Paused</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
