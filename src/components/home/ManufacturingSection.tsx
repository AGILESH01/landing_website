import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MANUFACTURING_STAGES } from '../../data/seedData';

export const ManufacturingSection: React.FC = () => {
  return (
    <section className="py-20 bg-cream-50 border-b border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
              <span>Manufacturing & Processing Capabilities</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Nine Coordinated Stages of Fabric Production
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              From sizing and weaving to specialized dyeing, printing, and rigorous pre-dispatch inspection. Our coordinated manufacturing workflow ensures dimensional consistency across volume shipments.
            </p>
          </div>

          <Link
            to="/manufacturing"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-navy-900 bg-white hover:bg-cream-200 border border-cream-300 transition-colors shadow-sm self-start md:self-auto"
          >
            <span>Learn About Our Process</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
          </Link>
        </div>

        {/* 9 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANUFACTURING_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="bg-white rounded-2xl p-6 border border-cream-300 hover:border-gold-500/40 hover:shadow-fabric-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-serif font-bold text-gold-600">
                    {stage.step}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                  {stage.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>Confirmed Capability</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contextual Clarification Note */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-cream-300 text-xs text-slate-600 flex items-start gap-3">
          <span className="text-gold-600 font-bold uppercase tracking-wider text-[11px] mt-0.5">
            Operational Note:
          </span>
          <p className="leading-relaxed">
            Karthikeyan Textiles manages complete weaving and processing coordination through established manufacturing channels in the Erode textile corridor. Stated production capacity is 10 Lakh metres per month.
          </p>
        </div>
      </div>
    </section>
  );
};
