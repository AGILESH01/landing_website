/**
 * ==============================================================================
 * SUPABASE EDGE FUNCTION: submit-quotation
 * ==============================================================================
 * Secure server-side quotation processing, input validation, and transactional
 * email notification dispatch using Resend.
 * 
 * Environment Secrets Required:
 * - RESEND_API_KEY: Resend Transactional Email API Key (re_...)
 * - TRANSACTIONAL_EMAIL_SENDER: Verified domain sender (e.g. notifications@karthikeyantextiles.com)
 * - NOTIFICATION_RECIPIENT_EMAIL: karthikeyantextiles18@gmail.com
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface QuotationPayload {
  quotation: {
    reference_number: string;
    customer_name: string;
    company_name?: string | null;
    email: string;
    phone: string;
    country: string;
    fabric_type: string;
    composition?: string | null;
    gsm?: string | null;
    width?: string | null;
    pattern_colour?: string | null;
    quantity: string;
    target_price?: string | null;
    message?: string | null;
    created_at: string;
  };
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { quotation }: QuotationPayload = await req.json();

    if (!quotation || !quotation.reference_number || !quotation.email) {
      return new Response(
        JSON.stringify({ error: 'Invalid quotation payload.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const senderEmail = Deno.env.get('TRANSACTIONAL_EMAIL_SENDER') || 'onboarding@resend.dev';
    const recipientEmail = Deno.env.get('NOTIFICATION_RECIPIENT_EMAIL') || 'karthikeyantextiles18@gmail.com';

    // If Resend API Key is not set, log safely and return status
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not configured in Supabase project secrets. Email notification skipped.');
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Quotation recorded. Email notification deferred (API key unconfigured).',
          emailDelivered: false,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Construct Professional HTML Notification for Karthikeyan Textiles Commercial Team
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; border: 1px solid #E2DDD4; border-radius: 8px; overflow: hidden;">
        <div style="background: #0D1B2A; color: #FFFFFF; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px;">KARTHIKEYAN TEXTILES</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #C5A059;">NEW COMMERCIAL QUOTATION REQUEST</p>
        </div>

        <div style="padding: 24px; color: #1A202C; font-size: 14px; line-height: 1.6;">
          <div style="background: #FFFFFF; border: 1px solid #EFECE4; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #718096; text-transform: uppercase;">Reference Number</p>
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #0D1B2A; font-family: monospace;">${quotation.reference_number}</p>
          </div>

          <h3 style="font-size: 15px; color: #0D1B2A; border-bottom: 1px solid #E2DDD4; padding-bottom: 6px; margin-top: 0;">Buyer Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr><td style="padding: 6px 0; color: #718096; width: 140px;">Customer Name:</td><td style="font-weight: bold;">${quotation.customer_name}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Company:</td><td>${quotation.company_name || 'Not provided'}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Email:</td><td><a href="mailto:${quotation.email}" style="color: #0D1B2A;">${quotation.email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Phone / WhatsApp:</td><td><a href="tel:${quotation.phone}" style="color: #0D1B2A;">${quotation.phone}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Destination:</td><td style="font-weight: bold;">${quotation.country}</td></tr>
          </table>

          <h3 style="font-size: 15px; color: #0D1B2A; border-bottom: 1px solid #E2DDD4; padding-bottom: 6px;">Fabric Requirements</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr><td style="padding: 6px 0; color: #718096; width: 140px;">Fabric Type:</td><td style="font-weight: bold;">${quotation.fabric_type}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Quantity Required:</td><td style="font-weight: bold; color: #876526;">${quotation.quantity}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Composition / Blend:</td><td>${quotation.composition || '—'}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Fabric Weight:</td><td>${quotation.gsm ? `${quotation.gsm} GSM` : '—'}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Width:</td><td>${quotation.width || '—'}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Pattern / Colour:</td><td>${quotation.pattern_colour || '—'}</td></tr>
            <tr><td style="padding: 6px 0; color: #718096;">Target Price:</td><td>${quotation.target_price || '—'}</td></tr>
          </table>

          ${quotation.message ? `
            <h3 style="font-size: 15px; color: #0D1B2A; border-bottom: 1px solid #E2DDD4; padding-bottom: 6px;">Buyer Notes</h3>
            <p style="background: #FFFFFF; padding: 12px; border-radius: 6px; border: 1px solid #EFECE4; margin: 0 0 20px; font-size: 13px;">
              ${quotation.message}
            </p>
          ` : ''}

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://wa.me/${quotation.phone.replace(/[^0-9]/g, '')}" style="background: #25D366; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px; display: inline-block; margin-right: 8px;">Reply via WhatsApp</a>
          </div>
        </div>

        <div style="background: #EFECE4; padding: 14px; text-align: center; font-size: 11px; color: #718096;">
          Karthikeyan Textiles • Pallipalayam, Erode, Tamil Nadu, India • Capacity: 10 Lakh Metres/Month
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Karthikeyan Textiles <${senderEmail}>`,
        to: [recipientEmail],
        subject: `New Fabric Quotation Request [${quotation.reference_number}] - ${quotation.customer_name} (${quotation.quantity})`,
        html: emailHtml,
      }),
    });

    const resData = await res.json();

    return new Response(
      JSON.stringify({ success: true, emailDelivered: true, data: resData }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Edge function error:', errorMsg);
    return new Response(
      JSON.stringify({ error: errorMsg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
