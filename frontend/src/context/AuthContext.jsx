// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// // ── Temporary Users List badd mai database se data aayega
// const TEMP_USERS = [
//   // Faculty
//   { email: 'rishamjot@university.edu',  password: '1234', role: 'faculty', name: 'Er. Rishamjot Kaur',  dept: 'CSE Department' },
//   { email: 'ananya@university.edu',     password: '1234', role: 'faculty', name: 'Dr. Ananya Sharma',   dept: 'CSE Department' },
//   { email: 'rajesh@university.edu',     password: '1234', role: 'faculty', name: 'Dr. Rajesh Kumar',    dept: 'ECE Department' },
//   { email: 'priya@university.edu',      password: '1234', role: 'faculty', name: 'Dr. Priya Singh',     dept: 'ME Department'  },
//   // HoD
//   { email: 'hod@university.edu',        password: '1234', role: 'hod',     name: 'Dr. P. Kumar',        dept: 'CSE Department' },
//   // Principal
//   { email: 'principal@university.edu',  password: '1234', role: 'principal', name: 'Dr. S. Sharma',    dept: 'Administration' },
// ];

// const ROLE_REDIRECT = {
//   faculty:   '/faculty/dashboard',
//   hod:       '/HOD/dashboard',
//   principal: '/principal/dashboard',
//   director:  '/director/dashboard',
//   chairman:  '/chairman/dashboard',
// };

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     // localStorage se existing login check karo
//     const saved = localStorage.getItem('sap-user');
//     return saved ? JSON.parse(saved) : null;
//   });

//   const login = (email, password) => {
//     const found = TEMP_USERS.find(
//       (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
//     );
//     if (!found) return { success: false, message: 'Invalid email or password' };

//     const userData = {
//       email:    found.email,
//       name:     found.name,
//       role:     found.role,
//       dept:     found.dept,
//       redirect: ROLE_REDIRECT[found.role] || '/faculty/dashboard',
//     };

//     localStorage.setItem('sap-user', JSON.stringify(userData));
//     setUser(userData);
//     return { success: true, redirect: userData.redirect };
//   };

//   const logout = () => {
//     localStorage.removeItem('sap-user');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// ── Temporary Users List (later DB se aayega)
const TEMP_USERS = [
  // Faculty
  { email: 'rishamjot@university.edu',  password: '1234', role: 'faculty', name: 'Er. Rishamjot Kaur',  dept: 'CSE Department' },
  { email: 'ananya@university.edu',     password: '1234', role: 'faculty', name: 'Dr. Ananya Sharma',   dept: 'CSE Department' },
  { email: 'rajesh@university.edu',     password: '1234', role: 'faculty', name: 'Dr. Rajesh Kumar',    dept: 'ECE Department' },
  { email: 'priya@university.edu',      password: '1234', role: 'faculty', name: 'Dr. Priya Singh',     dept: 'ME Department'  },

  // HoD
  { email: 'hod@university.edu',        password: '1234', role: 'hod',     name: 'Dr. P. Kumar',        dept: 'CSE Department' },

  // Principal
  { email: 'principal@university.edu',  password: '1234', role: 'principal', name: 'Dr. S. Sharma',    dept: 'Administration' },
];

const ROLE_REDIRECT = {
  faculty:   '/faculty/dashboard',
  hod:       '/HOD/dashboard',
  principal: '/principal/dashboard',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // ✅ no localStorage

  const login = (email, password) => {
    const found = TEMP_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }

    const userData = {
      email: found.email,
      name: found.name,
      role: found.role,
      dept: found.dept,
      redirect: ROLE_REDIRECT[found.role] || '/faculty/dashboard',
    };

    setUser(userData); // ✅ only state

    console.log("LOGGED IN USER:", userData); // debug

    return { success: true, redirect: userData.redirect };
  };

  const logout = () => {
    setUser(null); // ✅ clear state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);