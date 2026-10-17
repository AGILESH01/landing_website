import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, CheckCircle2 } from 'lucide-react';
import { Fabric } from '../../types';

interface FabricCard3DProps {
  fabric: Fabric;
}

export const FabricCard3D: React.FC<FabricCard3DProps> = ({ fabric }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Small, restrained 3D tilt angle (max 7 degrees)
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const imageSrc = fabric.images?.[0]?.storage_path || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      className="perspective-1000 group relative flex flex-col h-full rounded-2xl bg-white border border-cream-300 transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? 'translateY(-6px)' : 'translateY(0)'
        }`,
        boxShadow: isHovered
          ? '0 24px 48px -12px rgba(13, 27, 42, 0.22), 0 8px 16px -4px rgba(13, 27, 42, 0.08)'
          : '0 8px 20px -6px rgba(13, 27, 42, 0.06), 0 2px 6px -1px rgba(13, 27, 42, 0.04)',
        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease-out',
      }}
    >
      {/* Fabric Swatch Visual Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-cream-200">
        <img
          src={imageSrc}
          alt={fabric.images?.[0]?.alt_text || `${fabric.name} woven texture`}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Tactile Weave Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-navy-900 border border-cream-300/80 shadow-sm">
            {fabric.category?.name || 'Woven Fabric'}
          </span>
        </div>

        {/* Demo Indicator (if applicable) */}
        {fabric.is_demo && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-navy-900/80 backdrop-blur-md text-gold-400 border border-gold-500/30">
              Demo Sample
            </span>
          </div>
        )}

        {/* Sample Availability Flag */}
        {fabric.sample_available && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-navy-950/80 backdrop-blur-md text-cream-100 border border-white/10">
              <CheckCircle2 className="w-3 h-3 text-gold-400" />
              Samples Available
            </span>
          </div>
        )}
      </div>

      {/* Fabric Details & Technical Specifications */}
      <div className="flex flex-col flex-grow p-5">
        <div className="mb-2">
          <h3 className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-1">
            {fabric.name}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {fabric.short_description}
          </p>
        </div>

        {/* Verified Technical Specifications Chips */}
        <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-lg bg-cream-50 border border-cream-200 text-[11px]">
          {fabric.composition && (
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Blend</span>
              <span className="font-medium text-navy-900 line-clamp-1">{fabric.composition}</span>
            </div>
          )}
          {fabric.gsm && (
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Weight</span>
              <span className="font-medium text-navy-900">{fabric.gsm} GSM</span>
            </div>
          )}
          {fabric.width && (
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Width</span>
              <span className="font-medium text-navy-900">{fabric.width}</span>
            </div>
          )}
          {fabric.pattern && (
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Pattern</span>
              <span className="font-medium text-navy-900 line-clamp-1">{fabric.pattern}</span>
            </div>
          )}
        </div>

        {/* Applications Tags */}
        {fabric.applications && fabric.applications.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {fabric.applications.slice(0, 2).map((app, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream-200/70 text-charcoal-700"
              >
                {app}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons: View Details & Request a Quote */}
        <div className="mt-auto pt-3 border-t border-cream-200 flex items-center gap-2">
          <Link
            to={`/fabrics/${fabric.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-semibold text-navy-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 transition-colors"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to={`/quote?fabric_id=${fabric.id}&fabric_name=${encodeURIComponent(fabric.name)}&fabric_type=${encodeURIComponent(fabric.category?.name || fabric.name)}`}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-gold-400" />
            <span>Get Quote</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
