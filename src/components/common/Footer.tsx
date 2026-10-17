import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { Logo } from '../brand/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-cream-100 border-t border-gold-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile */}
          <div className="flex flex-col space-y-4">
            <Logo variant="light" size="md" showTagline={true} />
            <p className="text-xs text-cream-300/80 leading-relaxed mt-2">
              Karthikeyan Textiles brings over 25 years of woven-fabric manufacturing and processing expertise to Indian and international B2B buyers. Stated production capacity of 10 Lakh metres per month.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium bg-navy-900 border border-gold-500/30 text-gold-300">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>100% Quality Inspection Before Dispatch</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-300/90">
              <li>
                <Link to="/" className="hover:text-gold-300 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/fabrics" className="hover:text-gold-300 transition-colors">
                  Fabric Catalogue & Swatches
                </Link>
              </li>
              <li>
                <Link to="/manufacturing" className="hover:text-gold-300 transition-colors">
                  Manufacturing & Processing Stages
                </Link>
              </li>
              <li>
                <Link to="/quality" className="hover:text-gold-300 transition-colors">
                  Quality Assurance Protocols
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-gold-300 transition-colors">
                  Request a Custom Quote
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Fabric Varieties */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Woven Varieties
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-300/80">
              <li>
                <Link to="/fabrics?category=cotton" className="hover:text-gold-300 transition-colors">
                  100% Pure Cotton Fabrics
                </Link>
              </li>
              <li>
                <Link to="/fabrics?category=cotton-polyester-blends" className="hover:text-gold-300 transition-colors">
                  Cotton-Polyester Blends (PC)
                </Link>
              </li>
              <li>
                <Link to="/fabrics?category=twill" className="hover:text-gold-300 transition-colors">
                  Structured 2/1 Twill Cloth
                </Link>
              </li>
              <li>
                <Link to="/fabrics?category=poplin" className="hover:text-gold-300 transition-colors">
                  Crisp Shirting Poplin
                </Link>
              </li>
              <li>
                <Link to="/fabrics?category=yarn-dyed-fabrics" className="hover:text-gold-300 transition-colors">
                  Yarn-Dyed Checks & Stripes
                </Link>
              </li>
              <li>
                <Link to="/fabrics?category=viscose-rayon-blends" className="hover:text-gold-300 transition-colors">
                  Fluid Viscose / Rayon Blends
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operating Hours */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              Direct Business Contact
            </h4>
            <ul className="space-y-3 text-xs text-cream-300/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Pallipalayam, Erode, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+919842406591" className="hover:text-gold-300 transition-colors">
                  +91 9842406591
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/919842406591"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  +91 9842406591 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:karthikeyantextiles18@gmail.com"
                  className="hover:text-gold-300 transition-colors break-all"
                >
                  karthikeyantextiles18@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <span className="text-white block font-medium">Monday – Saturday</span>
                  <span className="text-cream-400/80">9:00 AM – 8:00 PM IST</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Transparency & Accuracy Disclaimer */}
        <div className="pt-8 border-t border-white/10 text-[11px] text-cream-300/60 space-y-2">
          <p>
            <strong className="text-cream-200">Accuracy & Transparency Notice:</strong> All technical specifications, order minimums, and pricing depend on the specific fabric quality, yarn count, and order volume. Fabric samples are available upon request. Karthikeyan Textiles operates without formal external certifications at this time. Digital colours displayed on screens are RGB approximations and cannot guarantee exact physical textile dye reproduction.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400/70 gap-4">
          <p>
            © {new Date().getFullYear()} Karthikeyan Textiles. All rights reserved. Pallipalayam, Erode, Tamil Nadu.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-gold-400 italic">“Quality Woven. Global Reach.”</span>
            <span className="text-white/20">|</span>
            <Link to="/admin/login" className="hover:text-gold-300 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
