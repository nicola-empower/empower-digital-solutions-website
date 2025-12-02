import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Upload, Link as LinkIcon, Trash2, ExternalLink, File, CheckCircle, Clock } from 'lucide-react';

interface ProjectManagerProps {
    projectId: string;
}

export default function ProjectManager({ projectId }: ProjectManagerProps) {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<any>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkData, setLinkData] = useState({ name: '', url: '' });

    useEffect(() => {
        fetchData();
    }, [projectId]);

    const fetchData = async () => {
        // 1. Fetch Project Details
        const { data: proj } = await supabase
            .from('projects')
            .select('*, profiles(full_name, company_name, email)')
            .eq('id', projectId)
            .single();
        setProject(proj);

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

    const handleDelete = async (id: string, path?: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            // Delete from DB
            await supabase.from('documents').delete().eq('id', id);

            // If file, delete from storage (optional, but good hygiene)
            // Note: We'd need the storage path, which we might not have stored directly if we only stored publicUrl.
            // For now, just DB delete is fine for the UI.

            fetchData();
        } catch (error: any) {
            alert('Error deleting item: ' + error.message);
        }
    };

    if (loading) return <div className="text-white">Loading Project Details...</div>;
    if (!project) return <div className="text-white">Project not found.</div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                    <div className="flex items-center gap-4 text-slate-400">
                        <span>{project.profiles?.full_name}</span>
                        <span>•</span>
                        <span>{project.profiles?.company_name}</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-xs border border-emerald-500/20 uppercase font-bold">{project.status}</span>
                    </div>
                </div>
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
                                            onClick={() => handleDelete(doc.id)}
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
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md">
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
        </div>
    );
}
