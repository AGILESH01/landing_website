import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldAlert,
  X,
  FileCheck
} from 'lucide-react';
import { quotationService, SubmitQuotationResult } from '../services/quotationService';
import { QuotationFormData } from '../types';

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Form State
  const [formData, setFormData] = useState<QuotationFormData>({
    customer_name: '',
    company_name: '',
    email: '',
    phone: '',
    country: 'India',
    fabric_id: '',
    fabric_name: '',
    fabric_type: '',
    composition: '',
    gsm: '',
    width: '',
    pattern_colour: '',
    quantity: '',
    target_price: '',
    message: '',
    honeypot: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitQuotationResult | null>(null);

  // Prepopulate from URL parameters if redirected from fabric page
  useEffect(() => {
    const fId = searchParams.get('fabric_id');
    const fName = searchParams.get('fabric_name');
    const fType = searchParams.get('fabric_type');
    const fGsm = searchParams.get('gsm');
    const fWidth = searchParams.get('width');
    const fComp = searchParams.get('composition');

    if (fName || fType || fId) {
      setFormData((prev) => ({
        ...prev,
        fabric_id: fId || '',
        fabric_name: fName || '',
        fabric_type: fType || fName || '',
        gsm: fGsm || prev.gsm,
        width: fWidth || prev.width,
        composition: fComp || prev.composition,
      }));
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > 5) {
      setFileError('You can upload a maximum of 5 files.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    for (const f of selectedFiles) {
      if (!allowedTypes.includes(f.type)) {
        setFileError(`Unsupported format: "${f.name}". Only JPG, PNG, WebP, and PDF are permitted.`);
        return;
      }
      if (f.size > maxSizeBytes) {
        setFileError(`File "${f.name}" exceeds 10MB.`);
        return;
      }
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const result = await quotationService.submitQuotation(formData, files);
      setSubmitResult(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during submission.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // If quotation has been submitted successfully, render confirmation screen
  if (submitResult?.success) {
    const whatsAppUrl = quotationService.generateWhatsAppUrl({
      reference_number: submitResult.referenceNumber,
      customer_name: formData.customer_name,
      company_name: formData.company_name,
      fabric_type: formData.fabric_type,
      quantity: formData.quantity,
      country: formData.country,
      message: formData.message,
    });

    return (
      <div className="bg-cream-100 min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-fabric-elevated text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-1">
                Quotation Request Recorded
              </div>
              <h1 className="font-serif text-3xl font-bold text-navy-900">
                Thank You, {formData.customer_name}
              </h1>
              <p className="text-sm text-slate-600 mt-2">
                Your quotation request has been securely registered in our system.
              </p>
            </div>

            {/* Reference Number Banner */}
            <div className="p-4 rounded-xl bg-cream-50 border-2 border-gold-500/40 inline-block">
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">
                Your Unique Reference Number
              </span>
              <span className="font-mono text-2xl font-bold text-navy-950 tracking-wider">
                {submitResult.referenceNumber}
              </span>
            </div>

            <div className="text-xs text-slate-600 text-left bg-cream-50 p-4 rounded-xl space-y-2 border border-cream-200">
              <div className="font-bold text-navy-900">Next Steps:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Our commercial team will review your fabric requirements, yarn counts, and quantity.</li>
                <li>You will receive a competitive quotation within 24 business hours.</li>
                <li>If you require immediate technical coordination or sample dispatch, connect with us on WhatsApp using the button below.</li>
              </ul>
            </div>

            {/* Instant WhatsApp Chat CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Now on WhatsApp</span>
              </a>

              <Link
                to="/fabrics"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-navy-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 transition-colors"
              >
                <span>Browse More Fabrics</span>
              </Link>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Note: Database registration and WhatsApp chat are separate workflows. Your enquiry details have already been saved to our database.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-gold-600 bg-gold-500/10 border border-gold-500/20 mb-3">
            <FileText className="w-3.5 h-3.5 text-gold-600" />
            <span>Commercial Inquiries</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Request a Fabric Quotation
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Fill in your woven fabric requirements below. Our commercial sales team in Pallipalayam, Erode will evaluate your target specifications, order quantity, and sample requirements.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-fabric-card">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot field (hidden from genuine users, traps spam bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="kt_website_trap">Leave this blank</label>
              <input
                id="kt_website_trap"
                name="honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleInputChange}
              />
            </div>

            {/* Section 1: Buyer Contact Information */}
            <div>
              <div className="border-b border-cream-200 pb-2 mb-4">
                <h3 className="font-serif text-lg font-bold text-navy-900">
                  1. Contact Information
                </h3>
                <p className="text-xs text-slate-500">
                  Please provide valid contact information so our team can reach you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Company / Organisation Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    placeholder="e.g. Global Garments Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Business Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. ramesh@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9842212112 or international format"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Country / Delivery Destination <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g. India, United Arab Emirates, Bangladesh, United States..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Fabric & Technical Requirements */}
            <div>
              <div className="border-b border-cream-200 pb-2 mb-4">
                <h3 className="font-serif text-lg font-bold text-navy-900">
                  2. Fabric & Technical Specifications
                </h3>
                <p className="text-xs text-slate-500">
                  Specify your target fabric type and order quantity. Technical attributes are optional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Fabric Type / Quality Required <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fabric_type"
                    required
                    value={formData.fabric_type}
                    onChange={handleInputChange}
                    placeholder="e.g. 100% Cotton Poplin, Poly-Cotton Twill, Yarn-Dyed Check..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Quantity Required <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 5,000 Metres / Sample roll"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Composition / Blend <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="composition"
                    value={formData.composition}
                    onChange={handleInputChange}
                    placeholder="e.g. 65/35 Poly-Cotton, 100% Cotton"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Fabric Weight / GSM <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="gsm"
                    value={formData.gsm}
                    onChange={handleInputChange}
                    placeholder="e.g. 120 GSM, 210 GSM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Fabric Width <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    placeholder="e.g. 58 inches, 60 inches"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Pattern / Colour <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="pattern_colour"
                    value={formData.pattern_colour}
                    onChange={handleInputChange}
                    placeholder="e.g. Solid White, Navy Twill, Yarn-dyed Check"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Target Price / Terms <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="target_price"
                    value={formData.target_price}
                    onChange={handleInputChange}
                    placeholder="e.g. Competitive B2B factory pricing, Ex-mill or CIF"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Detailed Message & Specific Instructions <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe any special weaving, yarn count, finish, test, or delivery schedule requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-cream-50/40"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Reference File / Swatch Uploads */}
            <div>
              <div className="border-b border-cream-200 pb-2 mb-4">
                <h3 className="font-serif text-lg font-bold text-navy-900">
                  3. Reference Attachments / Swatch Photos
                </h3>
                <p className="text-xs text-slate-500">
                  Upload up to 5 reference files (Tech packs, swatch photos, or spec sheets). Supported: JPG, PNG, WebP, PDF (Max 10MB each).
                </p>
              </div>

              {fileError && (
                <div className="mb-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {fileError}
                </div>
              )}

              <div className="border-2 border-dashed border-cream-300 rounded-2xl p-6 text-center hover:border-gold-500/50 transition-colors bg-cream-50/30">
                <Upload className="w-8 h-8 text-gold-600 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <span className="text-xs font-semibold text-navy-900 underline hover:text-gold-600">
                    Click to choose files
                  </span>
                  <span className="text-xs text-slate-500"> or drag and drop</span>
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">
                  JPG, PNG, WebP or PDF up to 10MB each (Max 5 files)
                </p>
              </div>

              {/* Uploaded File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-cream-100 border border-cream-300 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="truncate text-navy-900 font-medium">{file.name}</span>
                        <span className="text-slate-400 text-[10px]">
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span>Your information is encrypted and transmitted securely.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-navy-950 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 transition-all shadow-md"
              >
                {submitting ? (
                  <span>Saving Enquiry...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Submit Quotation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
