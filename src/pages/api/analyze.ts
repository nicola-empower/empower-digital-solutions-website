import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const targetUrl = body.url;
        const strategy = body.strategy || 'mobile';

        if (!targetUrl) {
            return new Response(JSON.stringify({ error: 'URL is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const apiKey = import.meta.env.PAGESPEED_API_KEY || import.meta.env.GOOGLE_PAGESPEED_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Server configuration error: API Key missing' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${apiKey}&strategy=${strategy}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            return new Response(JSON.stringify({ error: data.error.message }), {
                status: data.error.code || 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Extract relevant metrics
        const lighthouse = data.lighthouseResult;
        const score = lighthouse.categories.performance.score * 100;
        const seoScore = lighthouse.categories.seo.score * 100;
        const accessibilityScore = lighthouse.categories.accessibility.score * 100;

        const metrics = {
            lcp: lighthouse.audits['largest-contentful-paint'].displayValue,
            cls: lighthouse.audits['cumulative-layout-shift'].displayValue,
            fid: lighthouse.audits['max-potential-fid'].displayValue, // FID is deprecated, using Max Potential FID as proxy or TBT
            speedIndex: lighthouse.audits['speed-index'].displayValue,
        };

        // Generate AI Insight using Gemini
        let aiInsight = "AI analysis unavailable at this time.";
        const geminiKey = import.meta.env.GEMINI_API_KEY;

        if (geminiKey) {
            try {
                const prompt = `Act as a Senior Developer. Explain to a non-technical business owner why these website performance scores are hurting their revenue.
                
                Metrics:
                - Overall Score: ${Math.round(score)}/100
                - Load Time (LCP): ${metrics.lcp}
                - Visual Stability (CLS): ${metrics.cls}
                - Speed Index: ${metrics.speedIndex}
                
                Context:
                - A score under 50 is critical (Red Zone).
                - A score under 90 needs improvement (Amber Zone).
                - A score over 90 is good (Green Zone).
                
                Instructions:
                - Use UK English (e.g. "optimisation", "analysing").
                - Keep it under 80 words.
                - Be factual, direct, and focus on revenue/user impact.
                - Do not use "Hello" or generic intros. Start directly with the insight.
                - Example tone: "A 4.2-second load time on mobile means you are likely losing ~40% of traffic..."`;

                const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                const geminiData = await geminiResponse.json();
                if (geminiData.candidates && geminiData.candidates[0].content.parts[0].text) {
                    aiInsight = geminiData.candidates[0].content.parts[0].text;
                }
            } catch (error) {
                console.error('Gemini API Error:', error);
            }
        }

        return new Response(JSON.stringify({
            score,
            seoScore,
            accessibilityScore,
            metrics,
            strategy,
            aiInsight
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to process request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
