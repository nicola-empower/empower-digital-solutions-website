import React, { useState, useEffect } from 'react';

export default function StickyBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed bottom-0 inset-x-0 bg-gray-800 text-white p-4 shadow-lg transition-transform duration-300 z-40 ${isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <p className="font-semibold hidden sm:block">Have a question? Let's have a quick, no-obligation chat.</p>
                <a
                    href="/contact"
                    className="bg-empower-pink hover:bg-vibrant-magenta text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Book a Quick Chat
                </a>
            </div>
        </div>
    );
}
