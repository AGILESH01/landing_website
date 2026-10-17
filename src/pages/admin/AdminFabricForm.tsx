import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { fabricService } from '../../services/fabricService';
import { Fabric, FabricCategory } from '../../types';
import { PATTERN_OPTIONS, APPLICATION_OPTIONS } from '../../data/seedData';

export const AdminFabricForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState<FabricCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Fabric>>({
    name: '',
    slug: '',
    category_id: 'cat-1',
    short_description: '',
    description: '',
    composition: '',
    gsm: 120,
    width: '58 inches',
    yarn_count: '',
    construction: '',
    pattern: 'Plain or solid colours',
    applications: ['Shirts and casual wear'],
    customization_available: true,
    sample_available: true,
    featured: false,
    published: true,
    sort_order: 1,
  });

  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
  );

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const cats = await fabricService.getCategories();
        setCategories(cats);

        if (isEditing && id) {
          const all = await fabricService.getAllAdminFabrics();
          const target = all.find((f) => f.id === id);
          if (target) {
            setFormData(target);
            if (target.images?.[0]?.storage_path) {
              setImageUrl(target.images[0].storage_path);
            }
          }
        }
      } catch (err) {
        console.error('Failed to initialize form:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplicationToggle = (app: string) => {
    const current = formData.applications || [];
    if (current.includes(app)) {
      setFormData((prev) => ({
        ...prev,
        applications: current.filter((a) => a !== app),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        applications: [...current, app],
      }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: prev.slug && isEditing ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name?.trim()) {
      setErrorMsg('Fabric Name is required.');
      return;
    }

    try {
      await fabricService.saveFabric({
        ...formData,
        id: isEditing ? id : undefined,
        images: [
          {
            id: `img-${Date.now()}`,
            fabric_id: id || `fab-${Date.now()}`,
            storage_path: imageUrl.trim(),
            alt_text: formData.name || 'Woven Fabric Texture',
            sort_order: 1,
          },
        ],
      });

      navigate('/admin/fabrics');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save fabric.';
      setErrorMsg(msg);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-slate-500">
        Loading fabric details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/admin/fabrics"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Fabric Listings</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm">
        <div className="border-b border-cream-200 pb-4 mb-6">
          <h1 className="font-serif text-2xl font-bold text-navy-900">
            {isEditing ? `Edit Fabric: ${formData.name}` : 'Add New Fabric Listing'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ensure technical specifications entered here are verified with production management.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Fabric Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={handleNameChange}
                placeholder="e.g. 100% Pure Cotton Poplin"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="pure-cotton-poplin"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id || 'cat-1'}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Pattern
              </label>
              <select
                name="pattern"
                value={formData.pattern || 'Plain or solid colours'}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
              >
                {PATTERN_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Short Description (Card Summary)
            </label>
            <input
              type="text"
              name="short_description"
              value={formData.short_description || ''}
              onChange={handleChange}
              placeholder="Crisp plain-weave cotton shirting fabric with balanced warp/weft density."
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Full Editorial Description
            </label>
            <textarea
              rows={3}
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Detailed description of hand-feel, yarn selection, and garment manufacturing suitability..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
            />
          </div>

          {/* Image URL preview */}
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Main Swatch Image URL / Storage Path
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... or Supabase storage path"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40 font-mono"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-10 h-10 rounded-lg object-cover border border-cream-300"
                />
              )}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="border-t border-cream-200 pt-5">
            <h3 className="font-serif text-base font-bold text-navy-900 mb-3">
              Verified Technical Attributes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Composition / Blend
                </label>
                <input
                  type="text"
                  name="composition"
                  value={formData.composition || ''}
                  onChange={handleChange}
                  placeholder="e.g. 100% Cotton"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Fabric Weight (GSM)
                </label>
                <input
                  type="number"
                  name="gsm"
                  value={formData.gsm || ''}
                  onChange={handleChange}
                  placeholder="120"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Width
                </label>
                <input
                  type="text"
                  name="width"
                  value={formData.width || ''}
                  onChange={handleChange}
                  placeholder="58 inches"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Yarn Count
                </label>
                <input
                  type="text"
                  name="yarn_count"
                  value={formData.yarn_count || ''}
                  onChange={handleChange}
                  placeholder="40s x 40s"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Weave Construction
                </label>
                <input
                  type="text"
                  name="construction"
                  value={formData.construction || ''}
                  onChange={handleChange}
                  placeholder="Plain Weave / 2/1 Twill"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
                />
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="border-t border-cream-200 pt-5">
            <label className="block text-xs font-semibold text-navy-900 mb-2">
              Application Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {APPLICATION_OPTIONS.map((app) => {
                const active = formData.applications?.includes(app);
                return (
                  <button
                    key={app}
                    type="button"
                    onClick={() => handleApplicationToggle(app)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-cream-100 text-slate-700 border-cream-300 hover:bg-cream-200'
                    }`}
                  >
                    {app}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggles */}
          <div className="border-t border-cream-200 pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900">
              <input
                type="checkbox"
                name="sample_available"
                checked={formData.sample_available ?? true}
                onChange={handleChange}
                className="rounded border-cream-300 text-gold-600 focus:ring-gold-500"
              />
              <span>Sample Swatches Available</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900">
              <input
                type="checkbox"
                name="customization_available"
                checked={formData.customization_available ?? true}
                onChange={handleChange}
                className="rounded border-cream-300 text-gold-600 focus:ring-gold-500"
              />
              <span>Custom Weaving Available</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured ?? false}
                onChange={handleChange}
                className="rounded border-cream-300 text-gold-600 focus:ring-gold-500"
              />
              <span>Featured on Homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-navy-900">
              <input
                type="checkbox"
                name="published"
                checked={formData.published ?? true}
                onChange={handleChange}
                className="rounded border-cream-300 text-gold-600 focus:ring-gold-500"
              />
              <span>Published (Publicly Visible)</span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="border-t border-cream-200 pt-6 flex items-center justify-end gap-3">
            <Link
              to="/admin/fabrics"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-cream-100 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4 text-gold-400" />
              <span>Save Fabric Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
