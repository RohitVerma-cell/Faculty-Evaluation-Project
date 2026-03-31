import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Clock, Star, Award, BarChart3,
  User, LogOut, ChevronLeft, ChevronRight,
  Bell, Moon, Sun, Menu, X
} from 'lucide-react'
import { useStore, usePendingCount } from '../../context/HOD/useStore'
import Avatar from '../../components/HOD/Avatar'
import ToastContainer from '../../components/HOD/Toast'

const NAV_ITEMS = [
  { to: '/',            label: 'Dashboard',         Icon: LayoutDashboard },
  { to: '/approvals',   label: 'Pending Approvals', Icon: Clock,    badge: 'pending' },
  { to: '/evaluation',  label: 'Evaluation',        Icon: Star,     badge: 'NEW' },
  { to: '/performance', label: 'Faculty Performance',Icon: Award },
  { to: '/analytics',   label: 'Analytics',         Icon: BarChart3 },
]

const PAGE_TITLES = {
  '/':            'Dashboard',
  '/approvals':   'Pending Approvals',
  '/evaluation':  'Evaluation',
  '/performance': 'Faculty Performance',
  '/analytics':   'Analytics',
  '/profile':     'Profile',
}

export default function MainLayout({ children }) {
  const { darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const pendingCount = usePendingCount()
  const location = useLocation()

  const title = PAGE_TITLES[location.pathname] || 'Dashboard'

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={[
        'fixed lg:relative z-50 flex flex-col h-full',
        'bg-white dark:bg-slate-900',
        'border-r border-slate-200 dark:border-slate-800',
        'transition-all duration-300 shrink-0',
        sidebarCollapsed ? 'w-[68px]' : 'w-[260px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ].join(' ')}>

        {/* Brand */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-base shrink-0">
            H
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden">
              <div className="font-bold text-[14px] text-slate-800 dark:text-white whitespace-nowrap leading-tight" style={{fontFamily:"'Playfair Display',serif"}}>
                HoD Portal
              </div>
              <h1 className="text-5xl text-red-900">TEST</h1>
              <div className="text-[11px] text-slate-400 whitespace-nowrap">Faculty Management</div>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {!sidebarCollapsed && (
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 pt-1 pb-1">Main</p>
          )}

          {NAV_ITEMS.map(({ to, label, Icon, badge }) => {
            const isActive = location.pathname === to
            const badgeVal = badge === 'pending' ? pendingCount : badge

            return (
              <Link
                key={to}
                to={to}
                title={sidebarCollapsed ? label : undefined}
                onClick={() => setMobileOpen(false)}
                className={[
                  'flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-[13.5px] font-medium',
                  'transition-all duration-150 relative',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400',
                ].join(' ')}
              >
                <Icon size={18} className="shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 whitespace-nowrap">{label}</span>
                    {badgeVal ? (
                      <span className={[
                        'text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0',
                        isActive ? 'bg-white text-blue-600'
                          : badge === 'NEW' ? 'bg-emerald-500 text-white'
                          : 'bg-red-500 text-white'
                      ].join(' ')}>
                        {badgeVal}
                      </span>
                    ) : null}
                  </>
                )}
                {sidebarCollapsed && badge === 'pending' && pendingCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Link>
            )
          })}

          {!sidebarCollapsed && (
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 pt-4 pb-1">Account</p>
          )}

          <Link
            to="/profile"
            title={sidebarCollapsed ? 'Profile' : undefined}
            onClick={() => setMobileOpen(false)}
            className={[
              'flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-[13.5px] font-medium transition-all',
              location.pathname === '/profile'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600',
            ].join(' ')}
          >
            <User size={18} className="shrink-0" />
            {!sidebarCollapsed && <span>Profile</span>}
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <LogOut size={17} className="shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-2.5 py-2 rounded-lg text-[12px] text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700"
          >
            {sidebarCollapsed
              ? <ChevronRight size={14} />
              : <><ChevronLeft size={14} /><span>Collapse</span></>
            }
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-5 gap-4 shrink-0 z-30">
          <button
            className="lg:hidden w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          <div className="flex items-center gap-3 flex-1 min-w-0">
            <h1 className="text-[16px] font-semibold text-slate-800 dark:text-white truncate">{title}</h1>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              Dept. of Computer Science
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button className="relative w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
            </button>

            <div className="hidden sm:block w-px h-7 bg-slate-200 dark:bg-slate-700 mx-1" />

            <div className="hidden sm:flex items-center gap-2.5">
              <Avatar name="Dr. P. Kumar" initials="PK" size={34} />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-slate-800 dark:text-white">Dr. P. Kumar</div>
                <div className="text-[11px] text-slate-400">Head of Department</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}
