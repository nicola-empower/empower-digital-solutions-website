import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Upload, Link as LinkIcon, Trash2, ExternalLink, File, CheckCircle, Clock, Pencil, Save, X } from 'lucide-react';

interface ProjectManagerProps {
    projectId: string;
}

export default function ProjectManager({ projectId }: ProjectManagerProps) {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<any>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);

    // Link Modal State
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkData, setLinkData] = useState({ name: '', url: '' });

    // Edit Project State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', status: '', workflow_type: '', client_id: '' });
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
        fetchClients();
    }, [projectId]);

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

        setLoading(false);
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
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await supabase.from('documents').delete().eq('id', id);
            fetchData();
        } catch (error: any) {
            alert('Error deleting item: ' + error.message);
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

            {/* File Centre */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
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
