import { Phone, Mail, MapPin, Clock, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-cream-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
            <span>Direct Commercial Channels</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Contact Karthikeyan Textiles
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            Connect directly with our commercial team in Pallipalayam, Erode for volume fabric manufacturing, processing inquiries, and sample swatch dispatch.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: Phone & Landline */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-sm flex flex-col justify-between hover:shadow-fabric-card transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-navy-900 mb-1">
                Direct Telephone
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Call our production and sales desk.
              </p>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobile Phone:</span>
                  <a
                    href="tel:+919842212112"
                    className="text-sm font-semibold text-navy-900 hover:text-gold-600 block transition-colors"
                  >
                    +91 9842212112
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Office Landline:</span>
                  <a
                    href="tel:04288234112"
                    className="text-sm font-semibold text-navy-900 hover:text-gold-600 block transition-colors font-mono"
                  >
                    04288 234112
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] text-slate-400">
              Mon – Sat: 9:00 AM – 8:00 PM IST
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-sm flex flex-col justify-between hover:shadow-fabric-card transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-navy-900 mb-1">
                WhatsApp Business Chat
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Instant quotes & swatch discussions.
              </p>
              <a
                href="https://wa.me/919842212112"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 block transition-colors"
              >
                +91 9842212112
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] text-emerald-600 font-medium">
              Click to Open Chat Directly
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-sm flex flex-col justify-between hover:shadow-fabric-card transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-navy-900 mb-1">
                Official Email
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Send formal RFPs and specifications.
              </p>
              <a
                href="mailto:karthikeyantextiles18@gmail.com"
                className="text-xs font-semibold text-navy-900 hover:text-gold-600 block transition-colors break-all"
              >
                karthikeyantextiles18@gmail.com
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] text-slate-400">
              Response within 24 business hours
            </div>
          </div>

          {/* Card 4: Operating Hours */}
          <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-sm flex flex-col justify-between hover:shadow-fabric-card transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-navy-900/10 text-navy-900 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-navy-900 mb-1">
                Operating Hours
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                India Standard Time (IST)
              </p>
              <div className="text-xs font-semibold text-navy-900">
                <div>Monday – Saturday</div>
                <div className="text-slate-600 font-normal">9:00 AM – 8:00 PM IST</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] text-slate-400">
              Sunday: Closed
            </div>
          </div>
        </div>

        {/* Locality & Geographic Overview (Pallipalayam, Erode) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-300 shadow-fabric-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cream-100 text-navy-900 border border-cream-300">
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              <span>Textile Hub Locality</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
              Pallipalayam, Erode, Tamil Nadu, India
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Situated in the heart of the renowned Erode weaving corridor, Pallipalayam is celebrated across India for woven fabric processing, yarn sizing, dyeing, and finished textile distribution.
            </p>

            <div className="p-4 rounded-xl bg-cream-50 border border-cream-200 text-xs text-slate-600 space-y-1">
              <strong className="text-navy-900 block font-semibold">Location Transparency:</strong>
              <p className="leading-relaxed text-[11px]">
                We display the confirmed commercial town locality of Pallipalayam, Erode. In accordance with strict accuracy protocols, we do not fabricate non-public street addresses or misleading GPS markers.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4 text-gold-400" />
                <span>Submit Detailed Inquiry</span>
              </Link>
            </div>
          </div>

          {/* Regional Map Frame (Clean Erode/Pallipalayam Locality Frame) */}
          <div className="lg:col-span-6 h-80 rounded-2xl overflow-hidden border border-cream-300 bg-cream-200 relative shadow-inner">
            <iframe
              title="Karthikeyan Textiles Locality - Pallipalayam, Erode"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31289.44421832049!2d77.72879555!3d11.3533804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f01cb7da4df%3A0x6739f50e82c5750a!2sPallipalayam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
