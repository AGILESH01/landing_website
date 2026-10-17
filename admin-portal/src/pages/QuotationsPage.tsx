import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Search,
  ArrowUpRight,
  Paperclip,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { Quotation } from '../types';

export const QuotationsPage: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await adminService.getQuotations();
        setQuotations(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statuses = ['ALL', 'New', 'Reviewing', 'Quotation Sent', 'Follow-up Required', 'Completed', 'Closed'];

  const filtered = quotations.filter((q) => {
    const matchStatus = statusFilter === 'ALL' || q.status === statusFilter;
    const matchSearch =
      q.reference_number.toLowerCase().includes(search.toLowerCase()) ||
      q.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      (q.company_name && q.company_name.toLowerCase().includes(search.toLowerCase())) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.country.toLowerCase().includes(search.toLowerCase()) ||
      q.fabric_type.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  const statusColor: Record<string, string> = {
    New: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Reviewing: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Quotation Sent': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Follow-up Required': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Completed: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    Closed: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
          Quotation Inquiries & RFQs
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, track, and manage commercial fabric inquiries submitted through the website.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-navy-900 border border-white/10">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference, buyer, company, country, fabric..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-gold-500 text-navy-950 font-semibold'
                  : 'bg-navy-950 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotation Table */}
      <div className="bg-navy-900 rounded-3xl border border-white/10 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center text-xs text-slate-400">
            <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
            Loading quotation records from Supabase...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-xs text-slate-400">
            <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            No inquiries match your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950/60 text-slate-400 border-b border-white/5 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Reference & Date</th>
                  <th className="py-3.5 px-6">Buyer Details</th>
                  <th className="py-3.5 px-6">Fabric Specs</th>
                  <th className="py-3.5 px-6">Quantity & Target</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-mono text-gold-400 font-semibold">
                        {q.reference_number}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(q.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{q.customer_name}</div>
                      <div className="text-[11px] text-slate-400">
                        {q.company_name ? `${q.company_name} • ` : ''}
                        {q.country}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{q.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{q.fabric_type}</div>
                      <div className="text-[11px] text-slate-400">
                        {q.composition ? `${q.composition} • ` : ''}
                        {q.gsm ? `${q.gsm} GSM` : ''}
                      </div>
                      {q.attachments && q.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-gold-400 mt-1">
                          <Paperclip className="w-3 h-3" />
                          <span>{q.attachments.length} attachment(s)</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{q.quantity}</div>
                      <div className="text-[11px] text-slate-400">
                        {q.target_price ? `Target: ${q.target_price}` : 'No target given'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          statusColor[q.status] || 'bg-slate-500/20 text-slate-300'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/quotations/${q.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-gold-500/20 text-gold-400 text-xs font-semibold transition-colors border border-white/5"
                      >
                        <span>Manage</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
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
