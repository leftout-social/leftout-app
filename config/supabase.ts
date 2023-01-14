import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://kglunlqrdgndiispjgxh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbHVubHFyZGduZGlpc3BqZ3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM2MzQ0NDUsImV4cCI6MTk4OTIxMDQ0NX0.67LH1hpTB7_AftOkww3a7vrlzTW4hgYnzJ3rH10jZEc'
export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);