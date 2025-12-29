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

        console.log('Gemini Key present:', !!geminiKey); // Debug log

        if (geminiKey) {
            try {
                const toneInstruction = score >= 90
                    ? "Tone: Elite Performance Coach. Validate their excellence. Be professional, approving, and authoritative."
                    : "Tone: Direct, Business-Centric. Focus on opportunity cost.";

                const prompt = `Act as a high-value Virtual CTO. The business owner has just run a speed test.
                
                Metrics:
                - Overall Score: ${Math.round(score)}/100
                - Load Time (LCP): ${metrics.lcp}
                - Visual Stability (CLS): ${metrics.cls}
                - Speed Index: ${metrics.speedIndex}
                
                Context:
                - <50: Critical Issues (User Barrier).
                - 50-89: Room for Growth (Missed Opportunities).
                - 90+: Elite Performance.
                
                Instructions:
                - ${toneInstruction}
                - Use UK English.
                - Focus on "User Trust", "Brand Authority", and "Lead Retention".
                - DO NOT use visceral or medical metaphors (e.g., "bleed", "hemorrhage", "pain").
                - DO NOT assume they sell physical products. Avoid "add to cart" language.
                - Be specific but professional: "A 4s load time creates friction that sends potential clients to competitors."
                - Keep it under 60 words. Punchy. No fluff.`;

                const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                if (!geminiResponse.ok) {
                    const errorText = await geminiResponse.text();
                    console.error('Gemini API Error Response:', errorText);
                } else {
                    const geminiData = await geminiResponse.json();
                    if (geminiData.candidates && geminiData.candidates[0].content.parts[0].text) {
                        aiInsight = geminiData.candidates[0].content.parts[0].text;
                    }
                }
            } catch (error) {
                console.error('Gemini API Exception:', error);
            }
        } else {
            console.warn('Gemini API Key is missing');
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
