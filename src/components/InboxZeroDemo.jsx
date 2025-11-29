import React, { useState, useEffect } from 'react';
import { Play, Loader2, AlertTriangle, CheckCircle, Mail, Clock, Filter } from 'lucide-react';

export default function InboxZeroDemo() {
    const [status, setStatus] = useState('idle'); // idle, running, complete
    const [logs, setLogs] = useState([]);

    // STATS STATE
    const [stats, setStats] = useState({
        inbox: 15284,
        unread: 8921,
        time: "2h 30m",
        missed: 42
    });

    // The Typing Animation Logic
    const addLog = async (message, delay) => {
        return new Promise(resolve => {
            setTimeout(() => {
                setLogs(prev => [...prev, message]);
                // Auto-scroll to bottom of terminal
                const terminal = document.getElementById('terminal-body');
                if (terminal) terminal.scrollTop = terminal.scrollHeight;
                resolve();
            }, delay);
        });
    };

    const runSimulation = async (e) => {
        e.preventDefault();
        if (status === 'running') return;

        setStatus('running');
        setLogs([]); // Clear previous logs

        // SIMULATION SEQUENCE
        await addLog({ text: "> Initializing G-Suite API Connection...", color: "text-slate-400" }, 100);
        await addLog({ text: "> Authenticating User: nicola@empower...", color: "text-slate-400" }, 400);
        await addLog({ text: "> [SUCCESS] Connection Established.", color: "text-green-400" }, 300);
        await addLog({ text: "> Scanning Inbox (15,284 threads)...", color: "text-blue-400" }, 600);

        // Processing Steps
        await addLog({ text: "> [RULE 1] Identifying 'Invoice' & 'Quote' keywords...", color: "text-yellow-400" }, 500);
        await addLog({ text: "  >> Found 421 Finance Threads. Applying Label: [FINANCE]", color: "text-slate-500" }, 300);

        await addLog({ text: "> [RULE 2] Identifying 'Enquiry' keywords...", color: "text-yellow-400" }, 500);
        await addLog({ text: "  >> Found 58 Potential Leads. Applying Label: [PRIORITY]", color: "text-slate-500" }, 300);

        await addLog({ text: "> [RULE 3] Batch Archiving Newsletters > 90 Days...", color: "text-yellow-400" }, 600);
        await addLog({ text: "  >> Archived 12,501 Threads.", color: "text-slate-500" }, 400);

        await addLog({ text: "> [COMPLETE] Inbox Zero Achieved.", color: "text-green-400 font-bold" }, 200);
        await addLog({ text: "> Generating Report...", color: "text-blue-400" }, 500);

        // Update Stats to "After" State
        setStats({
            inbox: 0,
            unread: 0,
            time: "< 10m",
            missed: 0
        });
        setStatus('complete');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN: Controls */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-pink-500" /> Script Configuration
                    </h3>

                    <form className="space-y-4" onSubmit={runSimulation}>
                        {/* Fake Inputs for Visuals */}
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400">Archive Threshold</label>
                            <select className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-pink-500 transition-colors">
                                <option>Older than 90 Days</option>
                                <option>Older than 60 Days</option>
                                <option>Older than 30 Days</option>
                            </select>
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="text-sm text-slate-400">Active Rules</label>
                            {['Auto-Label Finance Docs', 'Highlight New Leads', 'Archive Newsletters'].map((rule, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                    <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-sm text-slate-300">{rule}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'running'}
                            className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${status === 'running'
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-900/20'
                                }`}
                        >
                            {status === 'running' ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                            ) : (
                                <><Play className="w-5 h-5" /> Run Automation</>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT COLUMN: Terminal & Stats */}
            <div className="lg:col-span-8 space-y-6">

                {/* The Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Inbox Count" value={stats.inbox} icon={Mail} color={status === 'complete' ? 'text-green-400' : 'text-white'} />
                    <StatCard label="Unread" value={stats.unread} icon={AlertTriangle} color={status === 'complete' ? 'text-green-400' : 'text-pink-400'} />
                    <StatCard label="Daily Time" value={stats.time} icon={Clock} color="text-blue-400" />
                    <StatCard label="Missed Leads" value={stats.missed} icon={AlertTriangle} color={status === 'complete' ? 'text-green-400' : 'text-amber-400'} />
                </div>

                {/* The Terminal Window */}
                <div className="bg-[#0f172a] rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
                    {/* Terminal Header */}
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="ml-4 text-xs font-mono text-slate-400">run_inbox_zero.js — Node — 84x24</div>
                    </div>

                    {/* Terminal Body */}
                    <div id="terminal-body" className="p-6 font-mono text-sm h-[300px] overflow-y-auto space-y-2 scroll-smooth">
                        {status === 'idle' && (
                            <div className="text-slate-500">
                                &gt; System Ready.<br />
                                &gt; Waiting for user input...<br />
                                <span className="animate-pulse">_</span>
                            </div>
                        )}
                        {logs.map((log, index) => (
                            <div key={index} className={`${log.color} break-all`}>
                                {log.text}
                            </div>
                        ))}
                        {status === 'running' && <div className="animate-pulse text-pink-500">_</div>}
                    </div>
                </div>
            </div>

        </div>
    );
}

// Simple Sub-component for the stats
function StatCard({ label, value, icon: Icon, color }) {
    return (
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 opacity-70">
                <Icon className="w-4 h-4 text-slate-300" />
                <span className="text-xs uppercase tracking-wider text-slate-300">{label}</span>
            </div>
            <div className={`text-2xl font-bold font-mono transition-all duration-500 ${color}`}>
                {value.toLocaleString()}
            </div>
        </div>
    );
}
