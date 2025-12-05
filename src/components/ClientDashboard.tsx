import React, { useEffect, useState, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Upload, CheckCircle, Circle, Download, Folder, ExternalLink, Send, Key, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

// --- Error Boundary Component ---
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null, errorInfo: ErrorInfo | null }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
                    <div className="bg-slate-900 border border-red-900/50 p-6 rounded-2xl max-w-2xl w-full shadow-2xl">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">⚠️ Something went wrong</h1>
                        <p className="text-slate-300 mb-4">The dashboard encountered a critical error and could not render.</p>

                        <div className="bg-black/50 p-4 rounded-lg text-left overflow-auto max-h-64 mb-6 border border-slate-800">
                            <p className="font-mono text-red-400 font-bold mb-2">{this.state.error && this.state.error.toString()}</p>
                            <pre className="font-mono text-xs text-slate-500 whitespace-pre-wrap">
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Reload Dashboard
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// --- Interfaces ---
interface Task {
    id: number;
    title: string;
    is_completed: boolean;
    type: string;
}

interface Document {
    id: number | string;
    name: string;
    size?: string;
    created_at: string;
    url: string;
    type?: string;
    status?: string;
    signed_at?: string;
}

interface Project {
    id: string;
    name: string;
    status: string;
    progress: number;
    client_id?: string; // Added optional client_id
}

// --- Main Wrapper ---
export default function ClientDashboard(props: any) {
    return (
        <ErrorBoundary>
            <ClientDashboardContent {...props} />
        </ErrorBoundary>
    );
}

// --- Content Component ---
function ClientDashboardContent({ demoMode = false }) {
    const [loading, setLoading] = useState(!demoMode);
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [uploading, setUploading] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    // Messaging
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Credentials
    const [credentials, setCredentials] = useState<any[]>([]);
    const [showCredModal, setShowCredModal] = useState(false);
    const [credForm, setCredForm] = useState({ service_name: '', username: '', password_value: '', notes: '' });
    const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});

    const [error, setError] = useState<string | null>(null);

    // Profile Data State
    const [profileData, setProfileData] = useState({
        full_name: '',
        company_name: '',
        phone: ''
    });

    useEffect(() => {
        if (demoMode) {
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

    useEffect(() => {
        if (project && activeTab === 'messages' && !demoMode) {
            fetchMessages();
            const channel = supabase
                .channel('public:messages')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `project_id=eq.${project.id}` }, (payload) => {
                    setMessages(current => [...current, payload.new]);
                    scrollToBottom();
                })
                .subscribe();
            return () => { supabase.removeChannel(channel); };
        }
        if (project && activeTab === 'credentials' && !demoMode) {
            fetchCredentials();
        }
    }, [project, activeTab, demoMode]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchProjectData = async () => {
        try {
            console.log("Fetching project data...");
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            if (!session) {
                console.log("No session, redirecting.");
                window.location.href = "/portal";
                return;
            }

            // 1. Get Project
            const { data: projects, error: projectError } = await supabase
                .from('projects')
                .select('*')
                .eq('client_id', session.user.id)
                .limit(1);

            if (projectError) throw projectError;

            if (projects && projects.length > 0) {
                const currentProject = projects[0];
                console.log("Project found:", currentProject);
                setProject(currentProject);
                setCurrentUserId(session.user.id);

                // Update Last Viewed
                supabase.from('projects')
                    .update({ last_viewed_at: new Date().toISOString() })
                    .eq('id', currentProject.id)
                    .then(({ error }) => {
                        if (error) console.error("Tracking caught error:", error);
                    });

                // 2. Get Tasks
                const { data: projectTasks, error: taskError } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('project_id', currentProject.id)
                    .order('created_at', { ascending: true });

                if (taskError) throw taskError;
                setTasks(projectTasks || []);

                // 3. Get Documents
                const { data: projectDocs, error: docError } = await supabase
                    .from('documents')
                    .select('*')
                    .eq('project_id', currentProject.id)
                    .order('created_at', { ascending: false });

                if (docError) throw docError;
                setDocuments(projectDocs || []);
            } else {
                console.log("No project found for user.");
                // Ensure project is null so we show pending screen
                setProject(null);
            }
        } catch (err: any) {
            console.error("Dashboard Load Error:", err);
            setError(err.message || "Failed to load project data.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        if (!project) return;
        const { data } = await supabase
            .from('messages')
            .select('*')
            .eq('project_id', project.id)
            .order('created_at', { ascending: true });
        setMessages(data || []);
        setTimeout(scrollToBottom, 100);
    };

    const fetchCredentials = async () => {
        if (!project) return;
        const { data } = await supabase
            .from('credentials')
            .select('*')
            .eq('project_id', project.id)
            .order('created_at', { ascending: false });
        setCredentials(data || []);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !project) return;

        const tempId = Math.random();
        const tempMsg = {
            id: tempId,
            content: newMessage,
            sender_id: currentUserId,
            created_at: new Date().toISOString()
        };

        setMessages(prev => [...prev, tempMsg]);
        setNewMessage('');
        setTimeout(scrollToBottom, 50);

        const { error } = await supabase.from('messages').insert({
            project_id: project.id,
            sender_id: currentUserId,
            content: newMessage,
            is_read: false
        });

        if (error) {
            alert("Error sending message: " + error.message);
        }
    };

    const handleAddCredential = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project) return;
        const { error } = await supabase.from('credentials').insert({
            project_id: project.id,
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

    const handleDeleteCredential = async (id: string) => {
        if (!confirm('Are you sure you want to remove this credential?')) return;
        const { error } = await supabase.from('credentials').delete().eq('id', id);
        if (error) {
            alert("Error: " + error.message);
        } else {
            fetchCredentials();
        }
    };

    const togglePasswordVisibility = (id: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleLogout = async () => {
        if (demoMode) {
            alert("This is just a demo! In the real portal, this logs you out.");
            return;
        }
        await supabase.auth.signOut();
        window.location.href = "/portal";
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (demoMode) {
            alert("File upload is disabled in demo mode.");
            return;
        }
        const file = e.target.files?.[0];
        if (!file || !project) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${project.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portal-files')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portal-files')
                .getPublicUrl(filePath);

            const { error: dbError } = await supabase.from('documents').insert({
                project_id: project.id,
                name: file.name,
                url: publicUrl,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                uploaded_by: (await supabase.auth.getUser()).data.user?.id
            });

            if (dbError) throw dbError;

            await supabase.from('activity_logs').insert({
                project_id: project.id,
                message: `Client uploaded file: ${file.name}`
            });

            alert("File uploaded successfully!");
            fetchProjectData();
        } catch (error: any) {
            alert("Error uploading file: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const toggleTask = async (taskId: number, currentStatus: boolean) => {
        if (demoMode) {
            setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));
            return;
        }
        setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));
        const { error } = await supabase
            .from('tasks')
            .update({ is_completed: !currentStatus })
            .eq('id', taskId);

        if (error) {
            alert("Error updating task");
            fetchProjectData();
        } else {
            if (!currentStatus && project) {
                await supabase.from('activity_logs').insert({
                    project_id: project.id,
                    message: `Client completed task.`
                });
            }
        }
    };

    const [signModalOpen, setSignModalOpen] = useState(false);
    const [signingDoc, setSigningDoc] = useState<Document | null>(null);
    const [signatureName, setSignatureName] = useState('');

    const handleSignDocument = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signingDoc || !signatureName || !project) return;

        try {
            const { error } = await supabase
                .from('documents')
                .update({
                    status: 'signed',
                    signed_at: new Date().toISOString()
                })
                .eq('id', signingDoc.id);

            if (error) throw error;

            await supabase.from('activity_logs').insert({
                project_id: project.id,
                message: `Client digitally signed: ${signingDoc.name}`
            });

            alert('Document signed successfully!');
            setSignModalOpen(false);
            setSigningDoc(null);
            setSignatureName('');
            fetchProjectData();
        } catch (error: any) {
            alert('Error signing document: ' + error.message);
        }
    };

    const openSignModal = (doc: Document) => {
        setSigningDoc(doc);
        setSignModalOpen(true);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase.from('profiles').update({
            full_name: profileData.full_name,
            company_name: profileData.company_name,
            phone: profileData.phone
        }).eq('id', user.id);

        if (error) {
            alert("Error updating profile: " + error.message);
        } else {
            alert("Profile updated successfully!");
        }
    };

    if (error) {
        throw new Error(error); // Throw to ErrorBoundary to ensure consistent error UI
    }

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Project...</div>;

    if (!project && !demoMode) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="text-center mb-8 relative z-10">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
                            <Folder className="w-8 h-8 text-purple-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome to Empower! 🚀</h1>
                        <p className="text-slate-400 text-sm">
                            Your account is active. We are currently preparing your project workspace.
                        </p>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                            <span className="text-amber-500 font-bold text-xs uppercase tracking-wider">Status: Pending Assignment</span>
                        </div>
                        <p className="text-xs text-slate-500">
                            An administrator needs to link your project before you can access the dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-4 relative z-10">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Complete Your Profile</div>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Full Name"
                            value={profileData.full_name}
                            onChange={e => setProfileData({ ...profileData, full_name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Company Name"
                            value={profileData.company_name}
                            onChange={e => setProfileData({ ...profileData, company_name: e.target.value })}
                        />
                        <input
                            type="tel"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Phone Number"
                            value={profileData.phone}
                            onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/25"
                        >
                            Update Profile
                        </button>
                    </form>
                    <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                        <button onClick={handleLogout} className="text-slate-500 hover:text-white transition-colors text-sm font-medium">Log Out</button>
                    </div>
                </div>
            </div>
        );
    }

    const myActionPlan = tasks.filter(t => t.type === 'admin_task');
    const clientRequirements = tasks.filter(t => t.type === 'client_task');
    const projName = project?.name || "Demo Project";

    return (
        <div className="min-h-screen bg-slate-950 pt-12 px-6 pb-12">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{projName}</h1>
                        <p className="text-slate-400 mt-2">Status: <span className="text-empower-pink font-bold">{project?.status}</span></p>
                    </div>
                    <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors">Logout</button>
                </div>

                <div className="flex gap-8 border-b border-slate-800 mb-8 overflow-x-auto bg-slate-900/50 p-2 rounded-t-xl">
                    <button onClick={() => setActiveTab('overview')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'text-empower-pink border-b-2 border-empower-pink' : 'text-slate-500 hover:text-slate-300'}`}>Overview</button>
                    <button onClick={() => setActiveTab('messages')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'messages' ? 'text-empower-pink border-b-2 border-empower-pink' : 'text-slate-500 hover:text-slate-300'}`}>Messages</button>
                    <button onClick={() => setActiveTab('credentials')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'credentials' ? 'text-empower-pink border-b-2 border-empower-pink' : 'text-slate-500 hover:text-slate-300'}`}>The Vault</button>
                    <button onClick={() => setActiveTab('documents')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'documents' ? 'text-empower-pink border-b-2 border-empower-pink' : 'text-slate-500 hover:text-slate-300'}`}>File Centre</button>
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><FileText className="w-5 h-5" /></div>
                                <h2 className="text-xl font-bold text-white">Our Action Plan</h2>
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

                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><CheckCircle className="w-5 h-5" /></div>
                                <h2 className="text-xl font-bold text-white">Your Tasks</h2>
                            </div>
                            <div className="space-y-4">
                                {clientRequirements.map(task => (
                                    <div key={task.id} onClick={() => toggleTask(task.id, task.is_completed)} className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800/50 cursor-pointer hover:border-purple-500/50 transition-colors">
                                        {task.is_completed ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 text-purple-500 shrink-0" />}
                                        <span className={`text-sm ${task.is_completed ? 'text-slate-500 line-through' : 'text-white'}`}>{task.title}</span>
                                    </div>
                                ))}
                                {clientRequirements.length === 0 && <p className="text-slate-500 italic">No tasks assigned to you.</p>}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden h-[600px] flex flex-col">
                        <div className="flxe-none p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Send className="w-5 h-5 text-purple-400" />Project Messages</h2>
                            <p className="text-slate-400 text-sm">Direct line to your project manager.</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.length === 0 ? <div className="text-center text-slate-500 py-10">No messages yet. Say hello!</div> : messages.map(msg => {
                                const isMe = msg.sender_id === (project as any)?.client_id || msg.sender_id === currentUserId; // Improved check
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-4 rounded-xl ${isMe ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                                            <p>{msg.content}</p>
                                            <span className="text-[10px] opacity-70 block text-right mt-1">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 bg-slate-950 border-t border-slate-800">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input type="text" className="flex-1 bg-slate-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500" placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                                <button type="submit" className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"><Send className="w-5 h-5" /></button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'credentials' && (
                    <>
                        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-6 flex justify-between items-center">
                            <div><h2 className="text-xl font-bold text-white flex items-center gap-2"><Key className="w-5 h-5 text-emerald-400" />The Vault</h2><p className="text-slate-400 text-sm">Securely share logins.</p></div>
                            <button onClick={() => setShowCredModal(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-bold"><Plus className="w-4 h-4" />Add Credential</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {credentials.map(cred => (
                                <div key={cred.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors shadow-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3"><div className="p-2 bg-emerald-500/10 rounded text-emerald-500"><Key className="w-5 h-5" /></div><h3 className="font-bold text-white text-lg">{cred.service_name}</h3></div>
                                        <button onClick={() => handleDeleteCredential(cred.id)} className="text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <div className="space-y-3 text-sm bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                                        <div className="flex justify-between"><span className="text-slate-500">Username</span><span className="text-slate-300 font-mono select-all text-right font-bold">{cred.username}</span></div>
                                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                                            <span className="text-slate-500 text-xs uppercase font-bold">Password</span>
                                            <div className="flex items-center gap-2"><span className="text-slate-300 font-mono font-bold tracking-widest">{visiblePasswords[cred.id] ? cred.password_value : '••••••••'}</span><button onClick={() => togglePasswordVisibility(cred.id)} className="text-slate-500 hover:text-white">{visiblePasswords[cred.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}</button></div>
                                        </div>
                                        {cred.notes && <div className="pt-2 border-t border-slate-800 mt-2"><p className="text-xs text-slate-500 italic">{cred.notes}</p></div>}
                                    </div>
                                </div>
                            ))}
                            {credentials.length === 0 && <div className="col-span-2 text-center py-12 text-slate-500 bg-slate-900 rounded-xl border border-slate-800 border-dashed"><Key className="w-12 h-12 mx-auto mb-4 opacity-20" />No credentials stored yet.</div>}
                        </div>
                    </>
                )}

                {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <h2 className="text-xl font-bold text-white mb-6">Upload Files</h2>
                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-purple-500 transition-colors relative">
                                <input type="file" onChange={handleFileUpload} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="flex flex-col items-center gap-4"><div className="p-4 bg-slate-800 rounded-full"><Upload className="w-8 h-8 text-purple-400" /></div><div><p className="text-white font-medium mb-1">{uploading ? "Uploading..." : "Click or Drag to Upload"}</p><p className="text-slate-500 text-sm">Support for images, PDF, and docs</p></div></div>
                            </div>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <h2 className="text-xl font-bold text-white mb-6">Shared Files</h2>
                            <div className="space-y-3">
                                {documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${doc.type === 'link' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>{doc.type === 'link' ? <ExternalLink className="w-5 h-5" /> : <Folder className="w-5 h-5" />}</div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-white font-medium text-sm">{doc.name}</p>
                                                    {doc.status === 'pending_signature' && <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 uppercase font-bold">Sign Req.</span>}
                                                    {doc.status === 'signed' && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-bold">Signed</span>}
                                                </div>
                                                <p className="text-xs text-slate-500">{doc.type === 'link' ? 'External Link' : doc.size} • {new Date(doc.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {doc.status === 'pending_signature' && <button onClick={() => openSignModal(doc)} className="px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded hover:bg-amber-400 transition-colors">Sign</button>}
                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">{doc.type === 'link' ? <ExternalLink className="w-4 h-4" /> : <Download className="w-4 h-4" />}</a>
                                        </div>
                                    </div>
                                ))}
                                {documents.length === 0 && <p className="text-slate-500 italic">No documents shared yet.</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {signModalOpen && signingDoc && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-2">Digital Acceptance</h3>
                        <p className="text-slate-400 text-sm mb-6">By signing this document ({signingDoc.name}), you agree to the terms and conditions outlined within it.</p>
                        <form onSubmit={handleSignDocument} className="space-y-4">
                            <div><label className="block text-sm font-medium text-slate-400 mb-1">Type Full Name to Sign</label><input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 font-mono" placeholder="e.g. Jane Doe" value={signatureName} onChange={e => setSignatureName(e.target.value)} /></div>
                            <div className="flex justify-end gap-3 pt-4"><button type="button" onClick={() => setSignModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button><button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold">Confirm & Sign</button></div>
                        </form>
                    </div>
                </div>
            )}

            {showCredModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Add to The Vault / Share Login</h3>
                        <form onSubmit={handleAddCredential} className="space-y-4">
                            <div><label className="block text-sm font-medium text-slate-400 mb-1">Service Name</label><input type="text" required placeholder="e.g. GoDaddy Access" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" value={credForm.service_name} onChange={e => setCredForm({ ...credForm, service_name: e.target.value })} /></div>
                            <div><label className="block text-sm font-medium text-slate-400 mb-1">Username / Email</label><input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" value={credForm.username} onChange={e => setCredForm({ ...credForm, username: e.target.value })} /></div>
                            <div><label className="block text-sm font-medium text-slate-400 mb-1">Password</label><input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" value={credForm.password_value} onChange={e => setCredForm({ ...credForm, password_value: e.target.value })} /></div>
                            <div><label className="block text-sm font-medium text-slate-400 mb-1">Notes (Optional)</label><textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white h-24 resize-none focus:outline-none focus:border-emerald-500" value={credForm.notes} onChange={e => setCredForm({ ...credForm, notes: e.target.value })} /></div>
                            <div className="flex justify-end gap-3 pt-4"><button type="button" onClick={() => setShowCredModal(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button><button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold">Securely Save</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
