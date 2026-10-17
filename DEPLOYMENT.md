# Karthikeyan Textiles — Complete Deployment Guide

This guide explains how to deploy the **Karthikeyan Textiles** website to production.

---

## 1. Local Preview & Testing (Currently Running)

Your local development server is currently live:
- **Local Browser URL**: [http://localhost:5174/](http://localhost:5174/) (or [http://localhost:5173/](http://localhost:5173/))
- **Local Network / Mobile Testing**: `http://192.168.1.36:5174/`

The site operates with full functionality out of the box in **Local Standalone Mode** using persistent browser storage, allowing you to test:
- The 3D cloth folds hero & interactive swatch switching
- The fabric catalogue, searching, and filtering
- The quotation request form, file uploads, and WhatsApp links
- The administrator portal at `/admin/login`

---

## 2. Option A: Zero-Config Deployment with Vercel (Recommended)

The project includes a ready-to-use [`vercel.json`](file:///Users/agil/Desktop/appa_final/vercel.json) that preconfigures SPA client-side routing rewrites, security headers, and asset caching.

### Steps to Deploy:
1. **Push your code to a Git repository** (GitHub or GitLab):
   ```bash
   git remote add origin https://github.com/<your-username>/karthikeyan-textiles.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New... > Project**.
4. Import your `karthikeyan-textiles` repository.
5. Vercel automatically detects **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. (Optional) In **Environment Variables**, add:
   - `VITE_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
   - `VITE_COMPANY_PHONE` = `+919842212112`
   - `VITE_COMPANY_LANDLINE` = `04288234112`
   - `VITE_WHATSAPP_NUMBER` = `919842212112`
   - `VITE_SUPABASE_URL` = (your Supabase URL, once created)
   - `VITE_SUPABASE_ANON_KEY` = (your Supabase anon key, once created)
7. Click **Deploy**. Your site will be live on a secure HTTPS `.vercel.app` domain in ~60 seconds!

---

## 3. Option B: Instant Drag & Drop on Netlify

The project includes [`netlify.toml`](file:///Users/agil/Desktop/appa_final/netlify.toml) and [`public/_redirects`](file:///Users/agil/Desktop/appa_final/public/_redirects).

### Drag & Drop Deployment (No Git required):
1. Build the production folder:
   ```bash
   npm run build
   ```
   *(This outputs the optimized production files to `/Users/agil/Desktop/appa_final/dist`)*
2. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3. Drag the **`dist`** folder from `/Users/agil/Desktop/appa_final/dist` and drop it into the Netlify box.
4. Netlify will instantly deploy it and provide a live URL (e.g., `https://karthikeyan-textiles.netlify.app`).

### Continuous Deployment via Git on Netlify:
1. Connect your repository on Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy site**.

---

## 4. Production Supabase & Email Setup (When Ready)

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a project.
2. **Execute Database Migration**:
   - Copy the SQL from `supabase/migrations/20261017000000_initial_schema.sql` and run it in the Supabase **SQL Editor**.
   - This provisions tables (`fabrics`, `quotations`, `categories`, `profiles`), indexes, and Row-Level Security policies.
3. **Create Storage Buckets**:
   - In Supabase Storage, create `fabric-images` (public) and `quotation-attachments` (private).
4. **Deploy Resend Email Function**:
   ```bash
   supabase functions deploy submit-quotation
   supabase secrets set RESEND_API_KEY=re_your_api_key
   supabase secrets set NOTIFICATION_RECIPIENT_EMAIL=karthikeyantextiles18@gmail.com
   ```
5. **Update Production Environment Variables**:
   Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your Vercel or Netlify dashboard.

---

## 5. Connecting a Custom Domain (e.g. `karthikeyantextiles.com`)

Once Karthikeyan Textiles purchases a custom domain name:
1. In Vercel or Netlify, navigate to **Project Settings > Domains**.
2. Enter your custom domain (e.g. `karthikeyantextiles.com`).
3. Add the two DNS records provided by the platform (usually a `CNAME` for `www` and an `A` record pointing to the platform IP) in your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).
4. The hosting provider automatically provisions and renews an official **SSL/TLS (HTTPS) Certificate** for free.
