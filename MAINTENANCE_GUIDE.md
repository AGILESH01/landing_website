# Karthikeyan Textiles — Beginner-Friendly Website Maintenance Guide

This guide is designed for non-technical team members and administrators managing the Karthikeyan Textiles website.

---

## 1. How to Add a New Fabric to the Catalogue

1. Sign in to the **Admin Portal** at `/admin/login`.
2. Click on **Fabric Management** in the left sidebar.
3. Click the dark **+ Add New Fabric** button at the top right.
4. Fill in:
   - **Fabric Name** (e.g. `Pure Cotton Poplin 40s`)
   - **Category** (e.g. `Poplin`, `Cotton`, `Twill`, etc.)
   - **Short Description** (appears on the 3D swatch card)
   - **Full Description** (appears on the individual fabric page)
   - **Verified Technical Attributes** (Composition, GSM, Width, Yarn Count, Weave Structure)
   - **Application Tags** (e.g. Shirts, Trousers, Women's clothing)
   - **Image URL or Storage Path**
5. Ensure **Published (Publicly Visible)** is checked if you want it live immediately.
6. Click **Save Fabric Record**. It will appear in the public catalogue instantly.

---

## 2. How to Update an Existing Fabric

1. Go to **Admin Portal > Fabric Management**.
2. Find the fabric in the list or use the search box.
3. Click the **Edit (pencil icon)** on the right side of the row.
4. Make the necessary changes (e.g. update GSM, edit description, or change pattern).
5. Click **Save Fabric Record**.

---

## 3. How to Replace a Product Image

1. Go to **Admin Portal > Fabric Management > Edit** on the relevant fabric.
2. In the **Main Swatch Image URL / Storage Path** field:
   - Paste the new public image URL or Supabase storage path.
   - You will see the small image preview update automatically.
3. Click **Save Fabric Record**.

---

## 4. How to Review and Manage Quotations

1. In the Admin Portal, click **Quotation Inquiries** in the sidebar.
2. Filter enquiries by status (`New`, `Reviewing`, `Quotation Sent`, `Completed`).
3. Click **Review** on any enquiry to open its details page:
   - View the buyer's name, email, phone/WhatsApp, and destination country.
   - Review requested fabric type, quantity, and technical requirements.
   - Download attached files or swatch photos uploaded by the buyer.
   - Click **WhatsApp** or **Email Buyer** to reply directly.
   - Change the **Commercial Status** (e.g. from `New` to `Reviewing` or `Quotation Sent`).
   - Add **Private Internal Notes** (e.g. record mill costing, target delivery date, or courier dispatch tracking). Internal notes are strictly private and never visible to the buyer.
   - Click **Update Quotation** to save.

---

## 5. How to Change Business Contact Details

1. Go to **Admin Portal > System Settings**.
2. Under **Verified Public Business Profile**, you can update:
   - Direct Phone number
   - WhatsApp number
   - Official Email
   - Operating Hours (e.g. `Monday – Saturday, 9:00 AM – 8:00 PM IST`)
   - Location Locality
   - Stated Capacity
3. Click **Save Business Settings**. The changes will update immediately across the website header, footer, and contact page.

---

## 6. How to Update Approved Pantone Brand References

The company uses an official physical Pantone colour book. When management approves the physical swatches:

1. Open the file `src/tokens/colors.ts` in your code editor.
2. Locate the token you wish to update (e.g. `primaryNavy`).
3. Change:
   ```typescript
   pantoneReference: 'PANTONE 19-4024 TCX', // replace null with official identifier
   confirmationStatus: 'confirmed_official',
   ```
4. Check that the digital HEX value closely resembles the physical swatch under D65 daylight viewing.
5. Save the file. The updated status will reflect in the Admin Settings Pantone Registry table.

---

## 7. How to Replace the Logo

The website uses a scalable SVG monogram combining warp and weft threads into an interwoven 'K'.

- To modify or update the logo icon or typography, edit `src/components/brand/Logo.tsx`.
- To update the browser tab icon, replace `public/favicon.svg` with your new SVG icon.

---

## 8. How to Change Website Copy

- **Homepage Copy & Taglines**: `src/pages/HomePage.tsx`
- **Manufacturing Stages**: `src/data/seedData.ts` under `MANUFACTURING_STAGES`
- **Quality Assurance Protocols**: `src/data/seedData.ts` under `QUALITY_CHECKS`
- **Fabric Categories**: `src/data/seedData.ts` under `VERIFIED_CATEGORIES`
