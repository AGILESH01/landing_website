import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { QuotationsPage } from './pages/QuotationsPage';
import { QuotationDetailPage } from './pages/QuotationDetailPage';
import { FabricsPage } from './pages/FabricsPage';
import { FabricEditPage } from './pages/FabricEditPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Admin Console Routes */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="quotations" element={<QuotationsPage />} />
        <Route path="quotations/:id" element={<QuotationDetailPage />} />
        <Route path="fabrics" element={<FabricsPage />} />
        <Route path="fabrics/new" element={<FabricEditPage />} />
        <Route path="fabrics/:id/edit" element={<FabricEditPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
