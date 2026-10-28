import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { Quotation, Fabric } from '../types';

export const DashboardPage: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [quotesData, fabricsData] = await Promise.all([
          adminService.getQuotations(),
          adminService.getFabrics(),
        ]);
        setQuotations(quotesData);
        setFabrics(fabricsData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const pendingQuotes = quotations.filter(
    (q) => q.status === 'New' || q.status === 'Reviewing'
  ).length;

  const statusColor: Record<string, string> = {
    New: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Reviewing: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Quotation Sent': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Follow-up Required': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Completed: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    Closed: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            Executive Operations Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline monitoring for fabric production & client quotations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/fabrics/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-semibold text-xs hover:bg-gold-400 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Fabric</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-navy-900 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Pending RFQs</span>
            <Inbox className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-white">
            {loading ? '...' : pendingQuotes}
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Requires review or response</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Total RFQ Pipeline</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-white">
            {loading ? '...' : quotations.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Lifetime inquiries received</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Catalogue Fabrics</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-white">
            {loading ? '...' : fabrics.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            <span>Varieties active in digital showroom</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Production Benchmark</span>
            <TrendingUp className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-gold-300">
            2 Lakh Metres
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            <span>Stated monthly capacity</span>
          </p>
        </div>
      </div>

      {/* Recent RFQs Section */}
      <div className="bg-navy-900 rounded-3xl border border-white/10 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-white">
              Recent Buyer RFQs & Inquiries
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live customer requests from domestic and international markets.
            </p>
          </div>
          <Link
            to="/quotations"
            className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1"
          >
            <span>View All ({quotations.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">
            <div className="w-6 h-6 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
            Loading real-time records...
          </div>
        ) : quotations.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            No inquiries received yet. When a customer submits an RFQ on the public website, it will appear here instantly.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950/60 text-slate-400 border-b border-white/5 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Reference</th>
                  <th className="py-3.5 px-6">Buyer & Country</th>
                  <th className="py-3.5 px-6">Fabric Requested</th>
                  <th className="py-3.5 px-6">Quantity</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {quotations.slice(0, 5).map((q) => (
                  <tr key={q.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-gold-400 font-medium">
                      {q.reference_number}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{q.customer_name}</div>
                      <div className="text-[11px] text-slate-400">
                        {q.company_name ? `${q.company_name} • ` : ''}
                        {q.country}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-white font-medium">{q.fabric_type}</div>
                      <div className="text-[11px] text-slate-400">
                        {q.gsm ? `${q.gsm} GSM • ` : ''}
                        {q.width ? `${q.width}" Width` : ''}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-200">{q.quantity}</td>
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
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300"
                      >
                        <span>Review</span>
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
