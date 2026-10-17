import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { fabricService } from '../../services/fabricService';
import { Fabric } from '../../types';

export const AdminFabrics: React.FC = () => {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFabrics = async () => {
    setLoading(true);
    try {
      const items = await fabricService.getAllAdminFabrics();
      setFabrics(items);
    } catch (err) {
      console.error('Error fetching admin fabrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFabrics();
  }, []);

  const handleTogglePublish = async (fabric: Fabric) => {
    try {
      const updated = await fabricService.saveFabric({
        ...fabric,
        published: !fabric.published,
      });
      setFabrics((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    } catch (err) {
      console.error('Error toggling publish state:', err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete fabric "${name}"?`)) return;
    try {
      await fabricService.deleteFabric(id);
      setFabrics((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error('Error deleting fabric:', err);
    }
  };

  const filtered = fabrics.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.short_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
            Fabric Catalogue Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage fabric specifications, images, and public listing statuses.
          </p>
        </div>

        <Link
          to="/admin/fabrics/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Add New Fabric</span>
        </Link>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter fabrics by name, blend, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs text-navy-900 focus:outline-none bg-transparent"
        />
      </div>

      {/* Fabric Listings Table */}
      <div className="bg-white rounded-2xl border border-cream-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading fabric listings...</div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-cream-100 text-slate-600 uppercase tracking-wider text-[10px] border-b border-cream-200">
                  <th className="py-3 px-4 font-semibold">Fabric Details</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Specs (Blend / GSM)</th>
                  <th className="py-3 px-4 font-semibold">Pattern</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {filtered.map((fabric) => (
                  <tr key={fabric.id} className="hover:bg-cream-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={fabric.images?.[0]?.storage_path || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=200&q=80'}
                          alt={fabric.name}
                          className="w-12 h-12 rounded-lg object-cover border border-cream-300 flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-navy-900 text-sm">{fabric.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">/fabrics/{fabric.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-navy-900">
                      {fabric.category?.name || 'Unassigned'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-navy-900">{fabric.composition || '—'}</div>
                      <div className="text-[11px] text-slate-500">{fabric.gsm ? `${fabric.gsm} GSM` : '—'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {fabric.pattern || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(fabric)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                          fabric.published
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-cream-200 text-slate-600 hover:bg-cream-300'
                        }`}
                        title="Click to toggle published status"
                      >
                        {fabric.published ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/fabrics/${fabric.slug}`}
                          target="_blank"
                          className="p-1 text-slate-400 hover:text-navy-900"
                          title="Preview public fabric page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/fabrics/${fabric.id}/edit`}
                          className="p-1 text-slate-400 hover:text-gold-600"
                          title="Edit fabric"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(fabric.id, fabric.name)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Delete fabric"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-500">
            No fabrics found. Click "Add New Fabric" to create your first listing.
          </div>
        )}
      </div>
    </div>
  );
};
