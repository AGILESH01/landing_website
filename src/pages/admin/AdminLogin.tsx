import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured, setLocalAdminSession } from '../../lib/supabase';
import { Logo } from '../../components/brand/Logo';

export const AdminLogin: React.FC = () => {
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
          navigate('/admin');
          return;
        }
      } else {
        // Local Administrator Authentication for development & offline evaluation
        if (email.trim() && password.length >= 6) {
          setLocalAdminSession({ email: email.trim(), role: 'admin' });
          navigate('/admin');
          return;
        } else {
          throw new Error('Please enter a valid administrator email and password (minimum 6 characters).');
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
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-cream-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block">
          <Logo variant="light" size="lg" />
        </Link>
        <h2 className="mt-6 font-serif text-2xl font-bold text-white tracking-tight">
          Authorized Administrator Sign In
        </h2>
        <p className="mt-2 text-xs text-cream-300/70">
          Access the internal catalogue and quotation management system.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-navy-900/90 py-8 px-6 sm:px-10 rounded-3xl border border-gold-500/30 shadow-fabric-elevated backdrop-blur-md">
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-cream-200 mb-1.5">
                Staff / Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400/50" />
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
              <label className="block text-xs font-semibold text-cream-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400/50" />
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
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 bg-gold-500 hover:bg-gold-400 transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-cream-300/60">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Row-Level Security Enabled</span>
            </span>
            <Link to="/" className="text-gold-400 hover:underline">
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
