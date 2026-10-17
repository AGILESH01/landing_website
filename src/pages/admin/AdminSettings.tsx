import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Save,
  Palette,
  Mail,
  Database,
  Building
} from 'lucide-react';
import { isSupabaseConfigured, getLocalStore, saveLocalSettings } from '../../lib/supabase';
import { BRAND_COLOR_TOKENS } from '../../tokens/colors';
import { OperationalSettings } from '../../types';

export const AdminSettings: React.FC = () => {
  const { settings: initialSettings } = getLocalStore();
  const [settings, setSettings] = useState<OperationalSettings>(initialSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveLocalSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
          System & Business Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review business profile information, Pantone brand references, and server integration health.
        </p>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Supabase Status */}
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm flex items-start gap-3">
          <div className={`p-2 rounded-xl flex-shrink-0 ${isSupabaseConfigured ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            <Database className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-navy-900 block">
              Database Connection: {isSupabaseConfigured ? 'Supabase PostgreSQL Cloud' : 'Local Standalone Store'}
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isSupabaseConfigured
                ? 'Connected to live Supabase backend. Row-Level Security (RLS) active.'
                : 'Operating in local store mode with full offline functionality. To connect to Supabase Cloud, add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.'}
            </p>
          </div>
        </div>

        {/* Email Integration Status */}
        <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-navy-900 block">
              Transactional Email Delivery (Resend)
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Edge function code is ready in <code className="font-mono bg-cream-100 px-1 rounded">supabase/functions/submit-quotation</code>. Notifications are targeted to <strong className="text-navy-900">karthikeyantextiles18@gmail.com</strong> once <code className="font-mono">RESEND_API_KEY</code> is deployed to your Supabase project secrets.
            </p>
          </div>
        </div>
      </div>

      {/* Form: Business Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm">
        <div className="border-b border-cream-200 pb-4 mb-6">
          <h2 className="font-serif text-lg font-bold text-navy-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-gold-600" />
            <span>Verified Public Business Profile</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            These values govern the public contact page, header alerts, and quotation headers.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={settings.company_name}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Stated Monthly Capacity</label>
              <input
                type="text"
                name="stated_capacity"
                value={settings.stated_capacity}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Direct Phone</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Official Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Operating Hours</label>
              <input
                type="text"
                name="business_hours"
                value={settings.business_hours}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy-900 mb-1">Location Locality</label>
              <input
                type="text"
                name="location"
                value={settings.location}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy-900 mb-1">Proposed Tagline</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-navy-900 bg-cream-50/40 font-serif italic"
              />
            </div>
          </div>

          <div className="border-t border-cream-200 pt-5 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs text-emerald-700 font-semibold inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Settings updated successfully</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                Updates take effect immediately on public pages.
              </span>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4 text-gold-400" />
              <span>Save Business Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Pantone Brand Token Registry Review */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm space-y-4">
        <div className="border-b border-cream-200 pb-4">
          <h2 className="font-serif text-lg font-bold text-navy-900 flex items-center gap-2">
            <Palette className="w-4 h-4 text-gold-600" />
            <span>Pantone Brand Token Registry & Colour Verification</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Status of provisional brand colours awaiting final physical reference book approval (Section 3.1 & Section 10).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-cream-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-cream-200">
                <th className="py-2.5 px-3 font-semibold">Swatch</th>
                <th className="py-2.5 px-3 font-semibold">Token Name</th>
                <th className="py-2.5 px-3 font-semibold">Hex Code</th>
                <th className="py-2.5 px-3 font-semibold">Pantone Reference</th>
                <th className="py-2.5 px-3 font-semibold">Physical Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {Object.entries(BRAND_COLOR_TOKENS).map(([key, token]) => (
                <tr key={key} className="hover:bg-cream-50">
                  <td className="py-2.5 px-3">
                    <div
                      className="w-7 h-7 rounded-lg border border-cream-300 shadow-xs"
                      style={{ backgroundColor: token.hex }}
                    />
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-navy-900">
                    {token.name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    {token.hex}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">
                    {token.pantoneReference ? token.pantoneReference : 'Pending Physical Swatch Selection'}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span>{token.confirmationStatus.replace(/_/g, ' ')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-slate-600">
          <p className="leading-relaxed text-[11px]">
            <strong className="text-navy-900 font-semibold">Architectural Standard:</strong> Pantone-to-screen RGB conversions are mathematical approximations. Once the management selects physical swatches from the company's official reference book, identifiers can be permanently linked in <code className="font-mono bg-cream-200 px-1 rounded">src/tokens/colors.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
