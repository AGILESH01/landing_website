import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Layers, Clock, ArrowRight, FileText } from 'lucide-react';
import { quotationService } from '../../services/quotationService';
import { fabricService } from '../../services/fabricService';
import { Quotation, Fabric } from '../../types';

export const AdminOverview: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const [quotes, items] = await Promise.all([
          quotationService.getQuotations('all'),
          fabricService.getAllAdminFabrics(),
        ]);
        setQuotations(quotes);
        setFabrics(items);
      } catch (err) {
        console.error('Error fetching admin dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const totalEnquiries = quotations.length;
  const newEnquiries = quotations.filter((q) => q.status === 'New').length;
  const reviewingEnquiries = quotations.filter((q) => q.status === 'Reviewing').length;
  const activeFabrics = fabrics.filter((f) => f.published).length;

  const recentQuotations = quotations.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
            Operations & Enquiries Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time commercial metrics recorded in the database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/fabrics/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-gold-400" />
            <span>Add New Fabric</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Enquiries</span>
            <span className="text-2xl font-serif font-bold text-navy-900 mt-1 block">
              {loading ? '...' : totalEnquiries}
            </span>
            <span className="text-[11px] text-slate-400">All registered quotes</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: New Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-700 font-medium block">New Enquiries</span>
            <span className="text-2xl font-serif font-bold text-amber-600 mt-1 block">
              {loading ? '...' : newEnquiries}
            </span>
            <span className="text-[11px] text-amber-600/70">Awaiting commercial review</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: In Review */}
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Under Review</span>
            <span className="text-2xl font-serif font-bold text-navy-900 mt-1 block">
              {loading ? '...' : reviewingEnquiries}
            </span>
            <span className="text-[11px] text-slate-400">Yarn & costing in progress</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Active Fabrics */}
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Published Fabrics</span>
            <span className="text-2xl font-serif font-bold text-navy-900 mt-1 block">
              {loading ? '...' : activeFabrics}
            </span>
            <span className="text-[11px] text-slate-400">Live in catalogue</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-cream-300 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-cream-200 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-navy-900">
              Recent Quotation Requests
            </h2>
            <p className="text-xs text-slate-500">
              Incoming prospective buyer enquiries requiring commercial follow-up.
            </p>
          </div>
          <Link
            to="/admin/quotations"
            className="text-xs font-semibold text-gold-600 hover:text-gold-700 inline-flex items-center gap-1"
          >
            <span>View All ({quotations.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading database records...</div>
        ) : recentQuotations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-cream-100 text-slate-600 uppercase tracking-wider text-[10px] border-b border-cream-200">
                  <th className="py-3 px-4 font-semibold">Ref #</th>
                  <th className="py-3 px-4 font-semibold">Customer / Company</th>
                  <th className="py-3 px-4 font-semibold">Fabric Requested</th>
                  <th className="py-3 px-4 font-semibold">Quantity</th>
                  <th className="py-3 px-4 font-semibold">Country</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {recentQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-cream-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900">
                      {q.reference_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-navy-900">{q.customer_name}</div>
                      {q.company_name && (
                        <div className="text-[11px] text-slate-500">{q.company_name}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-navy-900">
                      {q.fabric_type}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {q.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {q.country}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          q.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : q.status === 'Reviewing'
                            ? 'bg-blue-100 text-blue-800'
                            : q.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-cream-200 text-slate-700'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/quotations/${q.id}`}
                        className="text-xs font-semibold text-navy-900 hover:text-gold-600 underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500">
            No quotation requests recorded yet.
          </div>
        )}
      </div>
    </div>
  );
};
