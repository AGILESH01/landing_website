import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Save,
  CheckCircle2,
  Paperclip,
  Download
} from 'lucide-react';
import { quotationService } from '../../services/quotationService';
import { Quotation, QuotationStatus } from '../../types';

export const AdminQuotationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [status, setStatus] = useState<QuotationStatus>('New');
  const [internalNotes, setInternalNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const quotes = await quotationService.getQuotations('all');
        const target = quotes.find((q) => q.id === id);
        if (target) {
          setQuotation(target);
          setStatus(target.status);
          setInternalNotes(target.internal_notes || '');
        }
      } catch (err) {
        console.error('Failed to load quotation detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleSaveStatusAndNotes = async () => {
    if (!quotation) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      const updated = await quotationService.updateQuotationStatus(
        quotation.id,
        status,
        internalNotes
      );
      setQuotation(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-slate-500">
        Loading enquiry details...
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-cream-300 text-center">
        <h2 className="font-serif text-xl font-bold text-navy-900 mb-2">Enquiry Not Found</h2>
        <p className="text-xs text-slate-500 mb-4">The requested quotation ID could not be located.</p>
        <Link
          to="/admin/quotations"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-navy-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Quotations List</span>
        </Link>
      </div>
    );
  }

  // Pre-generate WhatsApp click-to-chat URL for buyer follow-up
  const cleanPhone = quotation.phone.replace(/[^0-9]/g, '');
  const buyerWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${quotation.customer_name},\n\nThis is regarding your fabric enquiry (${quotation.reference_number}) with Karthikeyan Textiles for ${quotation.fabric_type}.\n\nWe have reviewed your requirements and would like to share the production schedule and pricing.`
  )}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link
          to="/admin/quotations"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Inquiries</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cream-200 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Commercial Inquiry
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-cream-100 font-bold text-navy-900 border border-cream-300">
                {quotation.reference_number}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mt-1">
              {quotation.customer_name}
            </h1>
            {quotation.company_name && (
              <p className="text-xs text-slate-500 font-medium">{quotation.company_name}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${quotation.email}?subject=Karthikeyan Textiles - Quotation ${quotation.reference_number}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-navy-900 border border-cream-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-gold-600" />
              <span>Email Buyer</span>
            </a>
            <a
              href={buyerWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer & Delivery Information */}
          <div className="space-y-4">
            <h2 className="font-serif text-base font-bold text-navy-900 border-b border-cream-200 pb-2">
              Buyer Details
            </h2>
            <div className="divide-y divide-cream-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Customer Name:</span>
                <span className="font-bold text-navy-900">{quotation.customer_name}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Company Name:</span>
                <span className="text-navy-900">{quotation.company_name || 'Not provided'}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Email:</span>
                <a href={`mailto:${quotation.email}`} className="text-navy-900 hover:underline">
                  {quotation.email}
                </a>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Phone / WhatsApp:</span>
                <a href={`tel:${quotation.phone}`} className="text-navy-900 hover:underline font-mono">
                  {quotation.phone}
                </a>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Country / Destination:</span>
                <span className="font-bold text-navy-900">{quotation.country}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Registered At:</span>
                <span className="text-slate-600 font-mono">
                  {new Date(quotation.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Requested Fabric Specifications */}
          <div className="space-y-4">
            <h2 className="font-serif text-base font-bold text-navy-900 border-b border-cream-200 pb-2">
              Fabric Specifications Required
            </h2>
            <div className="divide-y divide-cream-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Fabric Type:</span>
                <span className="font-bold text-navy-900">{quotation.fabric_type}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Quantity Required:</span>
                <span className="font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded">
                  {quotation.quantity}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Composition / Blend:</span>
                <span className="text-navy-900">{quotation.composition || '—'}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Fabric Weight:</span>
                <span className="text-navy-900">{quotation.gsm ? `${quotation.gsm} GSM` : '—'}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Width:</span>
                <span className="text-navy-900">{quotation.width || '—'}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Pattern / Colour:</span>
                <span className="text-navy-900">{quotation.pattern_colour || '—'}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500 font-medium">Target Price:</span>
                <span className="text-navy-900 font-medium">{quotation.target_price || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message / Detailed Instructions */}
        {quotation.message && (
          <div className="p-4 rounded-xl bg-cream-50 border border-cream-200 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Buyer Specific Instructions:
            </span>
            <p className="text-xs text-navy-900 leading-relaxed whitespace-pre-wrap">
              {quotation.message}
            </p>
          </div>
        )}

        {/* Reference Attachments */}
        <div>
          <h2 className="font-serif text-base font-bold text-navy-900 mb-3 flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-gold-600" />
            <span>Uploaded Reference Files ({quotation.attachments?.length || 0})</span>
          </h2>

          {quotation.attachments && quotation.attachments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quotation.attachments.map((att) => (
                <div
                  key={att.id}
                  className="p-3 rounded-xl border border-cream-300 bg-cream-50 flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-3">
                    <div className="font-semibold text-navy-900 truncate">
                      {att.original_filename}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {att.mime_type} • {(att.size_bytes / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>

                  <a
                    href={att.storage_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-cream-300 text-slate-700 hover:text-navy-900 flex-shrink-0"
                    title="Download attachment"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No reference files uploaded with this inquiry.</p>
          )}
        </div>

        {/* Status Update & Private Internal Notes */}
        <div className="border-t border-cream-200 pt-6 space-y-4">
          <h2 className="font-serif text-base font-bold text-navy-900">
            Internal Status & Private Staff Notes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Commercial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as QuotationStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs font-semibold text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              >
                <option value="New">New</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Quotation Sent">Quotation Sent</option>
                <option value="Follow-up Required">Follow-up Required</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Private Internal Notes (Never visible to buyers)
              </label>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Record yarn availability, production lead time, quotation pricing shared, sample courier dispatch tracking..."
                className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {saveSuccess ? (
              <span className="text-xs text-emerald-700 font-semibold inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Status & Notes Saved Successfully</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                Changes are securely recorded to the database.
              </span>
            )}

            <button
              type="button"
              disabled={saving}
              onClick={handleSaveStatusAndNotes}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-gold-400" />
              <span>{saving ? 'Saving...' : 'Update Quotation'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
