import React, { useState } from 'react';
import { Plus, Minus, FileText, Trash2, ShoppingBag, ChevronRight, Search } from 'lucide-react';
import jsPDF from 'jspdf';

const MENU_CATEGORIES = [
    { id: 'websites', name: 'Website Packages', icon: '🌐' },
    { id: 'maintenance', name: 'Monthly Care', icon: '🛠️' },
    { id: 'addons', name: 'Power-Ups', icon: '⚡' },
    { id: 'apps', name: 'Custom Apps', icon: '📱' },
];

const MENU_ITEMS = {
    websites: [
        { id: 'landing', name: 'Landing Page', price: 950, desc: 'High-converting single page site' },
        { id: 'brochure', name: 'Brochure Site (5 Pages)', price: 1800, desc: 'Standard business presence' },
        { id: 'ecommerce', name: 'E-Commerce Starter', price: 2500, desc: 'Shopify or Woo setup + 10 products' },
        { id: 'portal', name: 'Client Portal Integration', price: 1200, desc: 'Secure login area for clients' },
    ],
    maintenance: [
        { id: 'basic_care', name: 'Basic Care', price: 50, desc: 'Hosting, backups, updates', type: 'monthly' },
        { id: 'pro_care', name: 'Pro Care', price: 150, desc: 'Basic + 2hrs content updates', type: 'monthly' },
        { id: 'growth_care', name: 'Growth Engine', price: 450, desc: 'Pro + SEO & monthly strategy', type: 'monthly' },
    ],
    addons: [
        { id: 'seo_setup', name: 'SEO Foundation', price: 450, desc: 'On-page optimization & sitemap' },
        { id: 'copywriting', name: 'Pro Copywriting', price: 100, desc: 'Per page' },
        { id: 'logo', name: 'Logo Design', price: 350, desc: '3 concepts + revisions' },
        { id: 'automation', name: 'Zapier Automation', price: 250, desc: 'Per workflow' },
    ],
    apps: [
        { id: 'mvp_app', name: 'MVP Web App', price: 5000, desc: 'Core features, user auth, database' },
        { id: 'saas_platform', name: 'SaaS Platform', price: 15000, desc: 'Full scalable product' },
        { id: 'internal_tool', name: 'Internal Tool', price: 3500, desc: 'Admin dashboards, inventory, etc.' },
    ]
};

const InvoiceGenerator = () => {
    const [activeCategory, setActiveCategory] = useState('websites');
    const [cart, setCart] = useState([]);
    const [clientName, setClientName] = useState('');
    const [notes, setNotes] = useState('');

    const addToCart = (item) => {
        setCart([...cart, { ...item, cartId: Math.random().toString(36).substr(2, 9) }]);
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    const oneTimeTotal = cart
        .filter(item => item.type !== 'monthly')
        .reduce((sum, item) => sum + item.price, 0);

    const monthlyTotal = cart
        .filter(item => item.type === 'monthly')
        .reduce((sum, item) => sum + item.price, 0);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(24);
        doc.setTextColor(229, 0, 126); // Empower Pink
        doc.text('Empower Digital Solutions', 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text('Web Development & Digital Growth', 20, 28);

        // Client Info
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text(`Proposal For: ${clientName || 'Valued Client'}`, 20, 45);
        doc.setFontSize(10);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52);

        let yPos = 70;

        // One-Time Services
        const oneTimeItems = cart.filter(item => item.type !== 'monthly');
        if (oneTimeItems.length > 0) {
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Project Scope', 20, yPos);
            yPos += 10;
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);

            oneTimeItems.forEach(item => {
                doc.text(`• ${item.name}`, 20, yPos);
                doc.text(`£${item.price}`, 170, yPos, { align: 'right' });
                yPos += 7;
            });

            yPos += 5;
            doc.setFont(undefined, 'bold');
            doc.text(`Project Total: £${oneTimeTotal}`, 170, yPos, { align: 'right' });
            yPos += 20;
        }

        // Monthly Services
        const monthlyItems = cart.filter(item => item.type === 'monthly');
        if (monthlyItems.length > 0) {
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Monthly Services', 20, yPos);
            yPos += 10;
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);

            monthlyItems.forEach(item => {
                doc.text(`• ${item.name}`, 20, yPos);
                doc.text(`£${item.price}/mo`, 170, yPos, { align: 'right' });
                yPos += 7;
            });

            yPos += 5;
            doc.setFont(undefined, 'bold');
            doc.text(`Monthly Total: £${monthlyTotal}`, 170, yPos, { align: 'right' });
            yPos += 20;
        }

        // Notes
        if (notes) {
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Additional Notes', 20, yPos);
            yPos += 10;
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);

            const splitNotes = doc.splitTextToSize(notes, 170);
            doc.text(splitNotes, 20, yPos);
        }

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Thank you for considering Empower Digital Solutions.', 105, 280, { align: 'center' });
        doc.text('nicola@empowerdigitalsolutions.co.uk', 105, 285, { align: 'center' });

        doc.save(`${clientName.replace(/\s+/g, '_')}_Proposal.pdf`);
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] bg-slate-50 dark:bg-slate-900 gap-6 p-6">

            {/* Left Side - Menu */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {MENU_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${activeCategory === cat.id
                                    ? 'bg-[#E5007E] text-white shadow-lg scale-105'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span className="font-bold">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2">
                    {MENU_ITEMS[activeCategory].map(item => (
                        <button
                            key={item.id}
                            onClick={() => addToCart(item)}
                            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md border border-transparent hover:border-[#E5007E]/30 text-left transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-[#E5007E] transition-colors">
                                    {item.name}
                                </h3>
                                <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg font-bold text-slate-700 dark:text-slate-200">
                                    £{item.price}{item.type === 'monthly' ? '/mo' : ''}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Side - Order Summary (The "Receipt") */}
            <div className="w-full lg:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex flex-col h-full border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#E5007E]" />
                        Current Quote
                    </h2>
                </div>

                <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                    <input
                        type="text"
                        placeholder="Client Name / Reference"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#E5007E]"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="text-center text-slate-400 py-10">
                            <p>Basket is empty</p>
                            <p className="text-sm">Click items to add them</p>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={item.cartId} className="flex justify-between items-center group animate-fadeIn">
                                <div className="flex-1">
                                    <div className="font-medium text-slate-800 dark:text-white">{item.name}</div>
                                    <div className="text-xs text-slate-500">
                                        £{item.price}{item.type === 'monthly' ? '/mo' : ''}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.cartId)}
                                    className="text-slate-300 hover:text-red-500 p-2 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <textarea
                        placeholder="Scope notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full h-20 px-4 py-2 mb-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#E5007E] text-sm resize-none"
                    />

                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-slate-600 dark:text-slate-300">
                            <span>Project Total:</span>
                            <span className="font-bold">£{oneTimeTotal}</span>
                        </div>
                        {monthlyTotal > 0 && (
                            <div className="flex justify-between text-[#E5007E]">
                                <span>Monthly Recurring:</span>
                                <span className="font-bold">+ £{monthlyTotal}/mo</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={generatePDF}
                        disabled={cart.length === 0}
                        className="w-full bg-[#E5007E] text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <FileText className="w-5 h-5" />
                        Generate Proposal PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
