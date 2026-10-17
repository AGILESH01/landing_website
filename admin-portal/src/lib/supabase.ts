import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://alxatoutpzhlcvteebzv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseGF0b3V0cHpobGN2dGVlYnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDQzMTcsImV4cCI6MjEwNzgyMDMxN30.UJoNlOk8w6k4czNlpMQwBsCVXdzxvIylINz6RJCB1Xk';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY_AUTH = 'kt_admin_portal_session_v1';

export interface LocalAdminSession {
  email: string;
  role: 'admin';
  timestamp: number;
}

export const getLocalAdminSession = (): LocalAdminSession | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setLocalAdminSession = (session: { email: string; role: 'admin' } | null) => {
  if (typeof window === 'undefined') return;
  if (!session) {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  } else {
    localStorage.setItem(
      STORAGE_KEY_AUTH,
      JSON.stringify({ ...session, timestamp: Date.now() })
    );
  }
};
