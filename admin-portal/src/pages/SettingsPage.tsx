import React from 'react';
import {
  CheckCircle2,
  Database,
} from 'lucide-react';
import { adminService } from '../services/adminService';

export const SettingsPage: React.FC = () => {
  const settings = adminService.getSettings();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
          System & Enterprise Profile
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Operational credentials, verified communication channels, and database connectivity.
        </p>
      </div>

      {/* Database Status Card */}
      <div className="p-6 rounded-3xl bg-navy-900 border border-white/10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">PostgreSQL Cloud Database</h2>
            <p className="text-xs text-slate-400">Supabase Project: alxatoutpzhlcvteebzv</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Connected</span>
        </span>
      </div>

      {/* Verified Business Parameters */}
      <div className="bg-navy-900 rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
          Verified Enterprise Credentials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Official Mobile & WhatsApp</span>
            <div className="text-sm font-semibold text-white font-mono">{settings.phone}</div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Office Landline</span>
            <div className="text-sm font-semibold text-white font-mono">{settings.landline}</div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Inquiry Routing Email</span>
            <div className="text-sm font-semibold text-gold-300">{settings.email}</div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Manufacturing Base</span>
            <div className="text-sm font-semibold text-white">{settings.location}</div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Operating Hours</span>
            <div className="text-sm font-semibold text-white">{settings.business_hours}</div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/5 space-y-1">
            <span className="text-slate-400">Stated Monthly Capacity</span>
            <div className="text-sm font-semibold text-gold-400">{settings.stated_capacity}</div>
          </div>
        </div>

        {/* Business Notice */}
        <div className="p-4 rounded-2xl bg-navy-950/40 border border-white/5 text-[11px] text-slate-400 space-y-1 leading-relaxed">
          <span className="font-semibold text-slate-300 block">System Compliance Note:</span>
          Per operational rules, the production capacity is strictly fixed to 2 Lakh metres/month without unverified machine claims or unsupported certification badges.
        </div>
      </div>
    </div>
  );
};
