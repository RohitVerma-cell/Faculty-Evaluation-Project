import { Routes, Route, Navigate } from 'react-router-dom';
import PrincipalLayout from '../Layout/principalLayout';

// Pages
import Dashboard from '../pages/Principal/DashboardPage';
import FacultyOverview from '../pages/Principal/FacultyOverview';
import Analytics from '../pages/Principal/Analytics';
import Profile from '../pages/Principal/profile';

export default function PrincipalRoutes() {
  return (
    <Routes>
      <Route element={<PrincipalLayout />}>

        {/* Default route */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Main pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path='faculty' element={<FacultyOverview/>}/>
        <Route path='analytics' element={<Analytics/>}/>
        <Route path='profile' element={<Profile/>}/>
        

      </Route>
    </Routes>
  );
}