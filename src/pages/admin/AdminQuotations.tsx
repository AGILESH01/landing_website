import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Paperclip } from 'lucide-react';
import { quotationService } from '../../services/quotationService';
import { Quotation, QuotationStatus } from '../../types';

export const AdminQuotations: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const data = await quotationService.getQuotations(statusFilter);
      setQuotations(data);
    } catch (err) {
      console.error('Failed to load quotations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [statusFilter]);

  const filtered = quotations.filter((q) =>
    q.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    (q.company_name && q.company_name.toLowerCase().includes(search.toLowerCase())) ||
    q.reference_number.toLowerCase().includes(search.toLowerCase()) ||
    q.fabric_type.toLowerCase().includes(search.toLowerCase()) ||
    q.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
          Commercial Quotation Enquiries
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review, update commercial status, and track buyer follow-up communications.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, company, ref #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Filter Status:</span>
          {(['all', 'New', 'Reviewing', 'Quotation Sent', 'Follow-up Required', 'Completed', 'Closed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-navy-900 text-white font-bold'
                  : 'bg-cream-100 text-slate-600 hover:bg-cream-200'
              }`}
            >
              {st === 'all' ? 'All Inquiries' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-2xl border border-cream-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading quotation database...</div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-cream-100 text-slate-600 uppercase tracking-wider text-[10px] border-b border-cream-200">
                  <th className="py-3 px-4 font-semibold">Ref #</th>
                  <th className="py-3 px-4 font-semibold">Buyer / Organisation</th>
                  <th className="py-3 px-4 font-semibold">Fabric Requested</th>
                  <th className="py-3 px-4 font-semibold">Quantity</th>
                  <th className="py-3 px-4 font-semibold">Country</th>
                  <th className="py-3 px-4 font-semibold">Files</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-cream-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900 whitespace-nowrap">
                      {q.reference_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-900 text-sm">{q.customer_name}</div>
                      <div className="text-[11px] text-slate-500">
                        {q.company_name ? `${q.company_name} • ` : ''}
                        {q.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-navy-900">
                      <div>{q.fabric_type}</div>
                      {q.composition && (
                        <div className="text-[10px] text-slate-500">{q.composition}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-navy-900">
                      {q.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {q.country}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {q.attachments && q.attachments.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-gold-700 font-medium">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>{q.attachments.length}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          q.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : q.status === 'Reviewing'
                            ? 'bg-blue-100 text-blue-800'
                            : q.status === 'Quotation Sent'
                            ? 'bg-purple-100 text-purple-800'
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
                        className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-gold-600 underline"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-500">
            No quotation requests matching the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};
