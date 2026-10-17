import { supabase, isSupabaseConfigured, getLocalStore, saveLocalFabrics } from '../lib/supabase';
import { Fabric, FabricCategory, CatalogueFilterState } from '../types';

export const fabricService = {
  /**
   * Fetches published fabrics, applying search, category, pattern, and application filters
   */
  async getFabrics(filters?: Partial<CatalogueFilterState>): Promise<Fabric[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from('fabrics')
          .select(`
            *,
            category:fabric_categories(*),
            images:fabric_images(*)
          `)
          .eq('published', true);

        if (filters?.searchQuery) {
          query = query.or(`name.ilike.%${filters.searchQuery}%,short_description.ilike.%${filters.searchQuery}%`);
        }

        if (filters?.categorySlug && filters.categorySlug !== 'all') {
          // Filter by category slug via join
          query = query.eq('category.slug', filters.categorySlug);
        }

        if (filters?.pattern && filters.pattern !== 'all') {
          query = query.eq('pattern', filters.pattern);
        }

        const { data, error } = await query;
        if (!error && data) {
          let list = data as Fabric[];
          if (filters?.application && filters.application !== 'all') {
            list = list.filter(f => f.applications?.includes(filters.application!));
          }
          return this.sortFabrics(list, filters?.sortBy);
        }
      } catch (err) {
        console.warn('Falling back to local fabric repository:', err);
      }
    }

    // Fallback to local store
    const { fabrics } = getLocalStore();
    let filtered = fabrics.filter(f => f.published);

    if (filters?.searchQuery?.trim()) {
      const q = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.short_description.toLowerCase().includes(q) ||
        f.composition?.toLowerCase().includes(q) ||
        f.pattern?.toLowerCase().includes(q)
      );
    }

    if (filters?.categorySlug && filters.categorySlug !== 'all') {
      const { categories } = getLocalStore();
      const cat = categories.find(c => c.slug === filters.categorySlug);
      if (cat) {
        filtered = filtered.filter(f => f.category_id === cat.id);
      }
    }

    if (filters?.pattern && filters.pattern !== 'all') {
      filtered = filtered.filter(f => f.pattern === filters.pattern);
    }

    if (filters?.application && filters.application !== 'all') {
      filtered = filtered.filter(f => f.applications?.includes(filters.application!));
    }

    return this.sortFabrics(filtered, filters?.sortBy);
  },

  /**
   * Sorts fabric list by specified criterion
   */
  sortFabrics(fabrics: Fabric[], sortBy?: CatalogueFilterState['sortBy']): Fabric[] {
    const list = [...fabrics];
    switch (sortBy) {
      case 'name_asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  },

  /**
   * Retrieves single fabric by slug
   */
  async getFabricBySlug(slug: string): Promise<Fabric | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('fabrics')
          .select(`
            *,
            category:fabric_categories(*),
            images:fabric_images(*)
          `)
          .eq('slug', slug)
          .single();

        if (!error && data) return data as Fabric;
      } catch (err) {
        console.warn('Fallback to local fabric slug lookup:', err);
      }
    }

    const { fabrics, categories } = getLocalStore();
    const fabric = fabrics.find(f => f.slug === slug);
    if (!fabric) return null;

    const cat = categories.find(c => c.id === fabric.category_id);
    return { ...fabric, category: cat };
  },

  /**
   * Fetches active fabric categories
   */
  async getCategories(): Promise<FabricCategory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('fabric_categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (!error && data) return data as FabricCategory[];
      } catch (err) {
        console.warn('Fallback to local categories lookup:', err);
      }
    }

    const { categories } = getLocalStore();
    return categories.filter(c => c.is_active).sort((a, b) => a.sort_order - b.sort_order);
  },

  /**
   * Admin: Get all fabrics (including unpublished)
   */
  async getAllAdminFabrics(): Promise<Fabric[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('fabrics')
          .select(`*, category:fabric_categories(*), images:fabric_images(*)`)
          .order('sort_order', { ascending: true });

        if (!error && data) return data as Fabric[];
      } catch (err) {
        console.warn('Fallback to local all fabrics:', err);
      }
    }

    const { fabrics, categories } = getLocalStore();
    return fabrics.map(f => ({
      ...f,
      category: categories.find(c => c.id === f.category_id),
    }));
  },

  /**
   * Admin: Save or update a fabric product
   */
  async saveFabric(fabricData: Partial<Fabric> & { id?: string }): Promise<Fabric> {
    const isNew = !fabricData.id;
    const now = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          const { data, error } = await supabase
            .from('fabrics')
            .insert([{ ...fabricData, created_at: now, updated_at: now }])
            .select()
            .single();
          if (error) throw error;
          return data as Fabric;
        } else {
          const { data, error } = await supabase
            .from('fabrics')
            .update({ ...fabricData, updated_at: now })
            .eq('id', fabricData.id)
            .select()
            .single();
          if (error) throw error;
          return data as Fabric;
        }
      } catch (err) {
        console.warn('Database save failed, using local store:', err);
      }
    }

    // Local storage persistence
    const { fabrics } = getLocalStore();
    let updatedFabrics = [...fabrics];
    let saved: Fabric;

    if (isNew) {
      saved = {
        id: `fab-${Date.now()}`,
        name: fabricData.name || 'Untitled Fabric',
        slug: fabricData.slug || `fabric-${Date.now()}`,
        category_id: fabricData.category_id || 'cat-1',
        short_description: fabricData.short_description || '',
        description: fabricData.description || '',
        composition: fabricData.composition || null,
        gsm: fabricData.gsm || null,
        width: fabricData.width || null,
        yarn_count: fabricData.yarn_count || null,
        construction: fabricData.construction || null,
        pattern: fabricData.pattern || 'Plain or solid colours',
        applications: fabricData.applications || [],
        customization_available: fabricData.customization_available ?? true,
        sample_available: fabricData.sample_available ?? true,
        featured: fabricData.featured ?? false,
        published: fabricData.published ?? true,
        is_demo: false,
        sort_order: fabricData.sort_order ?? (fabrics.length + 1),
        images: fabricData.images || [],
        created_at: now,
        updated_at: now,
      };
      updatedFabrics.unshift(saved);
    } else {
      const idx = updatedFabrics.findIndex(f => f.id === fabricData.id);
      if (idx === -1) throw new Error('Fabric not found');
      saved = {
        ...updatedFabrics[idx],
        ...fabricData,
        updated_at: now,
      };
      updatedFabrics[idx] = saved;
    }

    saveLocalFabrics(updatedFabrics);
    return saved;
  },

  /**
   * Admin: Delete fabric product
   */
  async deleteFabric(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('fabrics').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Database delete failed, using local store:', err);
      }
    }

    const { fabrics } = getLocalStore();
    const filtered = fabrics.filter(f => f.id !== id);
    saveLocalFabrics(filtered);
    return true;
  }
};
