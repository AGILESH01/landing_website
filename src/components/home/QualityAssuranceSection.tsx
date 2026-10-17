import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { QUALITY_CHECKS } from '../../data/seedData';

export const QualityAssuranceSection: React.FC = () => {
  return (
    <section className="py-20 bg-navy-950 text-cream-100 relative overflow-hidden">
      {/* Subtle Weave Accent Watermark */}
      <div className="absolute inset-0 bg-weave-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Inspection Protocols</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Eight Confirmed Quality Checks Before Every Dispatch
            </h2>
            <p className="text-sm sm:text-base text-cream-300/80 mt-3 leading-relaxed">
              We perform rigorous pre-shipment inspections to verify fabric uniformity, weight consistency, and shade conformity against approved swatches.
            </p>
          </div>

          <Link
            to="/quality"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-navy-950 bg-gold-500 hover:bg-gold-400 transition-colors shadow-sm self-start lg:self-auto font-bold"
          >
            <span>Review Quality Protocols</span>
            <ArrowRight className="w-3.5 h-3.5 text-navy-950" />
          </Link>
        </div>

        {/* 8 Quality Checks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITY_CHECKS.map((check, index) => (
            <div
              key={check.id}
              className="bg-navy-900/80 backdrop-blur-sm rounded-xl p-5 border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-gold-400">
                    Check #{index + 1}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                  {check.title}
                </h3>
                <p className="text-xs text-cream-300/70 leading-relaxed">
                  {check.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[10px] uppercase font-semibold text-gold-400/80 tracking-wider">
                Pre-Dispatch Verified
              </div>
            </div>
          ))}
        </div>

        {/* Clarification banner */}
        <div className="mt-12 text-center text-xs text-cream-400/70 max-w-2xl mx-auto">
          <p>
            * Note: These are standard internal quality verification checks conducted on production lots. Karthikeyan Textiles does not claim third-party certifications or unverified laboratory accreditations.
          </p>
        </div>
      </div>
    </section>
  );
};
