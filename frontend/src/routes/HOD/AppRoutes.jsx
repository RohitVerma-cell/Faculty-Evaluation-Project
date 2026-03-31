import { Routes, Route } from 'react-router-dom'
import MainLayout from '../../layouts/HOD/MainLayout'
import Dashboard         from '../../pages/HOD/Dashboard'
import PendingApprovals  from '../../pages/HOD/PendingApprovals'
import EntryDetail       from '../../pages/HOD/EntryDetail'
import Evaluation        from '../../pages/HOD/Evaluation'
import FacultyPerformance from '../../pages/HOD/FacultyPerformance'
import Analytics         from '../../pages/HOD/Analytics'
import Profile           from '../../pages/HOD/Profile'

export default function HODAppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path=""                 element={<Dashboard />} />
        <Route path="/approvals/"        element={<PendingApprovals />} />
        <Route path="/approvals/detail" element={<EntryDetail />} />
        <Route path="/evaluation"       element={<Evaluation />} />
        <Route path="/performance"      element={<FacultyPerformance />} />
        <Route path="/analytics"        element={<Analytics />} />
        <Route path="/profile"          element={<Profile />} />
      </Routes>
    </MainLayout>
  )
}
