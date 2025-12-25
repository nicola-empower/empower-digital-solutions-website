// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://empowerdigitalsolutions.co.uk',
    vite: {
        // @ts-ignore
        plugins: [tailwindcss()]
    },

    integrations: [
        react(),
        sitemap(),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
    ],
    output: 'server',
    adapter: netlify(),
});