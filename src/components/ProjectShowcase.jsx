import React, { useState } from 'react';
import { Laptop, Brain, Calculator, Palette, ExternalLink, ArrowRight } from 'lucide-react';

// 1. THE DATA (Filtered & Categorized)
const categories = [
    {
        id: 'saas',
        label: 'SaaS & Portals',
        icon: Laptop,
        description: 'Scalable platforms, secure vaults, and booking engines.',
        projects: [
            'vowsuite', 'va-assist', 'client-portal', 'project-dana', 'medi-sync'
        ]
    },
    {
        id: 'ai',
        label: 'AI & Automation',
        icon: Brain,
        description: 'Generative AI agents and automated workflow scripts.',
        projects: [
            'ai-wedding-planner', 'project-voyager', 'trade-pro', 'inbox-zero', 'automated-invoice-process'
        ]
    },
    {
        id: 'fintech',
        label: 'FinTech & Logic',
        icon: Calculator,
        description: 'ROI calculators, tax forecasting, and financial modeling.',
        projects: [
            'finance-ninja', 'isa-time-machine', 'quote-command', 'automation-roi-calculator', 'automation-grader'
        ]
    },
    {
        id: 'web',
        label: 'High-Performance Web',
        icon: Palette,
        description: 'Award-winning design, motion graphics, and 100/100 performance.',
        projects: [
            'cairn-architects', 'zen-den', 'aura', 'urban-stay', 'bistro-44'
        ]
    }
];

// We pass the full "projects" array from your file into this component as a prop
export default function ProjectShowcase({ allProjects }) {
    const [activeCategory, setActiveCategory] = useState('saas');

    // Helper to find the full project object based on the slug
    const getProjectsForCategory = (catId) => {
        const category = categories.find(c => c.id === catId);
        return category.projects
            .map(slug => allProjects.find(p => p.slug === slug))
            .filter(Boolean); // Removes undefined if a project is missing
    };

    const currentProjects = getProjectsForCategory(activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: The Tabs */}
                <div className="lg:col-span-3 space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${activeCategory === cat.id
                                ? 'bg-purple-900/20 border-purple-500 text-white'
                                : 'bg-transparent border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-purple-400' : 'text-slate-500'}`} />
                                <span className="font-bold">{cat.label}</span>
                            </div>
                            <p className="text-xs opacity-70 pl-8 hidden md:block">{cat.description}</p>
                        </button>
                    ))}
                </div>

                {/* RIGHT COLUMN: The Grid */}
                <div className="lg:col-span-9">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentProjects.map((project) => (
                            <div key={project.slug} className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:-translate-y-1">

                                {/* Image Section */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent z-10 opacity-60" />
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className={`px-2 py-1 text-xs font-bold uppercase rounded border ${project.status === 'live' ? 'bg-green-900/80 border-green-500 text-green-300' : 'bg-amber-900/80 border-amber-500 text-amber-300'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                        {project.shortTagline}
                                    </p>

                                    {/* Tech Stack Pills */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack.slice(0, 3).map((tech) => (
                                            <span key={tech} className="text-xs font-mono text-purple-300 bg-purple-900/20 px-2 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                                        <span className="text-xs text-slate-500 font-mono">{project.year}</span>

                                        <div className="flex gap-3">
                                            {/* If you have a Live URL */}
                                            {project.liveUrl && project.liveUrl !== '#' && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1 text-sm font-bold text-white hover:text-purple-400 transition-colors"
                                                >
                                                    Live Demo <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
