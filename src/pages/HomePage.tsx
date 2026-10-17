import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { HeroTextileCanvas } from '../components/3d/HeroTextileCanvas';
import { FabricCard3D } from '../components/3d/FabricCard3D';
import { YarnToFabricSection } from '../components/home/YarnToFabricSection';
import { ManufacturingSection } from '../components/home/ManufacturingSection';
import { QualityAssuranceSection } from '../components/home/QualityAssuranceSection';
import { CapacityCallout } from '../components/home/CapacityCallout';
import { fabricService } from '../services/fabricService';
import { Fabric } from '../types';

export const HomePage: React.FC = () => {
  const [featuredFabrics, setFeaturedFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const fabrics = await fabricService.getFabrics({ sortBy: 'featured' });
        setFeaturedFabrics(fabrics.slice(0, 3));
      } catch (err) {
        console.error('Error loading featured fabrics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* =====================================================================
          HERO SECTION: 3D SPLIT-SCREEN TEXTILE EXPERIENCE
          ===================================================================== */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-cream-100 overflow-hidden border-b border-gold-500/20">
        {/* Subtle Ambient Weave Background */}
        <div className="absolute inset-0 bg-weave-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
            {/* Left Side: Editorial Typography & Conversion CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Trust & Location Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>25+ Years Experience</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-white/10 text-cream-200 border border-white/15">
                  <span>Pallipalayam, Erode, Tamil Nadu</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Woven for Your Vision. Built Around Your Requirements.
              </h1>

              {/* Supporting Statement */}
              <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed max-w-xl">
                Karthikeyan Textiles combines more than 25 years of textile industry experience with a commitment to quality, flexible fabric requirements and competitive pricing.
              </p>

              {/* Capacity Highlight Box */}
              <div className="p-4 rounded-xl bg-navy-900/80 border border-gold-500/30 max-w-lg flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-wider block">
                    Stated Production Capacity
                  </span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-white">
                    10 Lakh Metres per Month
                  </span>
                  <span className="text-[11px] text-cream-300/70 block mt-0.5">
                    Coordinated manufacturing & processing in Erode hub
                  </span>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-xs text-gold-300 font-medium">B2B & Export Ready</span>
                </div>
              </div>

              {/* Primary Call-to-Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-navy-950 bg-gold-500 hover:bg-gold-400 transition-all shadow-md hover:shadow-lg"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request a Quote</span>
                </Link>

                <Link
                  to="/fabrics"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-cream-100 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
                >
                  <span>Explore Fabrics</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </Link>
              </div>

              {/* Secondary Instant Contact Links */}
              <div className="pt-2 flex items-center gap-4 text-xs text-cream-300/80">
                <span>Direct Contact:</span>
                <a
                  href="https://wa.me/919842406591"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
                <span className="text-cream-400/40">•</span>
                <a
                  href="tel:+919842406591"
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>+91 9842406591</span>
                </a>
              </div>
            </div>

            {/* Right Side: Immersive 3D Textile Showcase Canvas */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <HeroTextileCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SCROLL-DRIVEN STORYTELLING: FROM YARN TO FABRIC
          ===================================================================== */}
      <YarnToFabricSection />

      {/* =====================================================================
          FEATURED FABRIC SHOWCASE (3D TACTILE CARDS)
          ===================================================================== */}
      <section className="py-20 bg-cream-100 border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
                <span>Featured Collection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
                Selected Woven Fabric Varieties
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Explore popular woven textures crafted for garment manufacturers, export houses, and clothing brands. Swatches available for buyer evaluation.
              </p>
            </div>

            <Link
              to="/fabrics"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-navy-900 bg-white hover:bg-cream-200 border border-cream-300 transition-colors shadow-sm self-start md:self-auto"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4 text-gold-600" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-cream-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFabrics.map((fabric) => (
                <FabricCard3D key={fabric.id} fabric={fabric} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500 italic max-w-xl mx-auto">
              * Fabric specifications shown in our initial catalogue serve as representative benchmarks. All commercial orders are custom manufactured to the buyer’s required count, width, and GSM.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MANUFACTURING & PROCESSING CAPABILITIES
          ===================================================================== */}
      <ManufacturingSection />

      {/* =====================================================================
          QUALITY ASSURANCE PROTOCOLS
          ===================================================================== */}
      <QualityAssuranceSection />

      {/* =====================================================================
          PRODUCTION BENCHMARK & BUSINESS STRENGTHS
          ===================================================================== */}
      <CapacityCallout />

      {/* =====================================================================
          CUSTOM FABRIC ENQUIRY CALLOUT
          ===================================================================== */}
      <section className="py-20 bg-cream-50 border-b border-cream-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20">
            <span>Bespoke Manufacturing Program</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Have Specific Weave, Yarn Count, or Finish Requirements?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Whether you need custom yarn-dyed checks, specific cotton-poly ratios, tailored widths, or specialised fabric finishes, our team coordinates the entire manufacturing cycle from Pallipalayam.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-md"
            >
              <span>Submit Fabric Specifications</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>

            <a
              href="https://wa.me/919842406591"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
