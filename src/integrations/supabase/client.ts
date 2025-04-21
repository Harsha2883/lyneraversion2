
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oshwukedwbortdxknolz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zaHd1a2Vkd2JvcnRkeGtub2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwODU1NzEsImV4cCI6MjA2MDY2MTU3MX0.Mth-V8JRhsMvCtWFSyxiNG7A1F5tSaBfn_T5jVvoZsc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
    // Reduce debug logging to prevent console noise
    debug: false,
  },
});
