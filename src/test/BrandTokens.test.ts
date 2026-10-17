import { describe, it, expect } from 'vitest';
import { BRAND_COLOR_TOKENS } from '../tokens/colors';

describe('Brand Design Tokens & Pantone Compliance', () => {
  it('does not fabricate Pantone reference codes without physical verification', () => {
    Object.values(BRAND_COLOR_TOKENS).forEach((token) => {
      // Under provisional guidelines, pantoneReference must be null until confirmed from physical book
      expect(token.pantoneReference).toBeNull();
      expect(token.confirmationStatus).toBe('pending_physical_swatch_selection');
      expect(token.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(token.rgb).toHaveProperty('r');
      expect(token.rgb).toHaveProperty('g');
      expect(token.rgb).toHaveProperty('b');
    });
  });

  it('contains all required provisional palette colours', () => {
    expect(BRAND_COLOR_TOKENS.primaryNavy).toBeDefined();
    expect(BRAND_COLOR_TOKENS.warmCream).toBeDefined();
    expect(BRAND_COLOR_TOKENS.mutedGold).toBeDefined();
    expect(BRAND_COLOR_TOKENS.slateGrey).toBeDefined();
    expect(BRAND_COLOR_TOKENS.charcoal).toBeDefined();
  });
});
