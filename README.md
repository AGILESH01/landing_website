# Karthikeyan Textiles — Official B2B Website & Digital Showroom

> **"Quality Woven. Global Reach."**  
> *"Your Fabric Requirements. Our Manufacturing Expertise. Quality You Expect, Prices You’ll Appreciate."*

A production-grade, full-stack website and digital textile showroom built for **Karthikeyan Textiles**, a woven-fabric manufacturing and processing specialist based in **Pallipalayam, Erode, Tamil Nadu, India**, with over 25 years of industry experience and a stated monthly production capacity of **10 Lakh metres (1,000,000 metres)**.

---

## 1. Project Overview & Business Profile

| Property | Official Business Details |
| :--- | :--- |
| **Company Name** | Karthikeyan Textiles |
| **Location** | Pallipalayam, Erode, Tamil Nadu, India |
| **Industry** | Woven-fabric manufacturing and processing |
| **Experience** | More than 25 years |
| **Stated Production Capacity** | 10 Lakh metres per month (1,000,000 metres/month) |
| **Direct Mobile Phone** | `+91 9842212112` |
| **Office Landline** | `04288 234112` |
| **WhatsApp Business** | `+91 9842212112` |
| **Official Email** | `karthikeyantextiles18@gmail.com` |
| **Business Hours** | Monday – Saturday, 9:00 AM – 8:00 PM IST (Sunday Closed) |
| **Target Clients** | Garment manufacturers, textile traders, clothing brands, export houses, retail stores |

---

## 2. Core Architecture & Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with Rollup code-splitting & manual chunks
- **Styling**: Tailwind CSS with custom editorial design tokens
- **3D Immersion**: Three.js procedural woven cloth simulation, micro-weave shaders, tactile 3D perspective cards, and prefers-reduced-motion fallback
- **Routing**: React Router v6 with public & protected admin layout trees
- **Icons**: Lucide React
- **Backend & Database**: Supabase PostgreSQL with Row Level Security (RLS) policies
- **Zero-Dependency Fallback**: Integrated local in-memory & LocalStorage repository for offline development, local evaluation, and prototyping without requiring immediate Supabase setup
- **Email Delivery**: Resend transactional email integration via Supabase Edge Function (`submit-quotation`)
- **Testing**: Vitest with `@testing-library/react` and `jsdom`

---

## 3. Directory Structure

```
appa_final/
├── public/
│   ├── favicon.svg             # Scalable interwoven 'K' monogram
│   ├── robots.txt              # SEO crawler directives
│   └── sitemap.xml             # XML sitemap with canonical URLs
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── HeroTextileCanvas.tsx   # Three.js 3D cloth folds & swatch switching
│   │   │   └── FabricCard3D.tsx        # 3D perspective tilt & tactile shadow cards
│   │   ├── brand/
│   │   │   └── Logo.tsx                # Scalable interwoven 'K' monogram SVG
│   │   ├── common/
│   │   │   ├── Header.tsx              # Responsive top bar, quick contact, nav
│   │   │   └── Footer.tsx              # Rich footer, verified contact, transparency note
│   │   └── home/
│   │       ├── CapacityCallout.tsx     # 10 Lakh Metres/Month capacity spotlight
│   │       ├── ManufacturingSection.tsx # 9 confirmed processing stages
│   │       ├── QualityAssuranceSection.tsx # 8 confirmed quality checkpoints
│   │       └── YarnToFabricSection.tsx # Scroll-driven yarn-to-cloth storytelling
│   ├── data/
│   │   └── seedData.ts         # Verified categories, patterns, apps, and initial fabrics
│   ├── lib/
│   │   └── supabase.ts         # Supabase client + local offline repository adapter
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminFabricForm.tsx     # Add / Edit fabric specifications & images
│   │   │   ├── AdminFabrics.tsx        # Fabric list, draft/publish toggle, delete
│   │   │   ├── AdminLayout.tsx         # Protected admin layout & sidebar
│   │   │   ├── AdminLogin.tsx          # Administrator sign in
│   │   │   ├── AdminOverview.tsx       # Live metrics & recent enquiries table
│   │   │   ├── AdminQuotationDetail.tsx# Enquiry review, notes, status, files
│   │   │   ├── AdminQuotations.tsx     # Searchable quotation management table
│   │   │   └── AdminSettings.tsx       # Profile, Pantone tokens, connection health
│   │   ├── CataloguePage.tsx   # Search, multi-filtering, 3D product grid
│   │   ├── ContactPage.tsx     # Verified contact info & Pallipalayam locality map
│   │   ├── FabricDetailPage.tsx# Image gallery, verified specs, sample quote action
│   │   ├── HomePage.tsx        # Split-screen 3D hero, storytelling, featured fabrics
│   │   ├── ManufacturingPage.tsx # Detailed 9 stages of fabric manufacturing
│   │   ├── QualityPage.tsx     # Detailed 8 quality assurance protocols
│   │   └── QuotePage.tsx       # Complete quotation form with honeypot & uploads
│   ├── services/
│   │   ├── fabricService.ts    # Fabric data access, filtering, admin CRUD
│   │   └── quotationService.ts # Enquiry submission, validation, WhatsApp generator
│   ├── test/                   # Vitest unit & integration test suites
│   ├── tokens/
│   │   └── colors.ts           # Pantone-inspired provisional tokens & notes
│   ├── types/
│   │   └── index.ts            # Domain data contracts & interfaces
│   ├── App.tsx                 # Application routing
│   ├── index.css               # Tailwind & 3D CSS utilities
│   └── main.tsx                # React root mount
├── supabase/
│   ├── functions/
│   │   └── submit-quotation/   # Edge function for Resend email notification
│   └── migrations/
│       └── 20261017000000_initial_schema.sql # PostgreSQL schema & RLS policies
├── .env.example                # Documented configuration variables
├── tailwind.config.js          # Pantone brand palette & shadows
├── tsconfig.json               # TypeScript strict configuration
└── vite.config.ts              # Vite configuration with chunk splitting
```

---

## 4. Local Installation & Development

### Prerequisites
- Node.js v18+ (tested on Node v26)
- npm v9+

### Step-by-Step Setup
1. **Clone or enter the directory**:
   ```bash
   cd /path/to/appa_final
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional for local testing)**:
   ```bash
   cp .env.example .env
   ```
   *Note: If no Supabase credentials are provided, the site automatically boots in **Local Offline Mode**, enabling full testing of the catalogue, quotation form, and admin portal using local persistent storage.*

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Run the test suite**:
   ```bash
   npm run test
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```

---

## 5. Supabase Database & Security Setup

When provisioning the production Supabase project:

1. **Create a new Supabase project** at [supabase.com](https://supabase.com).
2. **Execute Database Migration**:
   - Go to **SQL Editor** in the Supabase Dashboard.
   - Open and execute the migration file: `supabase/migrations/20261017000000_initial_schema.sql`.
   - This sets up `profiles`, `fabric_categories`, `fabrics`, `fabric_images`, `quotations`, `quotation_attachments`, and enables strict **Row-Level Security (RLS)**.
3. **Storage Buckets**:
   - In Supabase Storage, create two buckets:
     * `fabric-images` (Public: `true`)
     * `quotation-attachments` (Public: `false` — private to administrators)
4. **Provision Administrator Account**:
   - In Supabase Auth, invite or create an administrative user (e.g., `admin@karthikeyantextiles.com`).
   - In SQL Editor, grant the admin role to that user's UUID:
     ```sql
     INSERT INTO public.profiles (id, email, role)
     VALUES ('<USER-UUID-FROM-AUTH>', 'admin@karthikeyantextiles.com', 'admin')
     ON CONFLICT (id) DO UPDATE SET role = 'admin';
     ```
5. **Update `.env`**:
   ```env
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-publishable-key>
   ```

---

## 6. Transactional Email Notification Setup (Resend)

To deliver instant email notifications to `karthikeyantextiles18@gmail.com` when a quotation is received:

1. Create an account at [resend.com](https://resend.com).
2. Generate an API Key (starts with `re_...`).
3. Deploy the Edge Function using Supabase CLI:
   ```bash
   supabase functions deploy submit-quotation --project-ref <your-project-id>
   ```
4. Set Secrets in Supabase:
   ```bash
   supabase secrets set RESEND_API_KEY=re_your_api_key_here
   supabase secrets set TRANSACTIONAL_EMAIL_SENDER=notifications@yourdomain.com
   supabase secrets set NOTIFICATION_RECIPIENT_EMAIL=karthikeyantextiles18@gmail.com
   ```
*If unconfigured, the application logs a graceful warning and retains the saved quotation in the database without disrupting the customer's submission.*

---

## 7. Deployment Instructions (Vercel / Netlify)

### Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. In Vercel, click **Add New Project** and select the repository.
3. Framework Preset: **Vite**.
4. Set Environment Variables in Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_PUBLIC_SITE_URL`
5. Click **Deploy**.

---

## 8. Business Transparency & Accuracy Notice

- **Certifications**: Karthikeyan Textiles currently holds no formal third-party certifications or lab accreditations. No certification badges are displayed.
- **Production Equipment**: Machinery brands, loom models, and factory counts remain uninvented in adherence to strict verification guidelines.
- **Pantone References**: The company references a physical Pantone colour reference book. Provisional digital colours are documented in `src/tokens/colors.ts` with `pantoneReference: null` until physical swatch selection is approved.
- **Stated Capacity**: 10 Lakh metres per month (1,000,000 metres/month) coordinated across the Pallipalayam/Erode weaving and processing belt.
