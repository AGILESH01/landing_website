import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { supabase, isSupabaseConfigured, getLocalAdminSession, setLocalAdminSession } from '../../lib/supabase';
import { Logo } from '../../components/brand/Logo';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setAuthorized(true);
          return;
        }
      }

      // Check local session
      const local = getLocalAdminSession();
      if (local && local.role === 'admin') {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setLocalAdminSession(null);
    navigate('/admin/login');
  };

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Fabric Management', path: '/admin/fabrics', icon: Layers },
    { name: 'Quotation Inquiries', path: '/admin/quotations', icon: Inbox },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col lg:flex-row">
      {/* Mobile Admin Header */}
      <div className="lg:hidden bg-navy-950 text-cream-100 p-4 flex items-center justify-between border-b border-gold-500/20">
        <Logo variant="light" size="sm" />
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 rounded-lg bg-navy-900 text-cream-200"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 text-cream-100 flex flex-col justify-between p-5 border-r border-gold-500/20 transform transition-transform duration-200 lg:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static`}
      >
        <div>
          {/* Logo & Portal Identifier */}
          <div className="pb-6 mb-6 border-b border-white/10">
            <Logo variant="light" size="sm" />
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-900 text-[10px] font-mono text-gold-400 border border-gold-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                      : 'text-cream-300 hover:text-white hover:bg-navy-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-navy-950' : 'text-gold-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-cream-300 hover:text-white hover:bg-navy-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              <span>View Public Site</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-navy-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
