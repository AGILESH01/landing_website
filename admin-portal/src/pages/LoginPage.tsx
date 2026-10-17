import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured, setLocalAdminSession } from '../lib/supabase';
import { Logo } from '../components/Logo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) throw error;
        if (data.session) {
          navigate('/dashboard');
          return;
        }
      } else {
        // Local fallback
        if (email.trim() && password.length >= 6) {
          setLocalAdminSession({ email: email.trim(), role: 'admin' });
          navigate('/dashboard');
          return;
        } else {
          throw new Error('Please enter a valid administrator email and password.');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid administrator credentials.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-block">
          <Logo size="lg" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-bold text-white tracking-tight">
          Executive Administration Portal
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Secure, encrypted access to fabric manufacturing records and quotation pipelines.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-navy-900 py-8 px-6 sm:px-10 rounded-3xl border border-white/10 shadow-2xl">
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Staff / Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@karthikeyantextiles.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-500 text-navy-950 font-semibold text-xs hover:bg-gold-400 transition-all shadow-md disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Administration Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Row-Level Security Active
            </span>
            <span>Karthikeyan Textiles</span>
          </div>
        </div>
      </div>
    </div>
  );
};
