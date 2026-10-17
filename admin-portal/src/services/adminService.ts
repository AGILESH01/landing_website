import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Quotation, QuotationStatus, Fabric, FabricCategory, OperationalSettings } from '../types';

export const adminService = {
  // ==========================================
  // QUOTATIONS
  // ==========================================
  async getQuotations(): Promise<Quotation[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('quotations')
          .select('*, attachments:quotation_attachments(*)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data as Quotation[];
        }
      } catch (err) {
        console.warn('Failed to load quotations from Supabase:', err);
      }
    }
    return [];
  },

  async getQuotationById(id: string): Promise<Quotation | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('quotations')
          .select('*, attachments:quotation_attachments(*)')
          .eq('id', id)
          .single();

        if (!error && data) {
          return data as Quotation;
        }
      } catch (err) {
        console.warn(`Failed to load quotation ${id}:`, err);
      }
    }
    return null;
  },

  async updateQuotationStatus(id: string, status: QuotationStatus): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('quotations')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id);

        return !error;
      } catch (err) {
        console.error('Failed to update status in Supabase:', err);
      }
    }
    return false;
  },

  async updateQuotationNotes(id: string, internal_notes: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('quotations')
          .update({ internal_notes, updated_at: new Date().toISOString() })
          .eq('id', id);

        return !error;
      } catch (err) {
        console.error('Failed to update notes in Supabase:', err);
      }
    }
    return false;
  },

  // ==========================================
  // FABRICS & CATEGORIES
  // ==========================================
  async getCategories(): Promise<FabricCategory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('fabric_categories')
          .select('*')
          .order('sort_order', { ascending: true });

        if (!error && data) return data as FabricCategory[];
      } catch (err) {
        console.warn('Failed to fetch categories:', err);
      }
    }
    return [
      { id: 'cat-cotton', name: 'Pure Cotton', slug: 'pure-cotton', description: '100% Cotton', sort_order: 1, is_active: true },
      { id: 'cat-blends', name: 'Cotton-Poly Blends', slug: 'cotton-poly-blends', description: 'Blends', sort_order: 2, is_active: true },
      { id: 'cat-poplin', name: 'Poplin', slug: 'poplin', description: 'Poplins', sort_order: 3, is_active: true },
      { id: 'cat-twill', name: 'Twill', slug: 'twill', description: 'Twills', sort_order: 4, is_active: true },
      { id: 'cat-checks', name: 'Checks & Stripes', slug: 'checks-stripes', description: 'Checks', sort_order: 5, is_active: true },
      { id: 'cat-yarndyed', name: 'Yarn-Dyed', slug: 'yarn-dyed', description: 'Yarn dyed', sort_order: 6, is_active: true },
      { id: 'cat-speciality', name: 'Speciality Wovens', slug: 'speciality-wovens', description: 'Speciality', sort_order: 7, is_active: true },
    ];
  },

  async getFabrics(): Promise<Fabric[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('fabrics')
          .select('*, fabric_categories(name)')
          .order('sort_order', { ascending: true });

        if (!error && data) {
          return data.map((item: any) => ({
            ...item,
            category_name: item.fabric_categories?.name || 'Woven Fabric',
          })) as Fabric[];
        }
      } catch (err) {
        console.warn('Failed to fetch fabrics from Supabase:', err);
      }
    }
    return [];
  },

  async getFabricById(id: string): Promise<Fabric | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('fabrics')
          .select('*, fabric_categories(name)')
          .eq('id', id)
          .single();

        if (!error && data) {
          return {
            ...data,
            category_name: (data as any).fabric_categories?.name,
          } as Fabric;
        }
      } catch (err) {
        console.warn(`Failed to fetch fabric ${id}:`, err);
      }
    }
    return null;
  },

  async saveFabric(fabricData: Partial<Fabric>): Promise<Fabric> {
    if (!fabricData.name) throw new Error('Fabric Name is required.');
    const slug = fabricData.slug || fabricData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      if (fabricData.id) {
        // Update
        const { data, error } = await supabase
          .from('fabrics')
          .update({
            ...fabricData,
            slug,
            updated_at: now,
          })
          .eq('id', fabricData.id)
          .select()
          .single();

        if (error) throw error;
        return data as Fabric;
      } else {
        // Insert
        const { data, error } = await supabase
          .from('fabrics')
          .insert([{
            ...fabricData,
            slug,
            created_at: now,
            updated_at: now,
          }])
          .select()
          .single();

        if (error) throw error;
        return data as Fabric;
      }
    }

    throw new Error('Supabase is not configured to save fabrics.');
  },

  async deleteFabric(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('fabrics')
        .delete()
        .eq('id', id);

      return !error;
    }
    return false;
  },

  // ==========================================
  // OPERATIONAL SETTINGS
  // ==========================================
  getSettings(): OperationalSettings {
    return {
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
  },
};
