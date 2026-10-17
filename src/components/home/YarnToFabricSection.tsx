import React, { useState } from 'react';
import { Layers, Disc, Sparkles, MoveRight } from 'lucide-react';

export const YarnToFabricSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      id: 0,
      title: 'Spun Yarn Selection',
      subtitle: 'Raw Material Calibration',
      description: 'Selected cotton, polyester, and blended yarns calibrated for strength, elongation, and count consistency to withstand continuous loom shuttle speeds.',
      icon: Disc,
      accent: 'Yarn Count & Purity',
      visualHint: 'Spun filament threads with high tensile balance',
    },
    {
      id: 1,
      title: 'Warp & Weft Interlacing',
      subtitle: 'Precision Structural Weaving',
      description: 'Vertical warp yarns and horizontal weft picks interlaced at calibrated tension and reed density, generating the exact target weave architecture (Plain, Poplin, Twill, or Dobby).',
      icon: Layers,
      accent: 'Geometric Thread Geometry',
      visualHint: 'Microscopic intersection of warp & weft filaments',
    },
    {
      id: 2,
      title: 'Processing & Dye Fixation',
      subtitle: 'Colour & Texture Calibration',
      description: 'Specialised washing, dyeing, and chemical/thermal finishing to fix shades, control shrinkage, and establish the desired hand-feel and surface softness.',
      icon: Sparkles,
      accent: 'Shade Matching & Hand-Feel',
      visualHint: 'Immersion bath shade penetration & wash scouring',
    },
    {
      id: 3,
      title: 'Inspection & Finished Rolls',
      subtitle: 'Dispatch-Ready Fabric',
      description: 'Defect perch inspection, accurate GSM verification, cut-width checks, and moisture-barrier roll packaging ready for shipment to garment manufacturers.',
      icon: MoveRight,
      accent: '100% Quality Inspection',
      visualHint: 'Uniform finished fabric roll with verified metrics',
    },
  ];

  return (
    <section className="py-20 bg-cream-100 border-b border-cream-300 relative overflow-hidden">
      {/* Background thread lines watermark */}
      <div className="absolute inset-0 bg-weave-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
            <span>Scroll-Driven Storytelling</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            From Yarn to Fabric: The Art of the Weave
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Understanding the transformation from raw spun filament into durable, dimensionally stable woven cloth tailored to your manufacturing requirements.
          </p>
        </div>

        {/* Interactive Storyboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = activeStage === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-navy-900 text-cream-100 border-gold-500 shadow-fabric-elevated transform -translate-y-2'
                    : 'bg-white text-navy-900 border-cream-300 hover:border-gold-500/40 hover:shadow-fabric-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-gold-500 text-navy-950' : 'bg-cream-200 text-navy-900'
                      }`}
                    >
                      Stage 0{stage.id + 1}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-gold-400' : 'text-slate-400'}`} />
                  </div>

                  <h3
                    className={`font-serif text-lg font-bold mb-1 ${
                      isSelected ? 'text-white' : 'text-navy-900'
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <div
                    className={`text-[11px] font-medium uppercase tracking-wider mb-3 ${
                      isSelected ? 'text-gold-400' : 'text-gold-600'
                    }`}
                  >
                    {stage.subtitle}
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? 'text-cream-200' : 'text-slate-600'
                    }`}
                  >
                    {stage.description}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-3 border-t text-[11px] font-medium flex items-center justify-between ${
                    isSelected ? 'border-white/10 text-gold-300' : 'border-cream-200 text-slate-500'
                  }`}
                >
                  <span>{stage.accent}</span>
                  <span className="text-[10px] opacity-70">Focus</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
