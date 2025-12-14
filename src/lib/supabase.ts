import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
    return !!supabaseUrl && !!supabaseKey;
};

if (!isSupabaseConfigured()) {
    console.error('Supabase credentials missing! Check your .env file. Logins will fail.');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder-key'
);
