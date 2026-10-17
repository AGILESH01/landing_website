import { supabase, isSupabaseConfigured, getLocalStore, saveLocalQuotations } from '../lib/supabase';
import { Quotation, QuotationFormData, QuotationStatus, QuotationAttachment } from '../types';

export interface SubmitQuotationResult {
  success: boolean;
  referenceNumber: string;
  quotation: Quotation;
  emailSent?: boolean;
  error?: string;
}

export const quotationService = {
  /**
   * Generates unique, professional reference number (e.g., KT-2026-4891)
   */
  generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `KT-${year}-${randomHex}`;
  },

  /**
   * Submits quotation enquiry with client/server validation, file checks,
   * database storage, and email notification trigger.
   */
  async submitQuotation(
    formData: QuotationFormData,
    files?: File[]
  ): Promise<SubmitQuotationResult> {
    // 1. Spam Prevention (Honeypot check)
    if (formData.honeypot && formData.honeypot.trim() !== '') {
      console.warn('Spam submission detected and blocked via honeypot.');
      throw new Error('Verification failed. Please try again.');
    }

    // 2. Required Fields Validation
    if (!formData.customer_name?.trim()) throw new Error('Full Name is required.');
    if (!formData.email?.trim() || !formData.email.includes('@')) throw new Error('A valid Email address is required.');
    if (!formData.phone?.trim()) throw new Error('Phone or WhatsApp number is required.');
    if (!formData.country?.trim()) throw new Error('Country is required.');
    if (!formData.fabric_type?.trim()) throw new Error('Fabric Type is required.');
    if (!formData.quantity?.trim()) throw new Error('Quantity Required is required.');

    // 3. File Validation
    const attachments: QuotationAttachment[] = [];
    if (files && files.length > 0) {
      if (files.length > 5) {
        throw new Error('Maximum 5 files allowed per quotation inquiry.');
      }

      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      const maxSizeBytes = 10 * 1024 * 1024; // 10MB

      for (const file of files) {
        if (!allowedMimeTypes.includes(file.type)) {
          throw new Error(`Unsupported file type: "${file.name}". Allowed types: JPG, PNG, WebP, PDF.`);
        }
        if (file.size > maxSizeBytes) {
          throw new Error(`File "${file.name}" exceeds the maximum 10MB limit.`);
        }
      }
    }

    const referenceNumber = this.generateReferenceNumber();
    const quotationId = `quote-${Date.now()}`;
    const now = new Date().toISOString();

    // Process files if present
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let storagePath = `attachments/${referenceNumber}/${file.name}`;

        if (isSupabaseConfigured && supabase) {
          try {
            const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const path = `${referenceNumber}/${cleanName}`;
            const { error: uploadError } = await supabase.storage
              .from('quotation-attachments')
              .upload(path, file);

            if (!uploadError) {
              storagePath = path;
            }
          } catch (uploadErr) {
            console.warn('Storage upload error, retaining reference:', uploadErr);
          }
        }

        attachments.push({
          id: `att-${Date.now()}-${i}`,
          quotation_id: quotationId,
          storage_path: storagePath,
          original_filename: file.name,
          mime_type: file.type,
          size_bytes: file.size,
          created_at: now,
        });
      }
    }

    const newQuotation: Quotation = {
      id: quotationId,
      reference_number: referenceNumber,
      customer_name: formData.customer_name.trim(),
      company_name: formData.company_name?.trim() || null,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      fabric_id: formData.fabric_id || null,
      fabric_name: formData.fabric_name || null,
      fabric_type: formData.fabric_type.trim(),
      composition: formData.composition?.trim() || null,
      gsm: formData.gsm?.trim() || null,
      width: formData.width?.trim() || null,
      pattern_colour: formData.pattern_colour?.trim() || null,
      quantity: formData.quantity.trim(),
      target_price: formData.target_price?.trim() || null,
      message: formData.message?.trim() || null,
      status: 'New',
      internal_notes: null,
      attachments: attachments,
      created_at: now,
      updated_at: now,
    };

    let emailSent = false;

    // 4. Database Persistence (Supabase or LocalStore)
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: dbError } = await supabase
          .from('quotations')
          .insert([{
            reference_number: newQuotation.reference_number,
            customer_name: newQuotation.customer_name,
            company_name: newQuotation.company_name,
            email: newQuotation.email,
            phone: newQuotation.phone,
            country: newQuotation.country,
            fabric_id: newQuotation.fabric_id,
            fabric_type: newQuotation.fabric_type,
            composition: newQuotation.composition,
            gsm: newQuotation.gsm,
            width: newQuotation.width,
            pattern_colour: newQuotation.pattern_colour,
            quantity: newQuotation.quantity,
            target_price: newQuotation.target_price,
            message: newQuotation.message,
            status: newQuotation.status,
            created_at: now,
          }]);

        if (dbError) {
          console.warn('Database insert error, falling back to local store:', dbError);
          const { quotations } = getLocalStore();
          saveLocalQuotations([newQuotation, ...quotations]);
        } else {
          // Trigger server-side email edge function if available
          try {
            const { error: fnError } = await supabase.functions.invoke('submit-quotation', {
              body: { quotation: newQuotation },
            });
            if (!fnError) emailSent = true;
          } catch {
            // Email delivery failure should not void the saved quotation
            emailSent = false;
          }
        }
      } catch (err) {
        console.warn('Supabase quotation submission failed, saving locally:', err);
        const { quotations } = getLocalStore();
        saveLocalQuotations([newQuotation, ...quotations]);
      }
    } else {
      // Local fallback persistence
      const { quotations } = getLocalStore();
      saveLocalQuotations([newQuotation, ...quotations]);
    }

    return {
      success: true,
      referenceNumber,
      quotation: newQuotation,
      emailSent,
    };
  },

  /**
   * Generates compliant WhatsApp click-to-chat URL with pre-filled message
   * International phone format: 919842212112
   */
  generateWhatsAppUrl(quotation: Partial<QuotationFormData & { reference_number?: string }>): string {
    const phone = '919842212112'; // +91 9842212112 without plus or spaces
    
    let text = `Hello Karthikeyan Textiles,\n\nI would like to inquire about fabric manufacturing.\n`;
    if (quotation.reference_number) {
      text += `*Enquiry Reference:* ${quotation.reference_number}\n`;
    }
    if (quotation.customer_name) {
      text += `*Name:* ${quotation.customer_name}\n`;
    }
    if (quotation.company_name) {
      text += `*Company:* ${quotation.company_name}\n`;
    }
    if (quotation.fabric_type) {
      text += `*Fabric Required:* ${quotation.fabric_type}\n`;
    }
    if (quotation.quantity) {
      text += `*Quantity:* ${quotation.quantity}\n`;
    }
    if (quotation.country) {
      text += `*Country / Delivery:* ${quotation.country}\n`;
    }
    if (quotation.message) {
      text += `*Details:* ${quotation.message}\n`;
    }

    text += `\nPlease provide quotation and sample availability details. Thank you!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  },

  /**
   * Admin: Get list of all quotations
   */
  async getQuotations(statusFilter?: QuotationStatus | 'all'): Promise<Quotation[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from('quotations')
          .select(`*, attachments:quotation_attachments(*)`)
          .order('created_at', { ascending: false });

        if (statusFilter && statusFilter !== 'all') {
          query = query.eq('status', statusFilter);
        }

        const { data, error } = await query;
        if (!error && data) return data as Quotation[];
      } catch (err) {
        console.warn('Supabase quotations lookup failed, using local store:', err);
      }
    }

    const { quotations } = getLocalStore();
    if (statusFilter && statusFilter !== 'all') {
      return quotations.filter(q => q.status === statusFilter);
    }
    return quotations;
  },

  /**
   * Admin: Update enquiry status and internal notes
   */
  async updateQuotationStatus(
    id: string,
    status: QuotationStatus,
    internalNotes?: string
  ): Promise<Quotation> {
    const now = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('quotations')
          .update({
            status,
            internal_notes: internalNotes,
            updated_at: now,
          })
          .eq('id', id)
          .select()
          .single();

        if (!error && data) return data as Quotation;
      } catch (err) {
        console.warn('Supabase update failed, using local store:', err);
      }
    }

    const { quotations } = getLocalStore();
    const idx = quotations.findIndex(q => q.id === id);
    if (idx === -1) throw new Error('Quotation not found.');

    const updated = {
      ...quotations[idx],
      status,
      internal_notes: internalNotes !== undefined ? internalNotes : quotations[idx].internal_notes,
      updated_at: now,
    };
    quotations[idx] = updated;
    saveLocalQuotations(quotations);
    return updated;
  }
};
