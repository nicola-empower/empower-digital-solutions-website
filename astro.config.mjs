// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://empowerdigitalsolutions.co.uk',
    vite: {
        // @ts-ignore
        plugins: [tailwindcss()]
    },

    integrations: [react(), sitemap()],
    output: 'server',
    adapter: netlify(),
});