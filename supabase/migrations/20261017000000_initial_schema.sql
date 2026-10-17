-- ==============================================================================
-- KARTHIKEYAN TEXTILES - PRODUCTION DATABASE SCHEMA & SECURITY POLICIES
-- ==============================================================================
-- Migration Version: 20261017000000_initial_schema.sql
-- Database: PostgreSQL 15+ (Supabase)
-- Reference: Section 8 & Section 9 of System Specification
-- Note: Fully idempotent (can be re-run safely multiple times)

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES TABLE (ADMINISTRATIVE ACCESS CONTROL)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to check if caller is an admin (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Profiles Policies
DROP POLICY IF EXISTS "Admins can view and manage all profiles" ON public.profiles;
CREATE POLICY "Admins can view and manage all profiles"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- ==============================================================================
-- 2. FABRIC CATEGORIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.fabric_categories (
  id TEXT PRIMARY KEY DEFAULT ('cat-' || uuid_generate_v4()),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.fabric_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active fabric categories" ON public.fabric_categories;
CREATE POLICY "Public can view active fabric categories"
  ON public.fabric_categories
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage fabric categories" ON public.fabric_categories;
CREATE POLICY "Admins can manage fabric categories"
  ON public.fabric_categories
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- 3. FABRICS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.fabrics (
  id TEXT PRIMARY KEY DEFAULT ('fab-' || uuid_generate_v4()),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id TEXT REFERENCES public.fabric_categories(id) ON DELETE SET NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  
  -- Verified technical attributes (nullable when unconfirmed)
  composition TEXT,
  gsm NUMERIC,
  width TEXT,
  yarn_count TEXT,
  construction TEXT,
  warp_details TEXT,
  weft_details TEXT,
  
  -- Visual attributes
  pattern TEXT,
  applications TEXT[] DEFAULT '{}',
  
  -- Pantone & Colour attributes
  color_name TEXT,
  internal_color_ref TEXT,
  pantone_reference TEXT,
  pantone_guide TEXT,
  
  -- Capabilities & Display flags
  customization_available BOOLEAN NOT NULL DEFAULT true,
  sample_available BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.fabrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published fabrics" ON public.fabrics;
CREATE POLICY "Public can view published fabrics"
  ON public.fabrics
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

DROP POLICY IF EXISTS "Admins can manage all fabrics" ON public.fabrics;
CREATE POLICY "Admins can manage all fabrics"
  ON public.fabrics
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_fabrics_slug ON public.fabrics(slug);
CREATE INDEX IF NOT EXISTS idx_fabrics_category ON public.fabrics(category_id);
CREATE INDEX IF NOT EXISTS idx_fabrics_published ON public.fabrics(published);
CREATE INDEX IF NOT EXISTS idx_fabrics_featured ON public.fabrics(featured);

-- ==============================================================================
-- 4. FABRIC IMAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.fabric_images (
  id TEXT PRIMARY KEY DEFAULT ('img-' || uuid_generate_v4()),
  fabric_id TEXT NOT NULL REFERENCES public.fabrics(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.fabric_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view images of published fabrics" ON public.fabric_images;
CREATE POLICY "Public can view images of published fabrics"
  ON public.fabric_images
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.fabrics
      WHERE fabrics.id = fabric_images.fabric_id AND fabrics.published = true
    )
  );

DROP POLICY IF EXISTS "Admins can manage fabric images" ON public.fabric_images;
CREATE POLICY "Admins can manage fabric images"
  ON public.fabric_images
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- 5. QUOTATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quotations (
  id TEXT PRIMARY KEY DEFAULT ('quote-' || uuid_generate_v4()),
  reference_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  
  -- Target fabric
  fabric_id TEXT REFERENCES public.fabrics(id) ON DELETE SET NULL,
  fabric_type TEXT NOT NULL,
  composition TEXT,
  gsm TEXT,
  width TEXT,
  pattern_colour TEXT,
  
  quantity TEXT NOT NULL,
  target_price TEXT,
  message TEXT,
  
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN (
    'New',
    'Reviewing',
    'Quotation Sent',
    'Follow-up Required',
    'Completed',
    'Closed'
  )),
  internal_notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit quotation requests" ON public.quotations;
CREATE POLICY "Public can submit quotation requests"
  ON public.quotations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    customer_name IS NOT NULL AND
    email IS NOT NULL AND
    phone IS NOT NULL AND
    country IS NOT NULL AND
    fabric_type IS NOT NULL AND
    quantity IS NOT NULL AND
    status = 'New' AND
    internal_notes IS NULL
  );

DROP POLICY IF EXISTS "Admins can manage quotations" ON public.quotations;
CREATE POLICY "Admins can manage quotations"
  ON public.quotations
  FOR ALL
  TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_quotations_ref ON public.quotations(reference_number);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON public.quotations(status);
CREATE INDEX IF NOT EXISTS idx_quotations_created ON public.quotations(created_at DESC);

-- ==============================================================================
-- 6. QUOTATION ATTACHMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quotation_attachments (
  id TEXT PRIMARY KEY DEFAULT ('att-' || uuid_generate_v4()),
  quotation_id TEXT NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.quotation_attachments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert attachments for new quotation" ON public.quotation_attachments;
CREATE POLICY "Public can insert attachments for new quotation"
  ON public.quotation_attachments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage attachments" ON public.quotation_attachments;
CREATE POLICY "Admins can view and manage attachments"
  ON public.quotation_attachments
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- 7. SEED INITIAL VERIFIED FABRIC CATEGORIES
-- ==============================================================================
INSERT INTO public.fabric_categories (id, name, slug, description, sort_order, is_active)
VALUES
  ('cat-cotton', 'Pure Cotton', 'pure-cotton', '100% natural cotton woven fabrics for shirts, trousers, and premium apparel.', 1, true),
  ('cat-blends', 'Cotton-Poly Blends', 'cotton-poly-blends', 'Engineered poly-cotton blends combining breathability, durability, and wrinkle resistance.', 2, true),
  ('cat-poplin', 'Poplin', 'poplin', 'Smooth, fine plain-weave poplins ideal for formal shirting and uniforms.', 3, true),
  ('cat-twill', 'Twill', 'twill', 'Distinctive diagonal ribbed weave suitable for heavy-duty workwear, pants, and jackets.', 4, true),
  ('cat-checks', 'Checks & Stripes', 'checks-stripes', 'Yarn-dyed geometric weaves, gingham, madras, and structured stripes.', 5, true),
  ('cat-yarndyed', 'Yarn-Dyed', 'yarn-dyed', 'Deep, rich colours woven directly from dyed yarns with exceptional colourfastness.', 6, true),
  ('cat-speciality', 'Speciality Wovens', 'speciality-wovens', 'Custom weave structures, dobbies, and high-density industrial fabrics.', 7, true)
ON CONFLICT (slug) DO NOTHING;
