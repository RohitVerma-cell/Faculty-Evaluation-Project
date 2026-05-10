import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout         from '../layout/MainLayout';

import Dashboard          from '../pages/HOD/Dashboard';
import PendingApprovals   from '../pages/HOD/PendingApprovals';
import EntryDetail        from '../pages/HOD/EntryDetails';
import Evaluation         from '../pages/HOD/Evaluation';
import FacultyPerformance from '../pages/HOD/FacultyPerformance';
import Analytics          from '../pages/HOD/Analytics';
import Profile            from '../pages/HOD/Profile';

export default function HODRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* Default → dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* ── Main pages — match MainLayout NAV_ITEMS paths ── */}
        <Route path="dashboard"   element={<Dashboard />} />
        <Route path="approvals"   element={<PendingApprovals />} />
        <Route path="detail"      element={<EntryDetail />} />
        <Route path="evaluation"  element={<Evaluation />} />
        <Route path="performance" element={<FacultyPerformance />} />
        <Route path="analytics"   element={<Analytics />} />
        <Route path="profile"     element={<Profile />} />

      </Route>
    </Routes>
  );
}