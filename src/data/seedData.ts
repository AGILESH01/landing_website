import { Fabric, FabricCategory } from '../types';

/**
 * ==============================================================================
 * VERIFIED SEED CATEGORIES (Section 4.2 & Section 13)
 * ==============================================================================
 */
export const VERIFIED_CATEGORIES: FabricCategory[] = [
  {
    id: 'cat-1',
    name: 'Cotton',
    slug: 'cotton',
    description: 'Natural woven pure cotton fabrics engineered for breathability, softness, and superior drape across apparel and home textile applications.',
    sort_order: 1,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Polyester',
    slug: 'polyester',
    description: 'High-durability synthetic woven fabrics offering tear resistance, crease recovery, and consistent dye retention for high-volume garments.',
    sort_order: 2,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-3',
    name: 'Cotton-Polyester Blends',
    slug: 'cotton-polyester-blends',
    description: 'Balanced PC / Poly-Cotton blends combining the natural skin comfort of cotton with the wrinkle resistance and tensile strength of polyester.',
    sort_order: 3,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-4',
    name: 'Viscose / Rayon Blends',
    slug: 'viscose-rayon-blends',
    description: 'Fluid, silk-like drape and silky hand-feel fabrics suited for contemporary fashion, dresses, shirts, and womenswear.',
    sort_order: 4,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-5',
    name: 'Twill',
    slug: 'twill',
    description: 'Distinctive diagonal weave construction providing structured strength, soil resistance, and refined surface texture for trousers and workwear.',
    sort_order: 5,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-6',
    name: 'Poplin',
    slug: 'poplin',
    description: 'Crisp, fine plain-weave fabric with subtle horizontal ribs, delivering lightweight elegance and comfort for shirts and uniforms.',
    sort_order: 6,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-7',
    name: 'Yarn-Dyed Fabrics',
    slug: 'yarn-dyed-fabrics',
    description: 'Fabrics woven with pre-dyed yarns to create deep, long-lasting checks, stripes, and dimensional colour patterns with superior wash-fastness.',
    sort_order: 7,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
];

/**
 * ==============================================================================
 * CONFIRMED FILTER OPTIONS (Section 4.2 & Section 13)
 * ==============================================================================
 */
export const PATTERN_OPTIONS = [
  'Plain or solid colours',
  'Checks',
  'Stripes',
  'Printed designs',
  'Yarn-dyed patterns',
  'Jacquard or textured designs',
  'Custom designs, subject to confirmation',
];

export const APPLICATION_OPTIONS = [
  'Shirts and casual wear',
  'Trousers and formal wear',
  "Women's clothing",
  "Children's clothing",
];

/**
 * ==============================================================================
 * CONFIRMED MANUFACTURING & PROCESSING STAGES (Section 4.4)
 * ==============================================================================
 */
export const MANUFACTURING_STAGES = [
  {
    step: '01',
    name: 'Weaving',
    description: 'Interlacing warp and weft yarns with high structural precision to achieve the intended weave architecture, density, and hand-feel.',
  },
  {
    step: '02',
    name: 'Yarn Sizing',
    description: 'Protective sizing treatment applied to warp yarns to withstand weaving tensions, minimise thread breakages, and ensure smooth loom efficiency.',
  },
  {
    step: '03',
    name: 'Dyeing',
    description: 'Precision shade penetration and immersion dyeing with rigorous shade-matching against physical colour references.',
  },
  {
    step: '04',
    name: 'Printing',
    description: 'Application of distinct patterns and custom surface motifs with sharp registration and dye fixation.',
  },
  {
    step: '05',
    name: 'Washing',
    description: 'Industrial washing to scour residual sizing agents, relieve internal yarn tensions, and stabilise dimensional properties.',
  },
  {
    step: '06',
    name: 'Finishing',
    description: 'Controlled thermal and chemical finishing to calibrate target hand-feel, softness, wrinkle-recovery, and surface sheen.',
  },
  {
    step: '07',
    name: 'Quality Inspection',
    description: 'Meticulous 100% fabric review across lighted inspection perches to identify and flag surface or structural variations.',
  },
  {
    step: '08',
    name: 'GSM Verification',
    description: 'Precise area-weight measurements using calibrated circular cut samples to verify consistency against buyer specifications.',
  },
  {
    step: '09',
    name: 'Packing & Dispatch',
    description: 'Secure moisture-barrier roll packing with detailed batch labeling, protective outer wraps, and dependable transport coordination.',
  },
];

/**
 * ==============================================================================
 * CONFIRMED QUALITY ASSURANCE PROTOCOLS (Section 4.5)
 * ==============================================================================
 */
export const QUALITY_CHECKS = [
  {
    id: 'defect-inspection',
    title: 'Fabric Inspection for Defects',
    description: 'Visual examination across well-lit inspection perches to check for weaving blemishes, broken picks, mispicks, or uneven tension.',
  },
  {
    id: 'gsm-verification',
    title: 'GSM Verification',
    description: 'Gram-per-square-metre testing using calibrated circular fabric samplers and precision digital balances across every lot.',
  },
  {
    id: 'width-measurement',
    title: 'Width Measurement',
    description: 'Continuous roll-width verification across usable cut width and overall width from selvedge to selvedge.',
  },
  {
    id: 'color-matching',
    title: 'Colour Matching & Shade Checking',
    description: 'Careful visual comparison against approved physical master swatches under standard viewing illuminants (D65 / TL84).',
  },
  {
    id: 'shrinkage-testing',
    title: 'Shrinkage Testing',
    description: 'Pre-dispatch dimensional stability wash tests to monitor length-wise and width-wise shrinkage behaviour.',
  },
  {
    id: 'color-fastness',
    title: 'Colour-Fastness Testing',
    description: 'Basic wash and rubbing fastness assessments to evaluate dye stability and minimise color migration.',
  },
  {
    id: 'construction-checks',
    title: 'Warp and Weft Construction Checks',
    description: 'Thread density counts (ends per inch / picks per inch) verified to guarantee structural integrity.',
  },
  {
    id: 'final-inspection',
    title: 'Final Inspection Before Dispatch',
    description: 'Final roll tally, roll length verification, packaging integrity check, and dispatch labeling inspection.',
  },
];

/**
 * ==============================================================================
 * SEED FABRICS FOR INITIAL CATALOGUE
 * Note: Clearly flagged with `is_demo: true`. Actual commercial specifications
 * are quoted based on specific buyer orders.
 * ==============================================================================
 */
export const INITIAL_FABRICS: Fabric[] = [
  {
    id: 'fab-1',
    name: 'Premium 100% Pure Cotton Poplin',
    slug: 'pure-cotton-poplin',
    category_id: 'cat-6',
    short_description: 'Fine, breathable plain-weave cotton poplin offering a smooth hand-feel and crisp drape, ideal for formal and casual shirts.',
    description: 'Crafted from selected natural cotton fibres, this poplin weave features balanced warp and weft counts delivering exceptional comfort, smooth needle sewability, and all-day breathability. Suitable for garment manufacturers seeking reliable shirting fabric.',
    composition: '100% Pure Cotton',
    gsm: 120,
    width: '58 inches',
    yarn_count: '40s x 40s',
    construction: 'Plain Weave',
    pattern: 'Plain or solid colours',
    applications: ['Shirts and casual wear', "Women's clothing"],
    customization_available: true,
    sample_available: true,
    featured: true,
    published: true,
    is_demo: true,
    sort_order: 1,
    images: [
      {
        id: 'img-1',
        fabric_id: 'fab-1',
        storage_path: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
        alt_text: 'Pure Cotton Poplin Fabric - Plain Weave Texture',
        sort_order: 1,
      },
    ],
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 'fab-2',
    name: 'Structured Cotton-Poly Twill',
    slug: 'cotton-poly-twill',
    category_id: 'cat-5',
    short_description: 'Resilient diagonal twill weave blending soft cotton comfort with polyester durability for trousers, chinos, and work uniforms.',
    description: 'Engineered with a distinct diagonal twill line, this blended fabric combines skin comfort with high tear strength and wrinkle resistance. Built to withstand frequent laundering while maintaining structured shape and sharp appearance.',
    composition: '65% Polyester / 35% Cotton',
    gsm: 210,
    width: '58 inches',
    yarn_count: '2/30s x 2/30s',
    construction: '2/1 Twill Weave',
    pattern: 'Plain or solid colours',
    applications: ['Trousers and formal wear', 'Shirts and casual wear'],
    customization_available: true,
    sample_available: true,
    featured: true,
    published: true,
    is_demo: true,
    sort_order: 2,
    images: [
      {
        id: 'img-2',
        fabric_id: 'fab-2',
        storage_path: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
        alt_text: 'Diagonal Twill Weave Cotton-Poly Blend Fabric',
        sort_order: 1,
      },
    ],
    created_at: '2026-01-12T00:00:00Z',
  },
  {
    id: 'fab-3',
    name: 'Artisan Yarn-Dyed Check Fabric',
    slug: 'yarn-dyed-check-fabric',
    category_id: 'cat-7',
    short_description: 'Pre-dyed yarns woven into timeless check patterns with sharp lines, depth of colour, and superior colour-fastness.',
    description: 'Woven with high-grade pre-dyed yarns, our yarn-dyed checks maintain rich colour saturation across both the face and back of the fabric. Ideal for contemporary casual shirting, resort wear, and fashion collections.',
    composition: '100% Cotton',
    gsm: 135,
    width: '58 inches',
    yarn_count: '30s x 30s',
    construction: 'Yarn-Dyed Plain Weave',
    pattern: 'Checks',
    applications: ['Shirts and casual wear', "Women's clothing", "Children's clothing"],
    customization_available: true,
    sample_available: true,
    featured: true,
    published: true,
    is_demo: true,
    sort_order: 3,
    images: [
      {
        id: 'img-3',
        fabric_id: 'fab-3',
        storage_path: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80',
        alt_text: 'Yarn Dyed Check Woven Fabric Pattern',
        sort_order: 1,
      },
    ],
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'fab-4',
    name: 'Fluid Viscose-Rayon Blend Fabric',
    slug: 'viscose-rayon-blend',
    category_id: 'cat-4',
    short_description: 'Silky smooth hand-feel with dynamic drape and gentle sheen, tailored for modern womenswear, tunics, and flowing dresses.',
    description: 'Designed for fluid silhouettes and comfort in warm climates, this viscose blend provides a cooling hand-feel, soft drape, and excellent absorption of vibrant dye shades.',
    composition: 'Viscose Rayon Blend',
    gsm: 140,
    width: '56 inches',
    yarn_count: '30s Rayon',
    construction: 'Plain Weave',
    pattern: 'Plain or solid colours',
    applications: ["Women's clothing", 'Shirts and casual wear'],
    customization_available: true,
    sample_available: true,
    featured: false,
    published: true,
    is_demo: true,
    sort_order: 4,
    images: [
      {
        id: 'img-4',
        fabric_id: 'fab-4',
        storage_path: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        alt_text: 'Fluid Drape Viscose Rayon Fabric',
        sort_order: 1,
      },
    ],
    created_at: '2026-01-18T00:00:00Z',
  },
  {
    id: 'fab-5',
    name: 'Classic Yarn-Dyed Stripe Poplin',
    slug: 'yarn-dyed-stripe-poplin',
    category_id: 'cat-7',
    short_description: 'Crisp Bengal and pinstripe woven shirting fabric made with colourfast dyed yarns for executive and casual shirting.',
    description: 'A benchmark shirting quality combining the tight, smooth surface of poplin with precise yarn-dyed striping. Provides exceptional sewability, crisp collar roll, and wash stability.',
    composition: 'Cotton-Polyester Blend',
    gsm: 115,
    width: '58 inches',
    yarn_count: '50s x 50s',
    construction: 'Poplin Weave',
    pattern: 'Stripes',
    applications: ['Shirts and casual wear', 'Trousers and formal wear'],
    customization_available: true,
    sample_available: true,
    featured: true,
    published: true,
    is_demo: true,
    sort_order: 5,
    images: [
      {
        id: 'img-5',
        fabric_id: 'fab-5',
        storage_path: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
        alt_text: 'Yarn-Dyed Stripe Shirty Poplin Fabric',
        sort_order: 1,
      },
    ],
    created_at: '2026-01-20T00:00:00Z',
  },
  {
    id: 'fab-6',
    name: 'Heavy-Duty Industrial Polyester Weave',
    slug: 'industrial-polyester-weave',
    category_id: 'cat-2',
    short_description: 'Dense, high-tensile polyester woven cloth with exceptional tear resistance and dimensional stability for demanding applications.',
    description: 'Engineered for high-stress applications, pocketing, linings, and industrial uniform requirements where durability and zero colour bleeding are paramount.',
    composition: '100% Filament Polyester',
    gsm: 240,
    width: '60 inches',
    yarn_count: '300D x 300D',
    construction: 'Dense Plain Weave',
    pattern: 'Plain or solid colours',
    applications: ['Trousers and formal wear'],
    customization_available: true,
    sample_available: true,
    featured: false,
    published: true,
    is_demo: true,
    sort_order: 6,
    images: [
      {
        id: 'img-6',
        fabric_id: 'fab-6',
        storage_path: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
        alt_text: 'Industrial Heavy Duty Woven Polyester Fabric',
        sort_order: 1,
      },
    ],
    created_at: '2026-01-22T00:00:00Z',
  },
];
