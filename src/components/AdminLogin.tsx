import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
        console.log("AdminLogin component mounted and ready");
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            console.log("Login successful", data);
            window.location.href = "/admin/dashboard";
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "An unexpected error occurred");
            setLoading(false);
        }
    };

    // Removed 'ready' state check to prevent hydration lock
    // if (!ready) {
    //     return <div className="text-white text-center">Loading login form...</div>;
    // }

    return (
        <div className="w-full">
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empower-pink focus:ring-1 focus:ring-empower-pink transition-colors"
                        placeholder="admin@empower.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-empower-pink focus:ring-1 focus:ring-empower-pink transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-empower-pink text-white hover:bg-vibrant-magenta shadow-lg hover:shadow-empower-pink/25'
                        }`}
                >
                    {loading ? 'Authenticating...' : 'Login to Dashboard'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center animate-pulse">
                    {error}
                </div>
            )}

            <div className="mt-6 text-center">
                <p className="text-slate-500 text-xs">
                    Secure Admin Access • Empower Digital Solutions
                </p>
            </div>
        </div>
    );
}
