import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client for development when environment variables are not set
const createMockClient = (): SupabaseClient => {
  console.warn('⚠️ Supabase environment variables not configured. Using mock client.');
  console.warn('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file to enable Supabase.');
  
  // Return a dummy client that won't actually make requests
  return createClient('https://placeholder.supabase.co', 'placeholder-key');
};

export const supabase = (!supabaseUrl || !supabaseAnonKey)
  ? createMockClient()
  : createClient(supabaseUrl, supabaseAnonKey);
