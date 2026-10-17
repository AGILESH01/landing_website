import { describe, it, expect, beforeEach } from 'vitest';
import { quotationService } from '../services/quotationService';
import { QuotationFormData } from '../types';

describe('quotationService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const validFormData: QuotationFormData = {
    customer_name: 'Anand Kumar',
    company_name: 'Heritage Apparels Ltd',
    email: 'anand@heritageapparels.com',
    phone: '+91 9842400000',
    country: 'India',
    fabric_id: 'fab-1',
    fabric_name: 'Pure Cotton Poplin',
    fabric_type: 'Cotton Poplin',
    composition: '100% Cotton',
    gsm: '120',
    width: '58 inches',
    pattern_colour: 'White Solid',
    quantity: '5,000 Metres',
    target_price: 'Competitive B2B',
    message: 'Need sample cut first before placing bulk lot.',
    honeypot: '',
  };

  it('generates compliant reference numbers', () => {
    const ref = quotationService.generateReferenceNumber();
    expect(ref).toMatch(/^KT-\d{4}-\d{4}$/);
  });

  it('successfully submits valid quotation and stores in repository', async () => {
    const result = await quotationService.submitQuotation(validFormData);
    expect(result.success).toBe(true);
    expect(result.referenceNumber).toMatch(/^KT-\d{4}-\d{4}$/);
    expect(result.quotation.customer_name).toBe('Anand Kumar');
    expect(result.quotation.status).toBe('New');

    // Verify it appears in quotations list
    const list = await quotationService.getQuotations('all');
    expect(list.some(q => q.reference_number === result.referenceNumber)).toBe(true);
  });

  it('rejects bot submissions via honeypot trap', async () => {
    const botData: QuotationFormData = {
      ...validFormData,
      honeypot: 'http://spam-link.example.com',
    };

    await expect(quotationService.submitQuotation(botData)).rejects.toThrow(
      'Verification failed. Please try again.'
    );
  });

  it('validates mandatory buyer contact and fabric fields', async () => {
    const missingName = { ...validFormData, customer_name: '' };
    await expect(quotationService.submitQuotation(missingName)).rejects.toThrow(
      'Full Name is required.'
    );

    const invalidEmail = { ...validFormData, email: 'not-an-email' };
    await expect(quotationService.submitQuotation(invalidEmail)).rejects.toThrow(
      'A valid Email address is required.'
    );

    const missingQuantity = { ...validFormData, quantity: '' };
    await expect(quotationService.submitQuotation(missingQuantity)).rejects.toThrow(
      'Quantity Required is required.'
    );
  });

  it('enforces attachment file validation (type and count)', async () => {
    const unsupportedFile = new File(['dummy'], 'sample.exe', { type: 'application/x-msdownload' });
    await expect(
      quotationService.submitQuotation(validFormData, [unsupportedFile])
    ).rejects.toThrow(/Unsupported file type/);

    const manyFiles = [
      new File([''], '1.png', { type: 'image/png' }),
      new File([''], '2.png', { type: 'image/png' }),
      new File([''], '3.png', { type: 'image/png' }),
      new File([''], '4.png', { type: 'image/png' }),
      new File([''], '5.png', { type: 'image/png' }),
      new File([''], '6.png', { type: 'image/png' }),
    ];
    await expect(
      quotationService.submitQuotation(validFormData, manyFiles)
    ).rejects.toThrow(/Maximum 5 files allowed/);
  });

  it('generates properly encoded WhatsApp click-to-chat link with reference number', () => {
    const url = quotationService.generateWhatsAppUrl({
      reference_number: 'KT-2026-1234',
      customer_name: 'Anand Kumar',
      fabric_type: 'Cotton Poplin',
      quantity: '5000 Metres',
      country: 'India',
    });

    expect(url).toContain('https://wa.me/919842212112');
    expect(url).toContain(encodeURIComponent('KT-2026-1234'));
    expect(url).toContain(encodeURIComponent('Anand Kumar'));
    expect(url).toContain(encodeURIComponent('5000 Metres'));
  });

  it('allows administrator to update status and record internal notes', async () => {
    const result = await quotationService.submitQuotation(validFormData);
    const updated = await quotationService.updateQuotationStatus(
      result.quotation.id,
      'Reviewing',
      'Yarn availability verified with spinning mills.'
    );

    expect(updated.status).toBe('Reviewing');
    expect(updated.internal_notes).toBe('Yarn availability verified with spinning mills.');
  });
});
