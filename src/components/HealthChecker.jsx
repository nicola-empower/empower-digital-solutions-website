import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, Smartphone, Monitor, ArrowRight, X, Loader2, BarChart3, Globe, Server } from 'lucide-react';

const HealthChecker = () => {
    const [url, setUrl] = useState('');
    const [platform, setPlatform] = useState('wordpress');
    const [siteSize, setSiteSize] = useState('small');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);

    const analyzeWebsite = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults(null);
        setProgress(10);

        try {
            // 1. Mobile Analysis
            setProgress(30);
            const mobileResponse = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, strategy: 'mobile' }),
            });
            const mobileData = await mobileResponse.json();
            if (mobileData.error) throw new Error(`Mobile Scan Failed: ${mobileData.error}`);

            setProgress(60);

            // 2. Desktop Analysis
            const desktopResponse = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, strategy: 'desktop' }),
            });
            const desktopData = await desktopResponse.json();
            if (desktopData.error) throw new Error(`Desktop Scan Failed: ${desktopData.error}`);

            setProgress(90);

            setResults({
                mobile: mobileData,
                desktop: desktopData
            });
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

    const calculatePackage = (mobileScores, desktopScores) => {
        // Get lowest score across all categories to determine severity
        const allScores = [
            mobileScores.score, mobileScores.seoScore, mobileScores.accessibilityScore,
            desktopScores.score, desktopScores.seoScore, desktopScores.accessibilityScore
        ];
        const minScore = Math.min(...allScores);

        // Base Package Logic
        let recommendation = {};
        if (minScore < 50) {
            recommendation = {
                title: "Critical Site Rescue",
                description: "Your site has foundational issues affecting ranking and user experience. Immediate rescue work is recommended.",
                package: "Rescue Package",
                basePrice: 300,
                action: "Book Rescue"
            };
        } else if (minScore < 90) {
            recommendation = {
                title: "Full Optimisation",
                description: "Your site is functional but losing ground to faster competitors. A comprehensive tune-up will push you into the green.",
                package: "Optimisation Package",
                basePrice: 150,
                action: "Book Optimisation"
            };
        } else {
            recommendation = {
                title: "Perfectionist Polish",
                description: "Excellent health! A final polish will clear any minor warnings and help you maintain that perfect 100.",
                package: "Polish Package",
                basePrice: 75,
                action: "Book Polish"
            };
        }

        // Pricing Multipliers
        let multiplier = 1;

        // Site Size Multiplier
        if (siteSize === 'medium') multiplier *= 1.5;
        if (siteSize === 'large') {
            recommendation.priceDisplay = "Custom Quote";
            return recommendation; // Exit early for custom quote
        }

        // Platform Multiplier (Non-WordPress is cheaper/simpler)
        if (platform !== 'wordpress') multiplier *= 0.75;

        const finalPrice = Math.round(recommendation.basePrice * multiplier);
        recommendation.priceDisplay = `£${finalPrice}`;

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

    const recommendation = results ? calculatePackage(results.mobile, results.desktop) : null;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6">

            {/* Input Section */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-empower-pink to-purple-600"></div>

                <h2 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white">
                    Website Health Check
                </h2>
                <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
                    Get a comprehensive dual-scan analysis of your site's Performance, SEO, and Accessibility.
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
            {results && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">

                    {/* Dual Score Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Mobile Results */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <Smartphone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Mobile Analysis</h3>
                                    <p className="text-xs text-slate-500">Simulated Moto G4 • 4G Network</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <ScoreCard title="Speed" score={results.mobile.score} icon={Activity} />
                                <ScoreCard title="SEO" score={results.mobile.seoScore} icon={Globe} />
                                <ScoreCard title="UX" score={results.mobile.accessibilityScore} icon={CheckCircle} />
                            </div>

                            {/* AI Insight for Mobile */}
                            {results.mobile.aiInsight && (
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2 mb-2 text-empower-pink font-bold text-xs uppercase tracking-wider">
                                        <Monitor className="w-4 h-4" /> AI Insight
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        "{results.mobile.aiInsight}"
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Desktop Results */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                    <Monitor className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Desktop Analysis</h3>
                                    <p className="text-xs text-slate-500">Simulated Desktop • Wired Connection</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <ScoreCard title="Speed" score={results.desktop.score} icon={Activity} />
                                <ScoreCard title="SEO" score={results.desktop.seoScore} icon={Globe} />
                                <ScoreCard title="UX" score={results.desktop.accessibilityScore} icon={CheckCircle} />
                            </div>
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

                            <form action="https://formspree.io/f/mblkwkpp" method="POST" className="space-y-4">
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

                                <button type="submit" className="w-full bg-empower-pink text-white font-bold py-4 rounded-lg hover:bg-pink-700 transition-colors shadow-lg mt-2">
                                    Confirm Request
                                </button>
                            </form>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700">
                            We'll analyze your report and get back to you within 24 hours.
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HealthChecker;
