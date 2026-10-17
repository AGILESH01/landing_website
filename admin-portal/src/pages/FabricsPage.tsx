import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  EyeOff,
  Eye,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { Fabric, FabricCategory } from '../types';

export const FabricsPage: React.FC = () => {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [categories, setCategories] = useState<FabricCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const [fabData, catData] = await Promise.all([
        adminService.getFabrics(),
        adminService.getCategories(),
      ]);
      setFabrics(fabData);
      setCategories(catData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete fabric "${name}"?`)) {
      const ok = await adminService.deleteFabric(id);
      if (ok) {
        setFabrics((prev) => prev.filter((f) => f.id !== id));
      }
    }
  };

  const filtered = fabrics.filter((f) => {
    const matchCat = selectedCat === 'ALL' || f.category_id === selectedCat;
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.composition.toLowerCase().includes(search.toLowerCase()) ||
      (f.category_name && f.category_name.toLowerCase().includes(search.toLowerCase()));

    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            Fabric Varieties Catalogue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your digital showroom listings, technical specifications, and sample availability.
          </p>
        </div>
        <Link
          to="/fabrics/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-semibold text-xs hover:bg-gold-400 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Fabric</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-navy-900 border border-white/10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabrics by title, blend, composition..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        >
          <option value="ALL">All Fabric Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Fabrics Table */}
      <div className="bg-navy-900 rounded-3xl border border-white/10 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center text-xs text-slate-400">
            <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
            Loading fabric catalogue from Supabase...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-xs text-slate-400">
            <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            No fabrics match your criteria. Click "Add New Fabric" to create your first listing.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950/60 text-slate-400 border-b border-white/5 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Fabric Name & Category</th>
                  <th className="py-3.5 px-6">Composition</th>
                  <th className="py-3.5 px-6">Weight & Width</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filtered.map((f) => (
                  <tr key={f.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{f.name}</div>
                      <div className="text-[11px] text-gold-400">
                        {f.category_name || 'Woven Fabric'}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-medium">
                      {f.composition || '—'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-white font-medium">
                        {f.gsm ? `${f.gsm} GSM` : '—'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {f.width ? `${f.width}"` : '—'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {f.published ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <Eye className="w-3 h-3" />
                          <span>Published</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-500/20 text-slate-400 border border-slate-500/30">
                          <EyeOff className="w-3 h-3" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/fabrics/${f.id}/edit`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-gold-500/20 text-gold-400 transition-colors"
                          title="Edit Fabric"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(f.id, f.name)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete Fabric"
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
        )}
      </div>
    </div>
  );
};
