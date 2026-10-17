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
  company_name: string | null;
  email: string;
  phone: string;
  country: string;
  fabric_id: string | null;
  fabric_name?: string | null;
  fabric_type: string;
  composition: string | null;
  gsm: string | null;
  width: string | null;
  pattern_colour: string | null;
  quantity: string;
  target_price: string | null;
  message: string | null;
  status: QuotationStatus;
  internal_notes: string | null;
  attachments?: QuotationAttachment[];
  created_at: string;
  updated_at: string;
}

export interface FabricCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

export interface Fabric {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category_name?: string;
  short_description: string;
  description?: string;
  composition: string;
  gsm?: number;
  width?: string;
  yarn_count?: string;
  construction?: string;
  warp_details?: string;
  weft_details?: string;
  pattern?: string;
  applications: string[];
  color_name?: string;
  internal_color_ref?: string;
  pantone_reference?: string | null;
  pantone_guide?: string | null;
  customization_available: boolean;
  sample_available: boolean;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface OperationalSettings {
  company_name: string;
  phone: string;
  landline: string;
  whatsapp: string;
  email: string;
  location: string;
  business_hours: string;
  stated_capacity: string;
  experience_years: string;
  tagline: string;
  supporting_statement: string;
}
