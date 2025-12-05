import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { ShoppingBag, Trash2, FileText, FileCheck, FileSpreadsheet, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const MENU_CATEGORIES = [
    { id: 'websites', name: 'Websites', icon: '🌐' },
    { id: 'marketing', name: 'Marketing', icon: '📈' },
    { id: 'automation', name: 'Automation', icon: '⚡' },
    { id: 'apps', name: 'Custom Apps', icon: '📱' },
];

const MENU_ITEMS = {
    websites: [
        { id: 'landing_page', name: 'Landing Page', price: 1500, desc: 'High-converting single page' },
        { id: 'brochure_site', name: 'Brochure Site', price: 2500, desc: '5-page informational site' },
        { id: 'ecom_basic', name: 'E-commerce Basic', price: 3500, desc: 'Shopify/WooCommerce setup' },
        { id: 'hosting_basic', name: 'Basic Hosting', price: 30, desc: 'Secure hosting & SSL', type: 'monthly' },
        { id: 'maintenance', name: 'Maintenance', price: 150, desc: 'Updates & backups', type: 'monthly' },
    ],
    marketing: [
        { id: 'seo_audit', name: 'SEO Audit', price: 500, desc: 'Technical & content analysis' },
        { id: 'seo_monthly', name: 'SEO Campaign', price: 1000, desc: 'Content & backlinks', type: 'monthly' },
        { id: 'ppc_setup', name: 'PPC Setup', price: 750, desc: 'Google/Meta Ads setup' },
        { id: 'ppc_mgmt', name: 'PPC Management', price: 500, desc: 'Ad optimization', type: 'monthly' },
    ],
    automation: [
        { id: 'crm_setup', name: 'CRM Setup', price: 1200, desc: 'HubSpot/Salesforce config' },
        { id: 'email_seq', name: 'Email Sequence', price: 800, desc: '5-email nurture flow' },
        { id: 'automation', name: 'Zapier Automation', price: 250, desc: 'Per workflow' },
    ],
    apps: [
        { id: 'internal_tool', name: 'The Internal Tool', price: 2500, desc: 'Replace Excel with a web app' },
        { id: 'business_system', name: 'The Business System', price: 6000, desc: 'Dedicated app for core business functions' },
        { id: 'saas_platform', name: 'The Platform / SaaS', price: 12000, desc: 'Scalable product ready for market' },
    ]
};

const DocumentGenerator = () => {
    const [activeCategory, setActiveCategory] = useState('websites');
    const [cart, setCart] = useState([]);
    const [docType, setDocType] = useState('quote'); // 'quote', 'proposal', 'invoice'
    const [clientName, setClientName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Document Specific Fields
    const [validity, setValidity] = useState('30 Days');
    const [paymentTerms, setPaymentTerms] = useState('50% Upfront, 50% Completion');
    const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`);
    const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [execSummary, setExecSummary] = useState('');
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [timeline, setTimeline] = useState('4-6 Weeks');

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

    const logDocument = async (fileUrl) => {
        setIsSaving(true);
        try {
            const { error } = await supabase.from('generated_documents').insert({
                client_name: clientName || 'Unknown Client',
                document_type: docType.charAt(0).toUpperCase() + docType.slice(1),
                total_amount: oneTimeTotal,
                file_url: fileUrl
            });

            if (error) throw error;
        } catch (err) {
            console.error('Error logging document:', err);
            alert('Failed to log document to dashboard.');
        } finally {
            setIsSaving(false);
        }
    };

    const generatePDF = async () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;

        // --- Helper Functions ---
        const centerText = (text, y) => {
            const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const x = (pageWidth - textWidth) / 2;
            doc.text(text, x, y);
        };

        const addHeader = () => {
            doc.setFontSize(24);
            doc.setTextColor(229, 0, 126); // Empower Pink
            doc.text('Empower Digital Solutions', margin, 20);

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text('Web Development & Digital Growth', margin, 26);
            doc.text('nicola@empowerdigitalsolutions.co.uk', margin, 31);

            // Document Label
            doc.setFontSize(30);
            doc.setTextColor(200);
            doc.text(docType.toUpperCase(), pageWidth - margin, 25, { align: 'right' });
        };

        const addFooter = () => {
            const pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(8);
            doc.setTextColor(150);
            centerText('Empower Digital Solutions | Stenhousemuir, Scotland', pageHeight - 10);
        };

        // --- Content Generation ---
        addHeader();

        let yPos = 50;

        // Client & Meta Info
        doc.setFontSize(11);
        doc.setTextColor(0);
        doc.text(`Client: ${clientName || 'Valued Client'}`, margin, yPos);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, yPos, { align: 'right' });
        yPos += 6;

        if (docType === 'invoice') {
            doc.text(`Invoice #: ${invoiceNumber}`, pageWidth - margin, yPos, { align: 'right' });
            yPos += 6;
            doc.text(`Due Date: ${dueDate}`, pageWidth - margin, yPos, { align: 'right' });
        } else {
            doc.text(`Valid Until: ${validity}`, pageWidth - margin, yPos, { align: 'right' });
        }
        yPos += 15;

        // Proposal Specific Sections
        if (docType === 'proposal') {
            if (execSummary) {
                doc.setFont(undefined, 'bold');
                doc.text('Executive Summary', margin, yPos);
                yPos += 7;
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);
                const splitText = doc.splitTextToSize(execSummary, pageWidth - (margin * 2));
                doc.text(splitText, margin, yPos);
                yPos += (splitText.length * 5) + 10;
            }

            if (problem && solution) {
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.text('Problem & Solution', margin, yPos);
                yPos += 7;
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);

                doc.text('The Challenge:', margin, yPos);
                yPos += 5;
                const splitProb = doc.splitTextToSize(problem, pageWidth - (margin * 2));
                doc.text(splitProb, margin, yPos);
                yPos += (splitProb.length * 5) + 5;

                doc.text('Our Solution:', margin, yPos);
                yPos += 5;
                const splitSol = doc.splitTextToSize(solution, pageWidth - (margin * 2));
                doc.text(splitSol, margin, yPos);
                yPos += (splitSol.length * 5) + 10;
            }
        }

        // Line Items (Common to all)
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(docType === 'invoice' ? 'Invoice Items' : 'Investment Summary', margin, yPos);
        yPos += 10;

        // Table Header
        doc.setFillColor(245, 245, 245);
        doc.rect(margin, yPos - 6, pageWidth - (margin * 2), 8, 'F');
        doc.setFontSize(10);
        doc.text('Description', margin + 2, yPos);
        doc.text('Amount', pageWidth - margin - 2, yPos, { align: 'right' });
        yPos += 10;

        doc.setFont(undefined, 'normal');

        // One-Time Items
        cart.filter(item => item.type !== 'monthly').forEach(item => {
            doc.text(item.name, margin + 2, yPos);
            doc.text(`£${item.price.toLocaleString()}`, pageWidth - margin - 2, yPos, { align: 'right' });
            yPos += 7;
        });

        // Monthly Items
        const monthlyItems = cart.filter(item => item.type === 'monthly');
        if (monthlyItems.length > 0) {
            yPos += 5;
            doc.setFont(undefined, 'bold');
            doc.text('Monthly Services', margin + 2, yPos);
            yPos += 7;
            doc.setFont(undefined, 'normal');
            monthlyItems.forEach(item => {
                doc.text(item.name, margin + 2, yPos);
                doc.text(`£${item.price.toLocaleString()}/mo`, pageWidth - margin - 2, yPos, { align: 'right' });
                yPos += 7;
            });
        }

        // Totals
        yPos += 5;
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Total: £${oneTimeTotal.toLocaleString()}`, pageWidth - margin, yPos, { align: 'right' });

        if (monthlyTotal > 0) {
            yPos += 7;
            doc.text(`Monthly Recurring: £${monthlyTotal.toLocaleString()}`, pageWidth - margin, yPos, { align: 'right' });
        }

        yPos += 20;

        // Footer Details (Terms, Bank Info, etc)
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');

        if (docType === 'invoice') {
            doc.text('Payment Details', margin, yPos);
            yPos += 6;
            doc.setFont(undefined, 'normal');
            doc.text('Bank: Starling Bank', margin, yPos); yPos += 5;
            doc.text('Account Name: Nicola Berry', margin, yPos); yPos += 5;
            doc.text('Sort Code: 60-83-71', margin, yPos); yPos += 5;
            doc.text('Account No: 37753996', margin, yPos); yPos += 10;
        } else {
            doc.text('Terms & Conditions', margin, yPos);
            yPos += 6;
            doc.setFont(undefined, 'normal');
            doc.text(`Payment Terms: ${paymentTerms}`, margin, yPos); yPos += 5;
            if (docType === 'proposal') {
                doc.text(`Estimated Timeline: ${timeline}`, margin, yPos); yPos += 5;
            }
        }

        addFooter();

        // 1. Save Locally
        const fileName = `${docType}_${clientName.replace(/\s+/g, '_') || 'draft'}_${Date.now()}.pdf`;
        doc.save(fileName);

        // 2. Upload to Supabase Storage
        setIsSaving(true);
        try {
            const pdfBlob = doc.output('blob');
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('portal-files')
                .upload(`admin_generated/${fileName}`, pdfBlob, {
                    contentType: 'application/pdf',
                    upsert: true
                });

            if (uploadError) {
                console.error('Upload error:', uploadError);
                // Don't block logging if upload fails, but warn
                alert('Document saved locally but failed to upload to cloud.');
                await logDocument(null);
            } else {
                // 3. Log to Dashboard with URL
                await logDocument(uploadData.path);
            }
        } catch (err) {
            console.error('Generation error:', err);
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] bg-slate-50 dark:bg-slate-900 gap-6 p-6">
            {/* Left Side - Menu */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* Doc Type Selector */}
                <div className="flex gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm w-fit">
                    {[
                        { id: 'quote', label: 'Quote', icon: <FileText size={18} /> },
                        { id: 'proposal', label: 'Proposal', icon: <FileSpreadsheet size={18} /> },
                        { id: 'invoice', label: 'Invoice', icon: <FileCheck size={18} /> }
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => setDocType(type.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${docType === type.id
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                        >
                            {type.icon}
                            {type.label}
                        </button>
                    ))}
                </div>

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

            {/* Right Side - Document Preview & Settings */}
            <div className="w-full lg:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex flex-col h-full border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#E5007E]" />
                        {docType.charAt(0).toUpperCase() + docType.slice(1)} Builder
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Common Fields */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Client Details</label>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#E5007E] text-slate-900 dark:text-white"
                        />
                    </div>

                    {/* Invoice Specific */}
                    {docType === 'invoice' && (
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase">Invoice #</label>
                                <input
                                    type="text"
                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* Proposal Specific */}
                    {docType === 'proposal' && (
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase">Executive Summary</label>
                                <textarea
                                    rows="3"
                                    placeholder="Brief overview..."
                                    value={execSummary}
                                    onChange={(e) => setExecSummary(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase">Timeline</label>
                                <input
                                    type="text"
                                    value={timeline}
                                    onChange={(e) => setTimeline(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-sm text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* Cart Items */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Line Items</label>
                        {cart.length === 0 ? (
                            <div className="text-center text-slate-400 py-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-sm">No items added</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.cartId} className="flex justify-between items-center group bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex-1">
                                        <div className="font-medium text-sm text-slate-800 dark:text-white">{item.name}</div>
                                        <div className="text-xs text-slate-500">£{item.price}</div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.cartId)}
                                        className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Totals */}
                    <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                            <span className="font-bold text-slate-800 dark:text-white">£{oneTimeTotal.toLocaleString()}</span>
                        </div>
                        {monthlyTotal > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Monthly</span>
                                <span className="font-bold text-slate-800 dark:text-white">£{monthlyTotal.toLocaleString()}/mo</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <button
                        onClick={generatePDF}
                        disabled={isSaving}
                        className="w-full bg-[#E5007E] text-white py-3 rounded-xl font-bold hover:bg-[#C4006B] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#E5007E]/20"
                    >
                        {isSaving ? (
                            <span>Saving...</span>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Generate {docType.charAt(0).toUpperCase() + docType.slice(1)}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentGenerator;
