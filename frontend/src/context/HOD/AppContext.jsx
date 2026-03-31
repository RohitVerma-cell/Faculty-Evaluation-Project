import { create } from 'zustand'
import { FACULTY, SUBMISSIONS } from '../../data/data'

export const useAppStore = create((set, get) => ({
  // ── UI state ──────────────────────────────────────────────────────────────
  darkMode: false,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  toasts: [],

  // ── Data ──────────────────────────────────────────────────────────────────
  faculty: FACULTY,
  submissions: SUBMISSIONS,
  selectedEntry: null,
  selectedFacultyEval: null,

  // ── UI Actions ────────────────────────────────────────────────────────────
  toggleDark: () => {
    const next = !get().darkMode
    set({ darkMode: next })
    document.documentElement.classList.toggle('dark', next)
  },
  toggleSidebar:       () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setMobileSidebar:    (v) => set({ mobileSidebarOpen: v }),
  setSelectedEntry:    (e) => set({ selectedEntry: e }),
  setSelectedFacultyEval: (f) => set({ selectedFacultyEval: f }),

  // ── Toast ─────────────────────────────────────────────────────────────────
  addToast: (msg, type = 'info') => {
    const id = Date.now()
    set(s => ({ toasts: [...s.toasts, { id, msg, type }] }))
    setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 3500)
  },

  // ── Approvals ─────────────────────────────────────────────────────────────
  approveEntry: (id, remarks, overrideMark) => {
    set(s => ({
      submissions: s.submissions.map(e =>
        e.id === id ? { ...e, status: 'approved', remarks, marks: overrideMark ?? e.marks } : e
      ),
    }))
    get().addToast('Entry approved successfully', 'success')
  },

  rejectEntry: (id, remarks) => {
    set(s => ({
      submissions: s.submissions.map(e =>
        e.id === id ? { ...e, status: 'rejected', remarks } : e
      ),
    }))
    get().addToast('Entry rejected', 'error')
  },

  // ── Evaluation ────────────────────────────────────────────────────────────
  saveEvaluation: (facultyId, evalData, isSubmit) => {
    set(s => ({
      faculty: s.faculty.map(f =>
        f.id === facultyId
          ? { ...f, tl2: evalData.tl2Total, tl3: evalData.tl3Score, tl4: evalData.tl4Score, evalStatus: isSubmit ? 'complete' : 'draft' }
          : f
      ),
    }))
    get().addToast(isSubmit ? 'Evaluation submitted!' : 'Draft saved', isSubmit ? 'success' : 'info')
  },

  // ── Derived ───────────────────────────────────────────────────────────────
  get pendingCount() { return get().submissions.filter(s => s.status === 'pending').length },
}))
