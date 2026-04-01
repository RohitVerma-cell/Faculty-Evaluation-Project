import { create } from 'zustand'
import { MOCK_FACULTY, MOCK_SUBMISSIONS } from '../data/HODmockdata'

let toastId = 0

export const useStore = create((set, get) => ({
  // ── UI State ────────────────────────────────────────────────────────────────
  darkMode: false,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,

  setDarkMode: (v) => {
    set({ darkMode: v })
    document.documentElement.classList.toggle('dark', v)
  },
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  setMobileSidebarOpen: (v) => set({ mobileSidebarOpen: v }),

  // ── Data ────────────────────────────────────────────────────────────────────
  faculty: MOCK_FACULTY,
  submissions: MOCK_SUBMISSIONS,

  // ── Selected ────────────────────────────────────────────────────────────────
  selectedEntry: null,
  setSelectedEntry: (e) => set({ selectedEntry: e }),

  selectedFacultyEval: null,
  setSelectedFacultyEval: (f) => set({ selectedFacultyEval: f }),

  // ── Toasts ──────────────────────────────────────────────────────────────────
  toasts: [],
  addToast: (msg, type = 'info') => {
    const id = ++toastId
    set((s) => ({ toasts: [...s.toasts, { id, msg, type }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3500)
  },

  // ── Actions ─────────────────────────────────────────────────────────────────
  approveEntry: (id, remarks, overrideMark) => {
    set((s) => ({
      submissions: s.submissions.map((e) =>
        e.id === id ? { ...e, status: 'approved', remarks, overrideMark } : e
      ),
    }))
    get().addToast('Entry approved successfully', 'success')
  },

  rejectEntry: (id, remarks) => {
    set((s) => ({
      submissions: s.submissions.map((e) =>
        e.id === id ? { ...e, status: 'rejected', remarks } : e
      ),
    }))
    get().addToast('Entry rejected', 'error')
  },

  saveEvaluation: (facultyId, evalData, isSubmit) => {
    set((s) => ({
      faculty: s.faculty.map((f) =>
        f.id === facultyId
          ? { ...f, tl2: evalData.tl2Total, tl3: evalData.tl3Score, tl4: evalData.tl4Score, evalStatus: isSubmit ? 'complete' : 'draft' }
          : f
      ),
    }))
    get().addToast(isSubmit ? 'Evaluation submitted!' : 'Draft saved', isSubmit ? 'success' : 'info')
  },
}))

// Derived helpers
export const usePendingCount = () =>
  useStore((s) => s.submissions.filter((x) => x.status === 'pending').length)
