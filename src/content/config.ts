import { defineCollection, z } from 'astro:content';

const insightsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default('Empower Digital Solutions'),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().default(false),
    }),
});

export const collections = {
    'insights': insightsCollection,
};
