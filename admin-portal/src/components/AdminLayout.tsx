import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Inbox,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { supabase, isSupabaseConfigured, getLocalAdminSession, setLocalAdminSession } from '../lib/supabase';
import { Logo } from './Logo';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('admin@karthikeyantextiles.com');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setAuthorized(true);
          setUserEmail(data.session.user.email || 'Admin');
          return;
        }
      }

      const local = getLocalAdminSession();
      if (local && local.role === 'admin') {
        setAuthorized(true);
        setUserEmail(local.email);
      } else {
        setAuthorized(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setLocalAdminSession(null);
    navigate('/login');
  };

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Quotations & RFQs', path: '/quotations', icon: Inbox },
    { label: 'Fabric Catalogue', path: '/fabrics', icon: Layers },
    { label: 'Settings & Info', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-navy-900 border-b border-white/10">
        <Logo size="sm" />
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg bg-navy-800 text-cream-200"
          aria-label="Toggle navigation"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 border-r border-white/10 flex flex-col transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10 hidden md:block">
          <Logo size="md" />
        </div>

        {/* Security Badge */}
        <div className="px-6 py-4 border-b border-white/5 bg-navy-950/40">
          <div className="flex items-center gap-2 text-xs text-gold-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-medium text-emerald-400">Encrypted Console</span>
          </div>
          <p className="text-[11px] text-slate-400 truncate mt-1">{userEmail}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-gold-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="https://landing-website-pi-vert.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2 text-xs text-slate-400 hover:text-gold-300 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Public Website
            </span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};
