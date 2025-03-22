// /src/store/useStore.js
import { create } from 'zustand'

const useStore = create((set) => ({
  // ניהול מצב אימות משתמש
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  
  // מידע על ברים במערכת
  bars: {
    items: [],
    isLoading: false,
    error: null,
  },
  
  // נתוני תנועות כספיות
  transactions: {
    items: [],
    isLoading: false,
    error: null,
  },
  
  // פעולות אימות
  login: (userData) => set((state) => ({
    auth: {
      ...state.auth,
      user: userData,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    }
  })),
  
  logout: () => set((state) => ({
    auth: {
      ...state.auth,
      user: null,
      isAuthenticated: false,
      error: null,
    }
  })),
  
  setAuthLoading: (isLoading) => set((state) => ({
    auth: { ...state.auth, isLoading }
  })),
  
  setAuthError: (error) => set((state) => ({
    auth: { ...state.auth, error, isLoading: false }
  })),
  
  // פעולות לניהול ברים
  setBars: (items) => set((state) => ({
    bars: { ...state.bars, items, isLoading: false }
  })),
  
  addBar: (bar) => set((state) => ({
    bars: { 
      ...state.bars, 
      items: [...state.bars.items, bar] 
    }
  })),
  
  updateBar: (updatedBar) => set((state) => ({
    bars: {
      ...state.bars,
      items: state.bars.items.map(bar => 
        bar.id === updatedBar.id ? updatedBar : bar
      )
    }
  })),
  
  deleteBar: (barId) => set((state) => ({
    bars: {
      ...state.bars,
      items: state.bars.items.filter(bar => bar.id !== barId)
    }
  })),
  
  setBarsLoading: (isLoading) => set((state) => ({
    bars: { ...state.bars, isLoading }
  })),
  
  setBarsError: (error) => set((state) => ({
    bars: { ...state.bars, error, isLoading: false }
  })),
  
  // פעולות לניהול תנועות כספיות
  setTransactions: (items) => set((state) => ({
    transactions: { ...state.transactions, items, isLoading: false }
  })),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: {
      ...state.transactions,
      items: [...state.transactions.items, transaction]
    }
  })),
  
  setTransactionsLoading: (isLoading) => set((state) => ({
    transactions: { ...state.transactions, isLoading }
  })),
  
  setTransactionsError: (error) => set((state) => ({
    transactions: { ...state.transactions, error, isLoading: false }
  })),
}))

export default useStore;
