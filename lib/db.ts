import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Helper to parse env file manually
function getEnvValue(key: string): string | undefined {
    try {
        const envLocalPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envLocalPath)) {
            const content = fs.readFileSync(envLocalPath, 'utf-8');
            const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
            if (match) return match[1].trim();
        }

        const envPath = path.join(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf-8');
            const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
            if (match) return match[1].trim();
        }
    } catch (e) {
        console.error('Error reading env files:', e);
    }
    return undefined;
}



let connectionString = process.env.DATABASE_URL;

// If DATABASE_URL is missing or points to localhost (likely system override), try to read from files
if (!connectionString || connectionString.includes('localhost')) {
    const fileUrl = getEnvValue('DATABASE_URL');
    if (fileUrl) {
        console.log('Overriding system DATABASE_URL with value from .env file');
        connectionString = fileUrl;
    }
}

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Required for Neon
    },
});

export const db = {
    query: (text: string, params?: any[]) => pool.query(text, params),
};
