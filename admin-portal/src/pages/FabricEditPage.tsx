import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { adminService } from '../services/adminService';
import { Fabric, FabricCategory } from '../types';

export const FabricEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState<FabricCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Fabric>>({
    name: '',
    slug: '',
    category_id: 'cat-cotton',
    short_description: '',
    description: '',
    composition: '100% Combed Cotton',
    gsm: 120,
    width: '58',
    yarn_count: '40s x 40s',
    construction: 'Plain Weave',
    pantone_reference: '',
    pantone_guide: 'Coated (C)',
    customization_available: true,
    sample_available: true,
    featured: false,
    published: true,
    applications: ['Shirting', 'Casual Wear'],
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const catData = await adminService.getCategories();
        setCategories(catData);

        if (id) {
          const fab = await adminService.getFabricById(id);
          if (fab) {
            setForm(fab);
          }
        }
      } catch (err) {
        console.error('Failed to load fabric details:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSaving(true);

    try {
      if (!form.name?.trim()) throw new Error('Fabric Name is required.');
      if (!form.short_description?.trim()) throw new Error('Short description is required.');

      await adminService.saveFabric(form);
      navigate('/fabrics');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save fabric.';
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
        Loading fabric form...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/fabrics"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>

      <div className="bg-navy-900 rounded-3xl border border-white/10 overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 border-b border-white/10 bg-navy-950/40">
          <h1 className="font-serif text-2xl font-bold text-white">
            {isEditing ? `Edit Fabric: ${form.name}` : 'Add New Fabric Variety'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Specify technical weave properties, verified GSM, composition, and Pantone references.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-950/80 border-b border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 px-8">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Fabric Variety Name *
              </label>
              <input
                type="text"
                required
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Premium 40s Cotton Poplin"
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Fabric Category *
              </label>
              <select
                value={form.category_id || ''}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Short Summary Description *
            </label>
            <input
              type="text"
              required
              value={form.short_description || ''}
              onChange={(e) => setForm({ ...form, short_description: e.target.value })}
              placeholder="e.g., Fine lightweight plain weave for executive formal shirting."
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            />
          </div>

          {/* Technical Specs */}
          <div className="pt-4 border-t border-white/10">
            <h2 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Composition</label>
                <input
                  type="text"
                  value={form.composition || ''}
                  onChange={(e) => setForm({ ...form, composition: e.target.value })}
                  placeholder="e.g., 100% Cotton"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Weight (GSM)</label>
                <input
                  type="number"
                  value={form.gsm || ''}
                  onChange={(e) => setForm({ ...form, gsm: Number(e.target.value) })}
                  placeholder="e.g., 120"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Width (Inches)</label>
                <input
                  type="text"
                  value={form.width || ''}
                  onChange={(e) => setForm({ ...form, width: e.target.value })}
                  placeholder="e.g., 58"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Yarn Count</label>
                <input
                  type="text"
                  value={form.yarn_count || ''}
                  onChange={(e) => setForm({ ...form, yarn_count: e.target.value })}
                  placeholder="e.g., 40s x 40s"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Pantone & Colour Reference */}
          <div className="pt-4 border-t border-white/10">
            <h2 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Colour & Pantone Reference (Physical Book)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Pantone Code (from physical guide)
                </label>
                <input
                  type="text"
                  value={form.pantone_reference || ''}
                  onChange={(e) => setForm({ ...form, pantone_reference: e.target.value })}
                  placeholder="e.g., 19-4052 TCX or leave blank if pending"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Pantone Guide Type</label>
                <select
                  value={form.pantone_guide || 'Coated (C)'}
                  onChange={(e) => setForm({ ...form, pantone_guide: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none"
                >
                  <option value="Coated (C)">Formula Guide Coated (C)</option>
                  <option value="Uncoated (U)">Formula Guide Uncoated (U)</option>
                  <option value="Fashion, Home + Interiors (TCX)">Fashion, Home + Interiors (TCX Cotton)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 rounded text-gold-500 focus:ring-0 bg-navy-950 border-white/20"
              />
              <span className="font-semibold text-white">Publish on Live Showroom</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={form.sample_available}
                onChange={(e) => setForm({ ...form, sample_available: e.target.checked })}
                className="w-4 h-4 rounded text-gold-500 focus:ring-0 bg-navy-950 border-white/20"
              />
              <span>Fabric Swatch Sample Available</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={form.customization_available}
                onChange={(e) => setForm({ ...form, customization_available: e.target.checked })}
                className="w-4 h-4 rounded text-gold-500 focus:ring-0 bg-navy-950 border-white/20"
              />
              <span>Custom Weaving Available</span>
            </label>
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
            <Link
              to="/fabrics"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-semibold text-xs hover:bg-gold-400 transition-colors shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Fabric Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
