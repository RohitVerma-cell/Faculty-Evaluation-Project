import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, BarChart3, Award,
  User, LogOut, ChevronLeft, ChevronRight,
  Bell, Moon, Sun, Menu, X
} from 'lucide-react'
import { useStore } from '../context/useStore'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/HOD/Avatar'
import ToastContainer from '../components/HOD/Toast'

// 🔥 Navigation Config (Clean & scalable)
const NAV_ITEMS = [
  { path: '/principal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/principal/faculty', label: 'Faculty Overview', icon: Award },
  { path: '/principal/analytics', label: 'Analytics', icon: BarChart3 },
]

// 🔥 Page Titles Map
const PAGE_TITLES = {
  '/principal/dashboard': 'Dashboard',
  '/principal/faculty': 'Faculty Overview',
  '/principal/analytics': 'Analytics',
  '/principal/profile': 'Profile',
}

export default function PrincipalLayout() {
  const { darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed } = useStore()
  const { logout, user } = useAuth()

  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const title = PAGE_TITLES[location.pathname] || 'Dashboard'

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">

      {/* 🔲 Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 📌 SIDEBAR */}
      <aside
        className={`fixed lg:relative z-50 flex flex-col h-full
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
        transition-all duration-300 shrink-0
        ${sidebarCollapsed ? 'w-[70px]' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >

        {/* 🔷 Brand */}
        <div className="flex items-center gap-3 px-4 h-16 border-b">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            P
          </div>

          {!sidebarCollapsed && (
            <div>
              <h2 className="font-bold text-sm">Principal Portal</h2>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          )}
        </div>

        {/* 🔗 NAVIGATION */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path

            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                  ${isActive
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-500 hover:bg-purple-50 hover:text-purple-600'}`}
              >
                <Icon size={18} />
                {!sidebarCollapsed && <span>{label}</span>}
              </Link>
            )
          })}

          {/* 👤 Profile */}
          <Link
            to="/principal/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-purple-50 hover:text-purple-600"
          >
            <User size={18} />
            {!sidebarCollapsed && <span>Profile</span>}
          </Link>
        </nav>

        {/* 🔻 FOOTER */}
        <div className="p-2 border-t space-y-1">

          {/* 🚪 Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50"
          >
            <LogOut size={16} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>

          {/* ↔ Collapse */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center py-2 text-slate-400 hover:bg-slate-100 rounded-lg"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

        </div>
      </aside>

      {/* 📦 MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* 🔝 NAVBAR */}
        <header className="h-16 flex items-center px-5 border-b bg-white dark:bg-slate-900">

          {/* ☰ Mobile Toggle */}
          <button
            className="lg:hidden mr-3"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          {/* 🏷 Page Title */}
          <h1 className="flex-1 text-lg font-semibold">{title}</h1>

          {/* 🌙 Theme Toggle */}
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </button>

          {/* 🔔 Notification */}
          <button className="ml-3 relative">
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* 👤 User */}
          <div className="ml-4 flex items-center gap-2">
            <Avatar
              name={user?.name || 'Principal'}
              initials="P"
              size={34}
            />
            {!sidebarCollapsed && (
              <div>
                <p className="text-sm font-semibold">{user?.name || 'Principal'}</p>
                <p className="text-xs text-slate-400">Principal</p>
              </div>
            )}
          </div>

        </header>

        {/* 📄 PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>

      </div>

      <ToastContainer />
    </div>
  )
}