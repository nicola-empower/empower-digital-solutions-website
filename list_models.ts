import { config } from 'dotenv';
import { resolve } from 'path';

// Load env vars
config({ path: resolve(process.cwd(), '.env.local') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('No GEMINI_API_KEY found in .env.local');
    process.exit(1);
}

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error('Error listing models:', data.error);
        } else {
            console.log('Available Models:');
            data.models.forEach(model => {
                if (model.name.includes('gemini')) {
                    console.log(`- ${model.name} (Supported methods: ${model.supportedGenerationMethods.join(', ')})`);
                }
            });
        }
    } catch (error) {
        console.error('Failed to fetch models:', error);
    }
}

listModels();
