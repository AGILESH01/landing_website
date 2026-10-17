import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { FabricDetailPage } from './pages/FabricDetailPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { QualityPage } from './pages/QualityPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminFabrics } from './pages/admin/AdminFabrics';
import { AdminFabricForm } from './pages/admin/AdminFabricForm';
import { AdminQuotations } from './pages/admin/AdminQuotations';
import { AdminQuotationDetail } from './pages/admin/AdminQuotationDetail';
import { AdminSettings } from './pages/admin/AdminSettings';

/**
 * Public Layout Wrapper with Navigation Header & Footer
 */
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * 404 Fallback
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-cream-100">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-cream-300 shadow-sm space-y-4">
        <h1 className="font-serif text-5xl font-bold text-navy-900">404</h1>
        <h2 className="font-serif text-xl font-bold text-navy-900">Page Not Found</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          The woven fabric category or page you are searching for does not exist or has moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="fabrics" element={<CataloguePage />} />
        <Route path="fabrics/:slug" element={<FabricDetailPage />} />
        <Route path="manufacturing" element={<ManufacturingPage />} />
        <Route path="quality" element={<QualityPage />} />
        <Route path="quote" element={<QuotePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="fabrics" element={<AdminFabrics />} />
        <Route path="fabrics/new" element={<AdminFabricForm />} />
        <Route path="fabrics/:id/edit" element={<AdminFabricForm />} />
        <Route path="quotations" element={<AdminQuotations />} />
        <Route path="quotations/:id" element={<AdminQuotationDetail />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default App;
