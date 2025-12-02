import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yghkhcnexahifgdvvejw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnaGtoY25leGFoaWZnZHZ2ZWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MzQ1NDcsImV4cCI6MjA4MDExMDU0N30.cGxRIGnmAMyNJFOOhhhKpN0q2pynaw_y0kSZ4SYGClM";
const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export { supabase as s };
