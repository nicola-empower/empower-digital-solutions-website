import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('Starting script...');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(process.cwd(), '.env.local');
let apiKey = '';

try {
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (match && match[1]) {
            apiKey = match[1].trim();
            console.log('API Key found (length: ' + apiKey.length + ')');
        } else {
            console.log('API Key not found in .env.local regex match');
        }
    } else {
        console.log('.env.local file not found at: ' + envPath);
    }
} catch (e) {
    console.error('Error reading .env.local:', e.message);
}

if (!apiKey) {
    console.error('No GEMINI_API_KEY found. Exiting.');
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log('Fetching models from: ' + url.replace(apiKey, 'HIDDEN_KEY'));

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error('API Error:', JSON.stringify(json.error, null, 2));
            } else {
                console.log('Available Models:');
                const modelNames = [];
                if (json.models) {
                    json.models.forEach(model => {
                        if (model.name.includes('gemini')) {
                            modelNames.push(model.name);
                        }
                    });
                    fs.writeFileSync('models.txt', modelNames.join('\n'));
                    console.log('Wrote ' + modelNames.length + ' models to models.txt');
                } else {
                    console.log('No models found in response:', json);
                }
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw response:', data);
        }
    });

}).on('error', (err) => {
    console.error('Network Error:', err.message);
});
