/**
 * ==============================================================================
 * KARTHIKEYAN TEXTILES - DOMAIN TYPES & DATA CONTRACTS
 * ==============================================================================
 */

export interface FabricCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface FabricImage {
  id: string;
  fabric_id: string;
  storage_path: string;
  alt_text: string;
  sort_order: number;
  created_at?: string;
}

export interface Fabric {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category?: FabricCategory;
  short_description: string;
  description?: string;
  
  // Technical specifications (nullable when unconfirmed)
  composition?: string | null;
  gsm?: number | null;
  width?: string | null;
  yarn_count?: string | null;
  construction?: string | null;
  warp_details?: string | null;
  weft_details?: string | null;
  
  // Visual & classification attributes
  pattern?: string | null;
  applications: string[]; // e.g., ["Shirts & Casual wear", "Trousers & Formal wear"]
  
  // Optional fabric-specific colour attributes
  color_name?: string | null;
  internal_color_ref?: string | null;
  pantone_reference?: string | null;
  pantone_guide?: string | null;
  
  // Business capability tags
  customization_available: boolean;
  sample_available: boolean;
  featured: boolean;
  published: boolean;
  is_demo?: boolean; // clearly distinguishes demo seeds from genuine admin products
  sort_order: number;
  
  images: FabricImage[];
  created_at: string;
  updated_at?: string;
}

export type QuotationStatus = 
  | 'New'
  | 'Reviewing'
  | 'Quotation Sent'
  | 'Follow-up Required'
  | 'Completed'
  | 'Closed';

export interface QuotationAttachment {
  id: string;
  quotation_id: string;
  storage_path: string;
  original_filename: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
}

export interface Quotation {
  id: string;
  reference_number: string;
  customer_name: string;
  company_name?: string | null;
  email: string;
  phone: string;
  country: string;
  
  // Target fabric info
  fabric_id?: string | null;
  fabric_name?: string | null;
  fabric_type: string;
  composition?: string | null;
  gsm?: string | null;
  width?: string | null;
  pattern_colour?: string | null;
  
  quantity: string; // e.g., "5000 metres"
  target_price?: string | null;
  message?: string | null;
  
  status: QuotationStatus;
  internal_notes?: string | null;
  
  attachments?: QuotationAttachment[];
  created_at: string;
  updated_at?: string;
}

export interface QuotationFormData {
  customer_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  fabric_id: string;
  fabric_name: string;
  fabric_type: string;
  composition: string;
  gsm: string;
  width: string;
  pattern_colour: string;
  quantity: string;
  target_price: string;
  message: string;
  honeypot: string; // Spam prevention
}

export interface CatalogueFilterState {
  searchQuery: string;
  categorySlug: string;
  pattern: string;
  application: string;
  sortBy: 'featured' | 'name_asc' | 'name_desc' | 'newest';
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'staff';
  last_sign_in?: string;
}

export interface OperationalSettings {
  company_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  business_hours: string;
  stated_capacity: string;
  experience_years: string;
  tagline: string;
  supporting_statement: string;
}
