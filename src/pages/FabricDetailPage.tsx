import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  ArrowLeft,
  Layers,
  Sparkles,
  Info,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { fabricService } from '../services/fabricService';
import { quotationService } from '../services/quotationService';
import { Fabric } from '../types';

export const FabricDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [fabric, setFabric] = useState<Fabric | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchFabric = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const item = await fabricService.getFabricBySlug(slug);
        setFabric(item);
      } catch (err) {
        console.error('Failed to load fabric detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFabric();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-cream-100 min-h-screen py-16 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!fabric) {
    return (
      <div className="bg-cream-100 min-h-screen py-20">
        <div className="max-w-md mx-auto px-4 text-center bg-white p-8 rounded-2xl border border-cream-300 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Fabric Not Found</h2>
          <p className="text-xs text-slate-600 mb-6">
            The fabric you requested does not exist or has been retired from the catalogue.
          </p>
          <Link
            to="/fabrics"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Fabric Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  const images = fabric.images && fabric.images.length > 0 ? fabric.images : [
    {
      id: 'default',
      fabric_id: fabric.id,
      storage_path: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=80',
      alt_text: fabric.name,
      sort_order: 1,
    }
  ];

  const currentImage = images[activeImageIndex] || images[0];

  const whatsAppUrl = quotationService.generateWhatsAppUrl({
    fabric_type: fabric.name,
    quantity: 'Bulk inquiry',
  });

  return (
    <div className="bg-cream-100 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link
            to="/fabrics"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Fabric Catalogue</span>
          </Link>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-fabric-card">
          {/* Left Column: Visual Swatch Gallery & 3D Perspective */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream-200 border border-cream-300 group">
              <img
                src={currentImage.storage_path}
                alt={currentImage.alt_text || fabric.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {fabric.sample_available && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-navy-900 border border-cream-300 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                    <span>Sample Swatches Available</span>
                  </span>
                </div>
              )}

              {fabric.is_demo && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-navy-900/90 text-gold-400 border border-gold-500/30">
                    Catalogue Reference
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row if Multiple Images */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-gold-500 shadow-md ring-2 ring-gold-500/20'
                        : 'border-cream-300 hover:border-slate-400 opacity-80'
                    }`}
                  >
                    <img
                      src={img.storage_path}
                      alt={img.alt_text}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Tactical Notice regarding sample swatches */}
            <div className="p-4 rounded-xl bg-cream-50 border border-cream-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-navy-900">Physical Swatch Dispatch:</strong> Commercial buyers can request fabric swatches for hand-feel, shade inspection, and wash testing before confirming bulk production lots.
              </p>
            </div>
          </div>

          {/* Right Column: Technical Details & Quote Conversion */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  {fabric.category?.name || 'Woven Quality'}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">Pallipalayam, Erode Production</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
                {fabric.name}
              </h1>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {fabric.description || fabric.short_description}
              </p>

              {/* Verified Technical Specifications Table */}
              <div className="mt-6 border border-cream-300 rounded-2xl overflow-hidden bg-cream-50/50">
                <div className="bg-cream-100 px-4 py-2.5 border-b border-cream-300 text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-gold-600" />
                  <span>Technical Attributes</span>
                </div>

                <div className="divide-y divide-cream-200 text-xs">
                  {fabric.composition && (
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-500 font-medium">Composition</span>
                      <span className="col-span-2 font-semibold text-navy-900">{fabric.composition}</span>
                    </div>
                  )}

                  {fabric.gsm && (
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-500 font-medium">Fabric Weight</span>
                      <span className="col-span-2 font-semibold text-navy-900">{fabric.gsm} GSM</span>
                    </div>
                  )}

                  {fabric.width && (
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-500 font-medium">Width</span>
                      <span className="col-span-2 font-semibold text-navy-900">{fabric.width}</span>
                    </div>
                  )}

                  {fabric.yarn_count && (
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-500 font-medium">Yarn Count</span>
                      <span className="col-span-2 font-semibold text-navy-900">{fabric.yarn_count}</span>
                    </div>
                  )}

                  {fabric.construction && (
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-500 font-medium">Weave Structure</span>
                      <span className="col-span-2 font-semibold text-navy-900">{fabric.construction}</span>
                    </div>
                  )}

                  {fabric.pattern && (
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-500 font-medium">Pattern</span>
                      <span className="col-span-2 font-semibold text-navy-900">{fabric.pattern}</span>
                    </div>
                  )}

                  {fabric.applications && fabric.applications.length > 0 && (
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-500 font-medium">Key Applications</span>
                      <span className="col-span-2 font-medium text-navy-900">
                        {fabric.applications.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Manufacturing Options Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {fabric.customization_available && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-cream-200 text-navy-900">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span>Custom Weave & Count Customization Supported</span>
                  </span>
                )}
              </div>
            </div>

            {/* Direct Quotation CTA Box */}
            <div className="pt-6 border-t border-cream-200 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/quote?fabric_id=${fabric.id}&fabric_name=${encodeURIComponent(fabric.name)}&fabric_type=${encodeURIComponent(fabric.category?.name || fabric.name)}&gsm=${fabric.gsm || ''}&width=${encodeURIComponent(fabric.width || '')}&composition=${encodeURIComponent(fabric.composition || '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-md"
                >
                  <FileText className="w-4 h-4 text-gold-400" />
                  <span>Request a Quote for this Fabric</span>
                </Link>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Direct Inquiry Line:</span>
                <a href="tel:+919842406591" className="font-semibold text-navy-900 hover:text-gold-600 inline-flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gold-500" />
                  <span>+91 9842406591</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
