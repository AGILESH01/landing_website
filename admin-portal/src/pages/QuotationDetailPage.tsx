import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Calendar,
  Save,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { Quotation, QuotationStatus } from '../types';

export const QuotationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<QuotationStatus>('New');
  const [notes, setNotes] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const data = await adminService.getQuotationById(id);
        if (data) {
          setQuotation(data);
          setStatus(data.status);
          setNotes(data.internal_notes || '');
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSave = async () => {
    if (!quotation) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      await Promise.all([
        adminService.updateQuotationStatus(quotation.id, status),
        adminService.updateQuotationNotes(quotation.id, notes),
      ]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save updates:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-xs text-slate-400">
        <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
        Loading quotation details...
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="p-12 text-center text-xs text-slate-400">
        <p className="mb-4">Quotation record not found.</p>
        <Link to="/quotations" className="text-gold-400 hover:underline">
          Return to Quotation List
        </Link>
      </div>
    );
  }

  const cleanPhone = quotation.phone.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/quotations"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inquiries</span>
        </Link>
        <div className="flex items-center gap-3">
          {cleanPhone && (
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Message on WhatsApp</span>
            </a>
          )}
          <a
            href={`mailto:${quotation.email}?subject=Quotation Enquiry ${quotation.reference_number} - Karthikeyan Textiles`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-semibold hover:bg-blue-600/30 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Reply via Email</span>
          </a>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-navy-900 rounded-3xl border border-white/10 overflow-hidden shadow-sm">
        {/* Card Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-950/40">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-2xl font-bold text-white">
                {quotation.reference_number}
              </h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-300 border border-gold-500/30">
                {status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Submitted on {new Date(quotation.created_at).toLocaleString()}</span>
            </p>
          </div>

          {/* Status Controls */}
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as QuotationStatus)}
              className="px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            >
              <option value="New">Status: New</option>
              <option value="Reviewing">Status: Reviewing</option>
              <option value="Quotation Sent">Status: Quotation Sent</option>
              <option value="Follow-up Required">Status: Follow-up Required</option>
              <option value="Completed">Status: Completed</option>
              <option value="Closed">Status: Closed</option>
            </select>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-semibold text-xs hover:bg-gold-400 transition-colors shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-3 bg-emerald-950/60 border-b border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 px-8">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Status and internal notes saved successfully to Supabase.</span>
          </div>
        )}

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buyer Profile */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
              Buyer & Contact Information
            </h2>
            <div className="bg-navy-950/60 p-5 rounded-2xl border border-white/5 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Full Name</span>
                <span className="font-semibold text-white">{quotation.customer_name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Company Name</span>
                <span className="font-semibold text-white">
                  {quotation.company_name || 'Not provided'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email Address</span>
                <span className="font-semibold text-gold-300">{quotation.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone / WhatsApp</span>
                <span className="font-semibold text-white font-mono">{quotation.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Country / Market</span>
                <span className="font-semibold text-white">{quotation.country}</span>
              </div>
            </div>
          </div>

          {/* Fabric Requirements */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
              Fabric Specifications Requested
            </h2>
            <div className="bg-navy-950/60 p-5 rounded-2xl border border-white/5 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Fabric Variety</span>
                <span className="font-semibold text-white">{quotation.fabric_type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Quantity Required</span>
                <span className="font-semibold text-gold-300 font-mono">
                  {quotation.quantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Weight (GSM)</span>
                <span className="font-semibold text-white">
                  {quotation.gsm || 'Unspecified'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Width</span>
                <span className="font-semibold text-white">
                  {quotation.width ? `${quotation.width}"` : 'Unspecified'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Price</span>
                <span className="font-semibold text-white">
                  {quotation.target_price || 'Open to quote'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message / Project Notes */}
        {quotation.message && (
          <div className="px-6 md:px-8 pb-6">
            <h2 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">
              Buyer's Remarks / Special Requirements
            </h2>
            <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 text-xs text-slate-200 leading-relaxed">
              {quotation.message}
            </div>
          </div>
        )}

        {/* Internal Staff Notes */}
        <div className="p-6 md:p-8 border-t border-white/10 bg-navy-950/30">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Private Internal Notes (Staff Only)
            </h2>
            <span className="text-[11px] text-slate-500">Not visible to the customer</span>
          </div>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record internal price calculations, lead time estimates, loom allocations, or follow-up logs..."
            className="w-full p-3.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>
      </div>
    </div>
  );
};
