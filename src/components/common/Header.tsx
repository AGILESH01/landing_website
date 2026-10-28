import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../brand/Logo';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fabric Catalogue', path: '/fabrics' },
    { name: 'Manufacturing & Processing', path: '/manufacturing' },
    { name: 'Quality Assurance', path: '/quality' },
    { name: 'Request a Quote', path: '/quote' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-md border-b border-cream-300/80 transition-colors">
      {/* Top Thin Notification & Quick Contact Bar */}
      <div className="bg-navy-950 text-cream-100 text-[11px] py-1.5 px-4 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-medium text-gold-400">
              Capacity: 2 Lakh Metres / Month
            </span>
            <span className="hidden sm:inline-block text-cream-400/50">•</span>
            <span className="text-cream-200">
              Pallipalayam, Erode, Tamil Nadu
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+919842212112"
              className="inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors text-cream-200"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>+91 9842212112</span>
            </a>
            <span className="hidden md:inline-block text-cream-400/50">•</span>
            <a
              href="tel:04288234112"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors text-cream-200"
              title="Office Landline"
            >
              <span>Landline: 04288 234112</span>
            </a>
            <a
              href="https://wa.me/919842212112"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center focus:outline-none">
            <Logo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive(link.path)
                    ? 'text-navy-900 bg-cream-200/90 font-bold border-b-2 border-gold-500'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-cream-200/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-all shadow-sm border border-navy-800 hover:shadow-md"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/quote"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-navy-900"
            >
              <span>Quote</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy-900 hover:bg-cream-200 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-300 bg-cream-100 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-navy-900 text-white font-bold'
                    : 'text-navy-900 hover:bg-cream-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-cream-300 flex flex-col gap-2.5">
            <div className="text-xs text-slate-600 font-medium">Direct Inquiries:</div>
            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919842212112"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-white border border-cream-300 text-navy-900"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-500" />
                  <span>Call Mobile</span>
                </a>
                <a
                  href="https://wa.me/919842212112"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-600 text-white"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <a
                href="tel:04288234112"
                className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-cream-200/80 text-navy-900"
              >
                <span>Landline: 04288 234112</span>
              </a>
            </div>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-[11px] text-slate-500 hover:text-navy-900 mt-2"
            >
              Staff & Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
