// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth }   from '../context/AuthContext';
// import FacultyRoutes from './FacultyRoutes';
// import HODRoutes     from './HODRoutes';
// import LoginPage     from '../pages/auth/Login';

// const ROLE_HOME = {
//   faculty:   '/faculty/dashboard',
//   hod:       '/HOD/dashboard',
//   principal: '/principal/dashboard',
// };

// export default function AppRouter() {
//   const { user } = useAuth();

//   return (
//     <Routes>

//       {/* ── Login Page ── */}
//       <Route
//         path="/login"
//         element={
//           // Already logged in toh redirect karo
//           user
//             ? <Navigate to={ROLE_HOME[user.role] || '/faculty/dashboard'} replace />
//             : <LoginPage />
//         }
//       />

//       {/* ── Faculty Routes ── */}
//       <Route
//         path="/faculty/*"
//         element={
//           !user
//             ? <Navigate to="/login" replace />
//             : user.role !== 'faculty'
//               ? <Navigate to={ROLE_HOME[user.role]} replace />
//               : <FacultyRoutes />
//         }
//       />

//       {/* ── HoD Routes ── */}
//       <Route
//         path="/HOD/*"
//         element={
//           !user
//             ? <Navigate to="/login" replace />
//             : user.role !== 'hod'
//               ? <Navigate to={ROLE_HOME[user.role]} replace />
//               : <HODRoutes />
//         }
//       />

//       {/* ── Future Routes ── */}
//       {/* <Route path="/principal/*" element={...} /> */}

//       {/* ── Default ── */}
//       <Route
//         path="*"
//         element={
//           user
//             ? <Navigate to={ROLE_HOME[user.role] || '/faculty/dashboard'} replace />
//             : <Navigate to="/login" replace />
//         }
//       />

//     </Routes>
//   );
// }

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FacultyRoutes from './FacultyRoutes';
import HODRoutes from './HODRoutes';
import LoginPage from '../pages/auth/Login';

const ROLE_HOME = {
  faculty: '/faculty/dashboard',
  hod: '/HOD/dashboard',
  principal: '/principal/dashboard',
};

export default function AppRouter() {
  const { user } = useAuth();

  // ✅ Normalize role (fixes Faculty vs faculty issue)
  const role = user?.role?.toLowerCase();

  return (
    <Routes>

      {/* ── Login Page ── */}
      <Route
        path="/login"
        element={
          user
            ? <Navigate to={ROLE_HOME[role] || '/faculty/dashboard'} replace />
            : <LoginPage />
        }
      />

      {/* ── Faculty Routes ── */}
      <Route
        path="/faculty/*"
        element={
          !user
            ? <Navigate to="/login" replace />
            : role !== 'faculty'
              ? <Navigate to={ROLE_HOME[role] || '/login'} replace />
              : <FacultyRoutes />
        }
      />

      {/* ── HoD Routes ── */}
      <Route
        path="/HOD/*"
        element={
          !user
            ? <Navigate to="/login" replace />
            : role !== 'hod'
              ? <Navigate to={ROLE_HOME[role] || '/login'} replace />
              : <HODRoutes />
        }
      />

      {/* ── Future Routes ── */}
      {/* <Route path="/principal/*" element={...} /> */}

      {/* ── Default Route ── */}
      <Route
        path="*"
        element={
          user
            ? <Navigate to={ROLE_HOME[role] || '/faculty/dashboard'} replace />
            : <Navigate to="/login" replace />
        }
      />

    </Routes>
  );
}