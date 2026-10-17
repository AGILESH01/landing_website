import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { QUALITY_CHECKS } from '../data/seedData';

export const QualityPage: React.FC = () => {
  return (
    <div className="bg-cream-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>Inspection Standards</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Quality Assurance Protocols
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            Every fabric roll dispatched by Karthikeyan Textiles undergoes eight standardized inspection checkpoints to verify dimensional stability, weight adherence, and shade uniformity before delivery to our buyers.
          </p>
        </div>

        {/* 8 Quality Checkpoints Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {QUALITY_CHECKS.map((check, index) => (
            <div
              key={check.id}
              className="bg-white rounded-2xl p-7 border border-cream-300 shadow-sm hover:shadow-fabric-card hover:border-gold-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cream-100 text-navy-900 border border-cream-300">
                    Protocol #{index + 1}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">
                  {check.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {check.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-200 text-xs font-medium text-slate-500 flex items-center justify-between">
                <span>Inspection Stage: Pre-Dispatch Verification</span>
                <span className="text-gold-600 font-semibold">100% Lot Check</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Notice Regarding Certifications */}
        <div className="bg-cream-50 rounded-2xl p-8 border border-cream-300 max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-navy-900 font-serif font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <span>Compliance & Certification Transparency Statement</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Karthikeyan Textiles adheres strictly to truthful commercial representations. The business currently holds no formal third-party accreditations or external certification badges. All quality checks detailed on this page represent internal operational protocols conducted on production lots prior to client dispatch.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Buyers with specific testing requirements or independent inspection agency preferences (e.g., third-party pre-shipment inspections) are welcome to coordinate these arrangements as part of their commercial purchase order.
          </p>
        </div>

        {/* Action Callout */}
        <div className="mt-16 text-center">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-md"
          >
            <FileText className="w-4 h-4 text-gold-400" />
            <span>Submit Order for Quality Evaluation</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
