import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Initialize Supabase Client
// Note: In API routes (server-side), we prefer SERVICE_ROLE_KEY if available to bypass RLS for admin tasks (like upserting leads indiscriminately).
// If using client-side, we use ANON_KEY.
export const supabase = createClient(supabaseUrl, supabaseKey);
