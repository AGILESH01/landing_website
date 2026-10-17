/**
 * ==============================================================================
 * KARTHIKEYAN TEXTILES - BRAND DESIGN TOKENS & PANTONE COLOUR SYSTEM
 * ==============================================================================
 * Reference: Section 3.1 & Section 10 of Business Specification
 * 
 * IMPORTANT ARCHITECTURAL & BRAND NOTE:
 * The company references an official physical Pantone colour book. The final brand
 * colours will be verified against that physical book. Until official physical
 * swatch references are approved by management, the provisional digital palette
 * below provides a disciplined, authoritative visual system.
 * 
 * Digital HEX/RGB values represent screen approximations (sRGB / D65 illuminant).
 * Screen rendering cannot guarantee exact physical fabric dye reproduction,
 * which depends on substrate (cotton/poly), yarn count, weave density, and lighting.
 */

export interface ColorToken {
  name: string;
  pantoneReference: string | null;
  referenceType: 'coated' | 'uncoated' | 'textile_tpx' | 'textile_tcx' | 'provisional_unconfirmed';
  hex: string;
  rgb: { r: number; g: number; b: number };
  intendedUsage: string;
  confirmationStatus: 'confirmed_official' | 'pending_physical_swatch_selection' | 'provisional';
  notes?: string;
}

export const BRAND_COLOR_TOKENS: Record<string, ColorToken> = {
  primaryNavy: {
    name: 'Heritage Deep Navy',
    pantoneReference: null, // Pending selection from physical Pantone book
    referenceType: 'provisional_unconfirmed',
    hex: '#0D1B2A',
    rgb: { r: 13, g: 27, b: 42 },
    intendedUsage: 'Primary brand authority, dark hero backgrounds, primary text headings, high-contrast UI chrome',
    confirmationStatus: 'pending_physical_swatch_selection',
    notes: 'Provisional tone inspired by classic deep navy warp threads. Official swatch pending physical book review.'
  },
  darkNavy: {
    name: 'Midnight Weave Navy',
    pantoneReference: null,
    referenceType: 'provisional_unconfirmed',
    hex: '#070D14',
    rgb: { r: 7, g: 13, b: 20 },
    intendedUsage: 'Deepest shadow depth, 3D canvas backdrop, footer base',
    confirmationStatus: 'pending_physical_swatch_selection',
    notes: 'Deep neutral supporting dark navy.'
  },
  warmCream: {
    name: 'Unbleached Loom Ecru / Warm Cream',
    pantoneReference: null,
    referenceType: 'provisional_unconfirmed',
    hex: '#F7F4EE',
    rgb: { r: 247, g: 244, b: 238 },
    intendedUsage: 'Main page canvas background, card surfaces, clean tactile editorial negative space',
    confirmationStatus: 'pending_physical_swatch_selection',
    notes: 'Evokes natural raw greige cotton and linen unbleached fibres.'
  },
  softEcru: {
    name: 'Soft Weft Ecru',
    pantoneReference: null,
    referenceType: 'provisional_unconfirmed',
    hex: '#EFECE4',
    rgb: { r: 239, g: 236, b: 228 },
    intendedUsage: 'Subtle borders, neutral card fills, table headers',
    confirmationStatus: 'pending_physical_swatch_selection',
  },
  mutedGold: {
    name: 'Artisan Muted Brass / Gold',
    pantoneReference: null,
    referenceType: 'provisional_unconfirmed',
    hex: '#C5A059',
    rgb: { r: 197, g: 160, b: 89 },
    intendedUsage: 'Accent borders, capacity badges, interactive highlights, active tab indicators',
    confirmationStatus: 'pending_physical_swatch_selection',
    notes: 'Subtle golden shuttle/reed accent colour; never neon or garish.'
  },
  slateGrey: {
    name: 'Industrial Loom Slate',
    pantoneReference: null,
    referenceType: 'provisional_unconfirmed',
    hex: '#4A5568',
    rgb: { r: 74, g: 85, b: 104 },
    intendedUsage: 'Secondary body copy, technical captions, subtle borders',
    confirmationStatus: 'pending_physical_swatch_selection',
  },
  charcoal: {
    name: 'Dobby Charcoal',
    pantoneReference: null,
    referenceType: 'provisional_unconfirmed',
    hex: '#1A202C',
    rgb: { r: 26, g: 32, b: 44 },
    intendedUsage: 'High-legibility editorial body text, form input labels',
    confirmationStatus: 'pending_physical_swatch_selection',
  }
};

/**
 * Returns formatted CSS variable definitions or inline style objects.
 */
export const getCssBrandTokens = () => {
  return {
    '--color-navy-primary': BRAND_COLOR_TOKENS.primaryNavy.hex,
    '--color-navy-dark': BRAND_COLOR_TOKENS.darkNavy.hex,
    '--color-cream-base': BRAND_COLOR_TOKENS.warmCream.hex,
    '--color-cream-soft': BRAND_COLOR_TOKENS.softEcru.hex,
    '--color-gold-accent': BRAND_COLOR_TOKENS.mutedGold.hex,
    '--color-slate': BRAND_COLOR_TOKENS.slateGrey.hex,
    '--color-charcoal': BRAND_COLOR_TOKENS.charcoal.hex,
  };
};
