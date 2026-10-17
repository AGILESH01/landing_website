import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Fabric, Quotation, OperationalSettings } from '../types';
import { VERIFIED_CATEGORIES, INITIAL_FABRICS } from '../data/seedData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://alxatoutpzhlcvteebzv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFseGF0b3V0cHpobGN2dGVlYnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDQzMTcsImV4cCI6MjEwNzgyMDMxN30.UJoNlOk8w6k4czNlpMQwBsCVXdzxvIylINz6RJCB1Xk';

export const isSupabaseConfigured = Boolean(
  import.meta.env.MODE !== 'test' &&
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = (isSupabaseConfigured && supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==============================================================================
// LOCAL STORAGE KEYS & IN-MEMORY REPOSITORY
// Provides a zero-dependency fallback for local development & offline evaluation
// ==============================================================================
const STORAGE_KEY_FABRICS = 'kt_fabrics_v1';
const STORAGE_KEY_CATEGORIES = 'kt_categories_v1';
const STORAGE_KEY_QUOTATIONS = 'kt_quotations_v1';
const STORAGE_KEY_SETTINGS = 'kt_settings_v1';
const STORAGE_KEY_AUTH = 'kt_admin_auth_v1';

export const DEFAULT_SETTINGS: OperationalSettings = {
  company_name: 'Karthikeyan Textiles',
  phone: '+91 9842212112',
  landline: '04288 234112',
  whatsapp: '+91 9842212112',
  email: 'karthikeyantextiles18@gmail.com',
  location: 'Pallipalayam, Erode, Tamil Nadu, India',
  business_hours: 'Monday–Saturday, 9:00 AM–8:00 PM IST',
  stated_capacity: '10 Lakh Metres per Month',
  experience_years: '25+ Years',
  tagline: 'Quality Woven. Global Reach.',
  supporting_statement: 'Your Fabric Requirements. Our Manufacturing Expertise. Quality You Expect, Prices You’ll Appreciate.',
};

/**
 * Initializes and retrieves cached data from LocalStorage
 */
export const getLocalStore = () => {
  if (typeof window === 'undefined') {
    return {
      fabrics: INITIAL_FABRICS,
      categories: VERIFIED_CATEGORIES,
      quotations: [] as Quotation[],
      settings: DEFAULT_SETTINGS,
    };
  }

  // Load Fabrics
  let fabrics = INITIAL_FABRICS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FABRICS);
    if (raw) fabrics = JSON.parse(raw);
    else localStorage.setItem(STORAGE_KEY_FABRICS, JSON.stringify(INITIAL_FABRICS));
  } catch {
    fabrics = INITIAL_FABRICS;
  }

  // Load Categories
  let categories = VERIFIED_CATEGORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (raw) categories = JSON.parse(raw);
    else localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(VERIFIED_CATEGORIES));
  } catch {
    categories = VERIFIED_CATEGORIES;
  }

  // Load Quotations
  let quotations: Quotation[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUOTATIONS);
    if (raw) {
      quotations = JSON.parse(raw);
    } else {
      // Seed one realistic demo quotation for review
      const sampleQuotation: Quotation = {
        id: 'quote-sample-1',
        reference_number: 'KT-2026-0812',
        customer_name: 'Rajesh Sharma',
        company_name: 'Apex Garments Export Ltd.',
        email: 'r.sharma@apexgarments.example.com',
        phone: '+91 9876543210',
        country: 'India',
        fabric_type: 'Cotton Poplin',
        quantity: '10,000 Metres',
        gsm: '120',
        width: '58 inches',
        pattern_colour: 'White & Sky Blue Solid',
        target_price: 'Competitive B2B bulk rate',
        message: 'Looking for prompt delivery of bleached white and pastel blue poplin shirting fabric for summer collection.',
        status: 'New',
        internal_notes: 'Initial inquiry via website. High-volume export prospect.',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      };
      quotations = [sampleQuotation];
      localStorage.setItem(STORAGE_KEY_QUOTATIONS, JSON.stringify(quotations));
    }
  } catch {
    quotations = [];
  }

  // Load Settings
  let settings = DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) settings = JSON.parse(raw);
    else localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  } catch {
    settings = DEFAULT_SETTINGS;
  }

  return { fabrics, categories, quotations, settings };
};

/**
 * Saves updated fabrics to local storage
 */
export const saveLocalFabrics = (fabrics: Fabric[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_FABRICS, JSON.stringify(fabrics));
  }
};

/**
 * Saves updated quotations to local storage
 */
export const saveLocalQuotations = (quotations: Quotation[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_QUOTATIONS, JSON.stringify(quotations));
  }
};

/**
 * Saves updated settings to local storage
 */
export const saveLocalSettings = (settings: OperationalSettings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }
};

/**
 * Simple local admin session manager for offline/local evaluations
 */
export const getLocalAdminSession = () => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY_AUTH);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setLocalAdminSession = (user: { email: string; role: string } | null) => {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  } else {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
  }
};
