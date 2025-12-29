import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const insights = await getCollection('insights');
    return rss({
        title: 'Empower Digital Solutions | Insights',
        description: 'Latest articles on web development, automation, and digital strategy.',
        site: context.site,
        items: insights.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/insights/${post.slug}/`,
        })),
        customData: `<language>en-gb</language>`,
    });
}
