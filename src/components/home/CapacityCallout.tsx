import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Calendar, Sparkles, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';

export const CapacityCallout: React.FC = () => {
  const strengths = [
    {
      icon: Calendar,
      title: '25+ Years Industry Experience',
      desc: 'Deep roots in Pallipalayam and the Erode textile belt, serving B2B clients with dependable textile expertise.',
    },
    {
      icon: Factory,
      title: '2 Lakh Metres / Month',
      desc: 'Stated manufacturing and processing capacity to coordinate volume garment orders and consistent repeat lots.',
    },
    {
      icon: Sparkles,
      title: 'Custom Fabric Requirements',
      desc: 'Warp, weft, composition, and GSM calibrated around your specific garment manufacturing designs.',
    },
    {
      icon: Handshake,
      title: 'Flexible Quantities & Samples',
      desc: 'Sample swatches available for evaluation. Order quantities structured around fabric variety and program scope.',
    },
  ];

  return (
    <section className="py-20 bg-cream-100 border-b border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold-500/30 shadow-fabric-elevated relative overflow-hidden text-cream-100">
          {/* Subtle Weave Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Big Stated Metric */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/30">
                <span>Production Benchmark</span>
              </div>

              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight block">
                  2 Lakh
                </span>
                <span className="text-xl sm:text-2xl font-serif text-gold-400 block font-medium">
                  Metres per Month
                </span>
                <p className="text-xs text-cream-300/70 pt-2 font-mono">
                  (2,00,000 metres monthly stated capacity)
                </p>
              </div>

              <p className="text-sm text-cream-200/90 leading-relaxed">
                Positioned in the textile hub of Pallipalayam, Erode, Karthikeyan Textiles combines over two decades of production heritage with structured delivery coordination for domestic and overseas apparel buyers.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 bg-gold-500 hover:bg-gold-400 transition-colors shadow-md"
                >
                  <span>Request Capacity Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-cream-100 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
                >
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Key Business Strengths */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-navy-900/60 backdrop-blur-sm border border-white/10 hover:border-gold-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-base font-bold text-white mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-cream-300/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[11px] text-gold-400/90 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                      <span>Verified Strength</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
