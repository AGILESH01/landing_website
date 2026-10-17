import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Factory, FileText } from 'lucide-react';
import { MANUFACTURING_STAGES } from '../data/seedData';

export const ManufacturingPage: React.FC = () => {
  return (
    <div className="bg-cream-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
            <span>Production Workflow</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Manufacturing & Processing Capabilities
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            With over 25 years of established presence in the Pallipalayam textile corridor, Karthikeyan Textiles manages end-to-end woven fabric manufacturing and processing programs with a stated capacity of 10 Lakh metres per month.
          </p>
        </div>

        {/* Stated Capacity Benchmark Banner */}
        <div className="mb-16 bg-navy-950 text-cream-100 rounded-3xl p-8 sm:p-10 border border-gold-500/30 shadow-fabric-elevated flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-gold-400">
              Verified Production Metric
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              10 Lakh Metres Monthly Stated Capacity
            </h2>
            <p className="text-xs sm:text-sm text-cream-300/80 max-w-xl leading-relaxed">
              Coordinated through dedicated production lines in Pallipalayam, Erode, facilitating continuous deliveries for domestic garment manufacturers, export houses, and wholesalers.
            </p>
          </div>

          <Link
            to="/quote"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 bg-gold-500 hover:bg-gold-400 transition-colors shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Request Production Run</span>
          </Link>
        </div>

        {/* 9 Process Stages Workflow */}
        <div className="space-y-8">
          <div className="border-b border-cream-300 pb-4 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-navy-900">
              The 9 Confirmed Processing Stages
            </h3>
            <span className="text-xs text-slate-500 font-medium">Standard Operating Workflow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MANUFACTURING_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="bg-white rounded-2xl p-6 border border-cream-300 shadow-sm hover:shadow-fabric-card hover:border-gold-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-serif font-bold text-gold-600">
                      {stage.step}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-cream-100 text-slate-600">
                      Phase {stage.step}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-navy-900 mb-2">
                    {stage.name}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Stage
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Setup & Transparency Notice */}
        <div className="mt-16 bg-cream-50 rounded-2xl p-8 border border-cream-300 text-xs text-slate-600 space-y-4">
          <div className="flex items-center gap-2 text-navy-900 font-serif font-bold text-sm">
            <Factory className="w-4 h-4 text-gold-600" />
            <span>Manufacturing Framework & Operational Transparency</span>
          </div>
          <p className="leading-relaxed">
            Karthikeyan Textiles coordinates fabric production through trusted regional manufacturing infrastructure across the Erode and Pallipalayam weaving belt. Production arrangements are tailored to specific fabric requirements, ensuring competitive pricing, flexible order volume coordination, and dependable delivery timelines.
          </p>
          <p className="leading-relaxed">
            All order parameters—including yarn counts, warp/weft densities, dye fastness levels, and finishing treatments—are documented and agreed upon per commercial purchase order.
          </p>
        </div>

        {/* Next Action Banner */}
        <div className="mt-12 text-center">
          <Link
            to="/quality"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-gold-600 transition-colors"
          >
            <span>Next: Review Our Quality Assurance Protocols</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
