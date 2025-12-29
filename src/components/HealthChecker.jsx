import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, Smartphone, Monitor, ArrowRight, X, Loader2, BarChart3, Globe, Server } from 'lucide-react';

const HealthChecker = () => {
    const [url, setUrl] = useState('');
    const [platform, setPlatform] = useState('wordpress');
    const [siteSize, setSiteSize] = useState('small');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // Single result object
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [strategy, setStrategy] = useState('mobile'); // Default to mobile

    // Detect user's device on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDesktop = window.innerWidth >= 1024; // Tailwind lg breakpoint
            setStrategy(isDesktop ? 'desktop' : 'mobile');
        }
    }, []);

    const analyzeWebsite = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        setProgress(10);

        try {
            setProgress(30);

            // Single API Call
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, strategy }),
            });

            setProgress(60);

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setResult(data);
            setProgress(100);

        } catch (err) {
            setError(err.message || 'Something went wrong. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    // --- Logic Helpers ---

    const getZone = (score) => {
        if (score < 50) return { name: 'Red Zone Rescue', color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500', range: '0-49' };
        if (score < 90) return { name: 'Amber Zone Audit', color: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500', range: '50-89' };
        return { name: 'Green Zone Polish', color: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500', range: '90-100' };
    };

    const calculatePackage = (data) => {
        // Use the single set of scores
        const scores = [data.score, data.seoScore, data.accessibilityScore];
        const minScore = Math.min(...scores);
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

        // Base Package Logic
        let recommendation = {};

        if (minScore >= 96) {
            // 96-100: Honest "No Sale"
            recommendation = {
                title: "World Class Performance",
                description: "To be honest? You don't need us. Your site is outperforming 99% of the web. Keep doing exactly what you're doing. We don't take money for work that doesn't need doing.",
                package: "Health Certificate",
                basePrice: 0,
                action: "Download Report" // Logic to handle this differently in UI?
            };
        } else if (minScore >= 90) {
            // 90-95: Optional Polish
            recommendation = {
                title: "Top Tier (With Room for 1%)",
                description: "You're in the Green Zone, so relax—nothing is 'broken'. But if you're the type who demands perfection, a quick polish can squeeze out those final points for total dominance.",
                package: "Proactive Polish",
                basePrice: 49, // Very low barrier
                action: "Book Polish"
            };
        } else if (minScore >= 50) {
            // 50-89: Main Value Prop
            recommendation = {
                title: "Unrealised Potential",
                description: "Your site is working, but it's running with the handbrake on. You're likely leaking leads to faster competitors. Let's release that brake and get you into the Green Zone.",
                package: "Growth Optimisation",
                basePrice: 149, // Fair mid-tier
                action: "Unlock Growth"
            };
        } else {
            // < 50: Rescue
            recommendation = {
                title: "Emergency Rescue",
                description: "We won't sugarcoat it: these scores are hurting your business. Google penalises scores this low. We need to perform an urgent overhaul to stop losing customers.",
                package: "Site Rescue",
                basePrice: 249, // Lowered from 300 to be "fairer" but still serious
                action: "Start Rescue"
            };
        }

        // Pricing Multipliers
        let multiplier = 1;

        // Site Size Multiplier
        if (siteSize === 'medium') multiplier *= 1.3; // Reduced from 1.5 to be fairer
        if (siteSize === 'large') {
            recommendation.priceDisplay = "Custom Quote";
            return recommendation; // Exit early for custom quote
        }

        // Platform Multiplier (Non-WordPress is cheaper/simpler)
        if (platform !== 'wordpress' && platform !== 'custom') multiplier *= 0.8; // e.g. Shopify/Wix distinct handling

        if (recommendation.basePrice === 0) {
            recommendation.priceDisplay = "Free";
        } else {
            const finalPrice = Math.round(recommendation.basePrice * multiplier);
            recommendation.priceDisplay = `£${finalPrice}`;
        }

        return recommendation;
    };

    // --- Render Helpers ---

    const ScoreCard = ({ title, score, icon: Icon }) => {
        const zone = getZone(score);
        return (
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
                    <Icon className="w-4 h-4" /> {title}
                </div>
                <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mb-2 ${zone.color} ${zone.border}`}>
                    <span className="text-2xl font-black">{Math.round(score)}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${zone.bg}`}>
                    {zone.name.split(' ')[0]} Zone
                </span>
            </div>
        );
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Google Apps Script URL
        const GAS_URL = "https://script.google.com/macros/s/AKfycbzhiU_8s301iFJBTekADqnUMN0J-JcYgSz4rCeT0aVuzAL-kN3EEw2yJ2XecsHct5GMeg/exec";

        try {
            const response = await fetch(GAS_URL, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "text/plain;charset=utf-8" },
            });

            if (response.ok) {
                // Determine user name for feedback if available
                const name = data.name || "there";
                alert(`Thanks ${name}! We've received your request and will follow up shortly.`);
                setShowModal(false);
            } else {
                throw new Error("GAS submission failed");
            }
        } catch (error) {
            console.error(error);
            alert("There was a problem submitting your request. Please try again.");
        }
    };

    const recommendation = result ? calculatePackage(result) : null;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6">

            {/* Input Section */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-empower-pink to-purple-600"></div>

                <h2 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white">
                    Website Health Check
                </h2>
                <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
                    Get a comprehensive analysis of your site's Performance, SEO, and Accessibility.
                </p>

                <form onSubmit={analyzeWebsite} className="space-y-6 max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Website URL</label>
                            <input
                                type="url"
                                placeholder="https://yourwebsite.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-empower-pink outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Platform</label>
                            <div className="relative">
                                <Server className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-empower-pink outline-none appearance-none cursor-pointer"
                                >
                                    <option value="wordpress">WordPress</option>
                                    <option value="wix">Wix</option>
                                    <option value="squarespace">Squarespace</option>
                                    <option value="shopify">Shopify</option>
                                    <option value="custom">Custom / Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Site Size</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    value={siteSize}
                                    onChange={(e) => setSiteSize(e.target.value)}
                                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-empower-pink outline-none appearance-none cursor-pointer"
                                >
                                    <option value="small">Small (1-10 Pages)</option>
                                    <option value="medium">Medium (11-50 Pages)</option>
                                    <option value="large">Large (50+ Pages)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-empower-pink hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-6 h-6" />
                                <span>Analysing... {progress}%</span>
                            </>
                        ) : (
                            <>
                                <span>Run Full Diagnosis</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                        Running {strategy} analysis based on your current device.
                    </p>
                </form>

                {/* Progress Bar */}
                {loading && (
                    <div className="mt-6">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div
                                className="h-full bg-empower-pink transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-center text-slate-400 text-sm animate-pulse">
                            We are analysing your webpage, this may take a few moments.
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100">
                        <AlertTriangle className="w-6 h-6 shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}
            </div>

            {/* Results Section */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">

                    {/* Single Result Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                                <div className={`p-3 rounded-lg ${strategy === 'mobile' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                    {strategy === 'mobile' ? <Smartphone className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white capitalize">{strategy} Analysis</h3>
                                    <p className="text-xs text-slate-500">
                                        {strategy === 'mobile' ? 'Simulated Moto G4 • 4G Network' : 'Simulated Desktop • Wired Connection'}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <ScoreCard title="Speed" score={result.score} icon={Activity} />
                                <ScoreCard title="SEO" score={result.seoScore} icon={Globe} />
                                <ScoreCard title="UX" score={result.accessibilityScore} icon={CheckCircle} />
                            </div>

                            {/* AI Insight */}
                            {result.aiInsight && (
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2 mb-2 text-empower-pink font-bold text-xs uppercase tracking-wider">
                                        <Monitor className="w-4 h-4" /> AI Insight
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        "{result.aiInsight}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recommendation Engine */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-empower-pink/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/10">
                                    <BarChart3 className="w-4 h-4" />
                                    AI Diagnosis Complete
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">{recommendation.title}</h3>
                                <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl">
                                    {recommendation.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-sm">
                                        <span className="text-slate-400">Platform:</span> <span className="font-bold capitalize">{platform}</span>
                                    </div>
                                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-sm">
                                        <span className="text-slate-400">Size:</span> <span className="font-bold capitalize">{siteSize}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-96 bg-white text-slate-900 p-8 rounded-2xl shadow-xl">
                                <div className="text-center border-b border-slate-100 pb-6 mb-6">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Recommended Solution</p>
                                    <h4 className="text-2xl font-black text-empower-pink">{recommendation.package}</h4>
                                </div>

                                <div className="text-center mb-8">
                                    <div className="text-5xl font-black mb-1">{recommendation.priceDisplay}</div>
                                    {recommendation.priceDisplay !== "Custom Quote" && (
                                        <span className="text-slate-400 text-sm font-medium">One-time investment</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => setShowModal(true)}
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
                                >
                                    {recommendation.action} <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Lead Gen Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Let's Fix This.</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-8 text-center text-sm">
                                Enter your email to request the <strong>{recommendation.package}</strong> for <strong>{url}</strong>.
                            </p>

                            <form onSubmit={handleLeadSubmit} className="space-y-4">
                                <input type="hidden" name="subject" value={`New Lead: ${recommendation.package}`} />
                                <input type="hidden" name="url" value={url} />
                                <input type="hidden" name="platform" value={platform} />
                                <input type="hidden" name="siteSize" value={siteSize} />
                                <input type="hidden" name="package" value={recommendation.package} />
                                <input type="hidden" name="price" value={recommendation.priceDisplay} />

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-empower-pink outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="you@company.com"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-empower-pink outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">Message</label>
                                    <textarea
                                        name="message"
                                        rows="3"
                                        defaultValue={
                                            recommendation.basePrice === 0
                                                ? `Hi, I scored ${Math.round(result.score)}/100! Please send me my official Health Certificate.`
                                                : `Hi, I'm interested in the ${recommendation.package} for ${url}.\n\nPlease analyze my site's ${Math.round(result.score)} speed score and help me improve it.`
                                        }
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-empower-pink outline-none resize-none"
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full bg-empower-pink text-white font-bold py-4 rounded-lg hover:bg-pink-700 transition-colors shadow-lg mt-2">
                                    Confirm Request
                                </button>
                            </form>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700">
                            We'll analyse your report and get back to you within 24 hours.
                        </div>
                    </div>
                </div >
            )}

        </div >
    );
};

export default HealthChecker;
