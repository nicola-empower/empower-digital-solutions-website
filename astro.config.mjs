// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://empowerdigitalsolutions.co.uk',
    vite: {
        plugins: [tailwindcss()]
    },

    integrations: [react(), sitemap()],
    output: 'server',
    adapter: vercel(),
});