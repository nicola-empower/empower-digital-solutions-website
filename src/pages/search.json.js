import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('insights');

    const staticPages = [
        { title: 'Home', slug: '/', description: 'Empower Digital Solutions Homepage', type: 'page' },
        { title: 'Services', slug: '/services', description: 'Web Development & Digital Services', type: 'page' },
        { title: 'GoHighLevel Alternative', slug: '/ghl-alternative', description: 'Stop Renting Your Website', type: 'page' },
        { title: 'Contact', slug: '/contact', description: 'Get in Touch', type: 'page' },
        { title: 'MVP Development', slug: '/mvp-development', description: 'Turn your idea into a working app', type: 'page' },
        { title: 'Information for Trades', slug: '/trades', description: 'Web design for Builders, Plumbers & Electricians', type: 'page' },
        { title: 'Pricing', slug: '/pricing', description: 'Transparent Project Pricing', type: 'page' },
        { title: 'Aesthetic Vault', slug: '/aesthetic-vault', description: 'Premium Design Systems', type: 'page' },
    ];

    const blogItems = posts.map(post => ({
        title: post.data.title,
        slug: `/insights/${post.slug}`,
        description: post.data.description,
        type: 'blog'
    }));

    return new Response(JSON.stringify([...staticPages, ...blogItems]), {
        headers: {
            'content-type': 'application/json'
        }
    });
}
